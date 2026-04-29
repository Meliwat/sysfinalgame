import { COMMAND_DRILLS, PORTS, QUESTION_BANK, RANKS } from "./study-data.js";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const permissionTriads = [
  { text: "---", value: 0 },
  { text: "--x", value: 1 },
  { text: "-w-", value: 2 },
  { text: "-wx", value: 3 },
  { text: "r--", value: 4 },
  { text: "r-x", value: 5 },
  { text: "rw-", value: 6 },
  { text: "rwx", value: 7 }
];

export function xpForLevel(level) {
  if (level <= 1) return 0;
  const n = level - 1;
  return 90 * n + 30 * n * (n - 1);
}

export function levelFromXp(xp) {
  let level = 1;
  while (xp >= xpForLevel(level + 1) && level < 99) level += 1;
  return level;
}

export function levelProgress(xp) {
  const level = levelFromXp(xp);
  const current = xpForLevel(level);
  const next = xpForLevel(level + 1);
  return {
    level,
    current,
    next,
    inLevel: xp - current,
    needed: next - current,
    percent: Math.max(0, Math.min(100, ((xp - current) / (next - current)) * 100))
  };
}

export function rankForLevel(level) {
  return RANKS.reduce((rank, candidate) => (level >= candidate.level ? candidate : rank), RANKS[0]);
}

export function normalizeCommand(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\s*;\s*$/, "");
}

export function sameSet(left, right) {
  if (left.length !== right.length) return false;
  const a = [...left].map(Number).sort((x, y) => x - y);
  const b = [...right].map(Number).sort((x, y) => x - y);
  return a.every((value, index) => value === b[index]);
}

export function formatAnswer(question) {
  if (question.type === "choice") return question.choices[question.answer];
  if (question.type === "multi") return question.answer.map((index) => question.choices[index]).join(", ");
  return question.answer || (question.accepted || [])[0] || "";
}

export function evaluateAnswer(question, response) {
  if (question.type === "choice") {
    return Number(response) === Number(question.answer);
  }

  if (question.type === "multi") {
    return sameSet(Array.isArray(response) ? response : [], question.answer);
  }

  const typed = normalizeCommand(response).toLowerCase();
  const accepted = (question.accepted || [question.answer]).map((item) => normalizeCommand(item).toLowerCase());
  return accepted.includes(typed);
}

export function scoreForAnswer(correct, question, streak, mode) {
  if (!correct) return 0;
  const difficulty = Number(question.difficulty || 1);
  const base = [0, 12, 18, 26][difficulty] || 12;
  const modeBonus = mode === "boss" ? 8 : mode === "guided" ? 6 : mode === "commands" || mode === "permissions" ? 4 : 0;
  const streakBonus = Math.min(18, Math.max(0, streak - 1) * 2);
  return base + modeBonus + streakBonus;
}

export function randomItem(items, random = Math.random) {
  return items[Math.floor(random() * items.length)];
}

export function shuffle(items, random = Math.random) {
  return [...items]
    .map((item) => ({ item, sort: random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

export function choiceLetters(index) {
  return letters[index] || String(index + 1);
}

export function dayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function addDaysKey(date = new Date(), days = 1) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return dayKey(next);
}

export function conceptIdForQuestion(question) {
  return question.id || `${question.mode || "question"}:${question.topic}:${question.prompt}`;
}

export function isReviewDue(stats, now = new Date()) {
  return Boolean(stats?.nextReview && stats.nextReview <= dayKey(now));
}

export function updateConceptSchedule(previous = {}, correct, question = {}, now = new Date(), options = {}) {
  const reviewed = dayKey(now);
  const previousReview = previous.lastReviewed || null;
  const spacedAttempt = Boolean(previousReview && previousReview !== reviewed);
  const wasHinted = Boolean(options.hinted);
  const correctRetrievals = (previous.correctRetrievals || 0) + (correct ? 1 : 0);
  const incorrectRetrievals = (previous.incorrectRetrievals || 0) + (correct ? 0 : 1);
  const hintedRetrievals = (previous.hintedRetrievals || 0) + (correct && wasHinted ? 1 : 0);
  const currentInterval = previous.intervalDays || 0;
  const difficulty = Number(question.difficulty || 1);

  let intervalDays = 1;
  let status = "needs_repair";

  if (correct && wasHinted) {
    status = "recalled_with_hint";
    intervalDays = 1;
  } else if (correct && spacedAttempt && correctRetrievals >= 3 && difficulty >= 2) {
    status = "applied";
    intervalDays = Math.min(30, Math.max(7, currentInterval ? Math.round(currentInterval * 2) : 7));
  } else if (correct && spacedAttempt && correctRetrievals >= 2) {
    status = "spaced";
    intervalDays = Math.min(14, Math.max(3, currentInterval ? Math.round(currentInterval * 1.8) : 3));
  } else if (correct) {
    status = "recalled_once";
    intervalDays = 1;
  }

  return {
    topic: question.topic,
    difficulty,
    seen: (previous.seen || 0) + 1,
    correctRetrievals,
    incorrectRetrievals,
    hintedRetrievals,
    intervalDays,
    lastReviewed: reviewed,
    nextReview: addDaysKey(now, intervalDays),
    status
  };
}

export function masteryLabel(stats) {
  if (!stats?.seen) return "New";
  if (stats.status === "applied") return "Applied";
  if (stats.status === "spaced") return "Spaced";
  if (stats.status === "recalled_once") return "Recalled once";
  if (stats.status === "recalled_with_hint") return "Hinted";
  return "Needs repair";
}

export function reviewSummary(conceptStats = {}, now = new Date()) {
  const stats = Object.values(conceptStats || {});
  return {
    due: stats.filter((item) => isReviewDue(item, now)).length,
    needsRepair: stats.filter((item) => item.status === "needs_repair").length,
    recalledOnce: stats.filter((item) => item.status === "recalled_once" || item.status === "recalled_with_hint").length,
    spaced: stats.filter((item) => item.status === "spaced").length,
    applied: stats.filter((item) => item.status === "applied").length
  };
}

function conceptPriority(question, conceptStats) {
  const stats = conceptStats[conceptIdForQuestion(question)];
  if (!stats?.seen) return -100;
  if (stats.status === "needs_repair") return -80;
  return (stats.correctRetrievals || 0) * 5 - (stats.incorrectRetrievals || 0) * 4 + (stats.intervalDays || 0);
}

export function buildGuidedQuestion(topic = "all", conceptStats = {}, random = Math.random, options = {}) {
  const excluded = new Set(options.excludeIds || []);
  const topicPool = QUESTION_BANK.filter((item) => topic === "all" || item.topic === topic);
  const pool = topicPool.filter((item) => !excluded.has(conceptIdForQuestion(item)));
  const candidates = pool.length ? pool : topicPool.length ? topicPool : QUESTION_BANK;
  const due = candidates.filter((question) => isReviewDue(conceptStats[conceptIdForQuestion(question)]));
  if (due.length) {
    return { ...randomItem(due, random), mode: "guided", phase: "review" };
  }

  const repair = candidates.filter((question) => conceptStats[conceptIdForQuestion(question)]?.status === "needs_repair");
  if (repair.length) {
    return { ...randomItem(repair, random), mode: "guided", phase: "repair" };
  }

  const sorted = shuffle(candidates, random).sort((left, right) => conceptPriority(left, conceptStats) - conceptPriority(right, conceptStats));
  const easier = sorted.filter((question) => Number(question.difficulty || 1) <= 2).slice(0, 12);
  return { ...(randomItem(easier.length ? easier : sorted, random) || randomItem(QUESTION_BANK, random)), mode: "guided", phase: "new" };
}

export function buildCommandQuestion(topic = "all", random = Math.random) {
  const pool = topic === "all" ? COMMAND_DRILLS : COMMAND_DRILLS.filter((item) => item.topic === topic);
  const drill = randomItem(pool.length ? pool : COMMAND_DRILLS, random);
  return {
    id: `command-${drill.prompt}`,
    type: "text",
    mode: "commands",
    topic: drill.topic,
    prompt: drill.prompt,
    accepted: drill.accepted,
    answer: drill.answer,
    explain: drill.explain,
    difficulty: drill.difficulty
  };
}

export function buildPortQuestion(random = Math.random) {
  const target = randomItem(PORTS, random);
  const distractors = shuffle(PORTS.filter((item) => item !== target), random).slice(0, 3);
  const choices = shuffle([target, ...distractors], random).map((item) => `${item.port}/${item.protocol}`);
  return {
    id: `port-${target.service}`,
    type: "choice",
    mode: "ports",
    topic: "ports",
    prompt: `Which port/protocol is used by ${target.service}?`,
    choices,
    answer: choices.indexOf(`${target.port}/${target.protocol}`),
    explain: `${target.service} uses ${target.port}/${target.protocol}.`,
    difficulty: target.port.includes("/") || target.protocol.includes("and") ? 2 : 1
  };
}

export function buildPermissionQuestion(random = Math.random) {
  const shape = Math.floor(random() * 4);
  const owner = randomItem(permissionTriads, random);
  const group = randomItem(permissionTriads, random);
  const other = randomItem(permissionTriads, random);
  const symbolic = `${owner.text}${group.text}${other.text}`;
  const octal = `${owner.value}${group.value}${other.value}`;

  if (shape === 0) {
    return {
      id: `perm-octal-${symbolic}`,
      type: "text",
      mode: "permissions",
      topic: "permissions",
      prompt: `Convert ${symbolic} to octal.`,
      accepted: [octal],
      answer: octal,
      explain: "Add r=4, w=2, and x=1 for owner, group, and other.",
      difficulty: 1
    };
  }

  if (shape === 1) {
    const choices = shuffle([
      symbolic,
      `${owner.text}${other.text}${group.text}`,
      `${group.text}${owner.text}${other.text}`,
      `${other.text}${group.text}${owner.text}`
    ], random);
    return {
      id: `perm-symbolic-${octal}`,
      type: "choice",
      mode: "permissions",
      topic: "permissions",
      prompt: `Which symbolic mode matches octal ${octal}?`,
      choices,
      answer: choices.indexOf(symbolic),
      explain: `${octal} maps to ${symbolic}.`,
      difficulty: 1
    };
  }

  if (shape === 2) {
    const mode = randomItem([
      { bit: "SUID", octal: "4", explain: "SUID runs an executable as the file owner." },
      { bit: "SGID", octal: "2", explain: "SGID runs as the group on files and inherits group on directories." },
      { bit: "sticky bit", octal: "1", explain: "Sticky directories let only owners or root delete contained files." }
    ], random);
    const choices = shuffle(["1", "2", "4", "7"], random);
    return {
      id: `perm-special-${mode.bit}`,
      type: "choice",
      mode: "permissions",
      topic: "permissions",
      prompt: `Which fourth octal digit sets the ${mode.bit}?`,
      choices,
      answer: choices.indexOf(mode.octal),
      explain: `${mode.bit} is represented by ${mode.octal}xxx. ${mode.explain}`,
      difficulty: 2
    };
  }

  return {
    id: `perm-chmod-${octal}`,
    type: "text",
    mode: "permissions",
    topic: "permissions",
    prompt: `Write the command to set file.txt to ${symbolic}.`,
    accepted: [`chmod ${octal} file.txt`],
    answer: `chmod ${octal} file.txt`,
    explain: `${symbolic} is ${octal}, so use chmod ${octal} file.txt.`,
    difficulty: 2
  };
}

export function buildRapidQuestion(topic = "all", random = Math.random) {
  const pool = topic === "all" ? QUESTION_BANK : QUESTION_BANK.filter((item) => item.topic === topic);
  return randomItem(pool.length ? pool : QUESTION_BANK, random);
}

export function buildBossDeck(count = 15, random = Math.random) {
  const staticQuestions = shuffle(QUESTION_BANK, random).slice(0, Math.max(8, count - 5));
  const generated = [
    buildPortQuestion(random),
    buildPortQuestion(random),
    buildPermissionQuestion(random),
    buildPermissionQuestion(random),
    buildCommandQuestion("all", random),
    buildCommandQuestion("all", random)
  ];
  return shuffle([...staticQuestions, ...generated], random).slice(0, count).map((question) => ({
    ...question,
    mode: "boss"
  }));
}

export function dailyGoalModels() {
  return [
    { id: "answered", label: "Answer 12 challenges", target: 12 },
    { id: "correct", label: "Land 8 correct answers", target: 8 },
    { id: "commands", label: "Clear 3 command drills", target: 3 },
    { id: "topicSpread", label: "Touch 6 exam topics", target: 6 }
  ];
}
