import { BADGES, TOPICS } from "./study-data.js";
import {
  buildBossDeck,
  buildCommandQuestion,
  buildPermissionQuestion,
  buildPortQuestion,
  buildRapidQuestion,
  choiceLetters,
  dailyGoalModels,
  evaluateAnswer,
  formatAnswer,
  levelFromXp,
  levelProgress,
  rankForLevel,
  scoreForAnswer
} from "./game-core.js";

const storageKey = "sysfinalgame.v1";
const modeNames = {
  rapid: "Rapid Fire",
  commands: "Command Lab",
  ports: "Port Sprint",
  permissions: "Permission Forge",
  boss: "Boss Exam"
};

const elements = {
  rankName: document.querySelector("#rankName"),
  levelValue: document.querySelector("#levelValue"),
  streakValue: document.querySelector("#streakValue"),
  modeTitle: document.querySelector("#modeTitle"),
  sessionStatus: document.querySelector("#sessionStatus"),
  topicSelect: document.querySelector("#topicSelect"),
  topicPill: document.querySelector("#topicPill"),
  difficultyPill: document.querySelector("#difficultyPill"),
  prompt: document.querySelector("#questionPrompt"),
  answerArea: document.querySelector("#answerArea"),
  feedback: document.querySelector("#feedback"),
  submit: document.querySelector("#submitAnswer"),
  next: document.querySelector("#nextQuestion"),
  xpText: document.querySelector("#xpText"),
  nextLevelText: document.querySelector("#nextLevelText"),
  xpBar: document.querySelector("#xpBar"),
  saveStatus: document.querySelector("#saveStatus"),
  accuracyText: document.querySelector("#accuracyText"),
  answeredText: document.querySelector("#answeredText"),
  bestStreakText: document.querySelector("#bestStreakText"),
  bossText: document.querySelector("#bossText"),
  masteryList: document.querySelector("#masteryList"),
  mapNodes: document.querySelector("#mapNodes"),
  dailyOps: document.querySelector("#dailyOps"),
  badgeList: document.querySelector("#badgeList"),
  reset: document.querySelector("#resetProgress")
};

let state = loadState();
let app = {
  mode: "rapid",
  topic: "all",
  current: null,
  selected: null,
  locked: false,
  boss: null
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function defaultState() {
  return {
    xp: 0,
    total: 0,
    correct: 0,
    currentStreak: 0,
    bestStreak: 0,
    bossClears: 0,
    modeWins: {},
    topicStats: {},
    badges: [],
    daily: {
      date: todayKey(),
      answered: 0,
      correct: 0,
      modes: {},
      topics: {}
    }
  };
}

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey));
    return normalizeState(parsed || defaultState());
  } catch {
    return defaultState();
  }
}

function normalizeState(candidate) {
  const base = defaultState();
  const merged = {
    ...base,
    ...candidate,
    modeWins: { ...base.modeWins, ...(candidate.modeWins || {}) },
    topicStats: { ...base.topicStats, ...(candidate.topicStats || {}) },
    daily: { ...base.daily, ...(candidate.daily || {}) }
  };

  if (merged.daily.date !== todayKey()) merged.daily = defaultState().daily;
  for (const topic of TOPICS) {
    if (!merged.topicStats[topic.id]) merged.topicStats[topic.id] = { seen: 0, correct: 0, xp: 0 };
  }
  return merged;
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
  if (elements.saveStatus) {
    elements.saveStatus.textContent = `Saved locally at ${new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit"
    })}`;
  }
}

function setup() {
  elements.topicSelect.innerHTML = [
    `<option value="all">All exam topics</option>`,
    ...TOPICS.map((topic) => `<option value="${topic.id}">${topic.label}</option>`)
  ].join("");

  elements.topicSelect.addEventListener("change", () => {
    app.topic = elements.topicSelect.value;
    app.boss = null;
    nextQuestion();
  });

  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      app.mode = button.dataset.mode;
      app.boss = null;
      document.querySelectorAll("[data-mode]").forEach((item) => item.classList.toggle("is-active", item === button));
      nextQuestion();
    });
  });

  elements.submit.addEventListener("click", submitAnswer);
  elements.next.addEventListener("click", () => {
    if (app.mode === "boss" && app.boss?.finished) {
      finishBoss();
      return;
    }
    nextQuestion();
  });

  elements.reset.addEventListener("click", () => {
    if (!confirm("Reset all SysFinalGame progress?")) return;
    state = defaultState();
    saveState();
    app.boss = null;
    nextQuestion();
  });

  drawMap();
  nextQuestion();
}

function nextQuestion() {
  app.locked = false;
  app.selected = app.current?.type === "multi" ? [] : null;
  elements.feedback.hidden = true;
  elements.feedback.className = "feedback";
  elements.feedback.textContent = "";
  elements.submit.hidden = false;
  elements.submit.disabled = false;
  elements.next.hidden = true;

  if (app.mode === "boss") {
    if (!app.boss) app.boss = { index: 0, correct: 0, deck: buildBossDeck(15), finished: false };
    app.current = app.boss.deck[app.boss.index];
  } else if (app.mode === "commands") {
    app.current = buildCommandQuestion(app.topic);
  } else if (app.mode === "ports") {
    app.current = buildPortQuestion();
  } else if (app.mode === "permissions") {
    app.current = buildPermissionQuestion();
  } else {
    app.current = buildRapidQuestion(app.topic);
  }

  renderQuestion();
  renderDashboard();
}

function renderQuestion() {
  const question = app.current;
  const topic = TOPICS.find((item) => item.id === question.topic);
  elements.modeTitle.textContent = modeNames[app.mode];
  elements.sessionStatus.textContent =
    app.mode === "boss" && app.boss ? `Question ${app.boss.index + 1} of ${app.boss.deck.length}` : `Question ${state.total + 1}`;
  elements.topicPill.textContent = topic ? `${topic.code} / ${topic.label}` : "Mixed";
  elements.difficultyPill.textContent = ["Warmup", "Core", "Applied", "Trap"][question.difficulty || 1] || "Core";
  elements.prompt.textContent = question.prompt;
  elements.answerArea.innerHTML = "";

  if (question.type === "choice" || question.type === "multi") {
    question.choices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice-option";
      button.dataset.testid = "choice-option";
      button.dataset.index = String(index);
      button.innerHTML = `<span class="choice-index">${choiceLetters(index)}</span><span class="choice-text"></span>`;
      button.querySelector(".choice-text").textContent = choice;
      button.addEventListener("click", () => selectChoice(index, button));
      elements.answerArea.append(button);
    });
    return;
  }

  const input = document.createElement("input");
  input.className = "text-answer";
  input.dataset.testid = "text-answer";
  input.type = "text";
  input.autocomplete = "off";
  input.spellcheck = false;
  input.placeholder = "type the exact answer";
  input.addEventListener("input", () => {
    app.selected = input.value;
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") submitAnswer();
  });
  elements.answerArea.append(input);
  requestAnimationFrame(() => input.focus());
}

function selectChoice(index, button) {
  if (app.locked) return;

  if (app.current.type === "multi") {
    const current = Array.isArray(app.selected) ? app.selected : [];
    app.selected = current.includes(index) ? current.filter((item) => item !== index) : [...current, index];
    button.classList.toggle("is-selected");
    return;
  }

  app.selected = index;
  elements.answerArea.querySelectorAll(".choice-option").forEach((item) => item.classList.remove("is-selected"));
  button.classList.add("is-selected");
}

function submitAnswer() {
  if (app.locked) return;
  const hasAnswer = app.current.type === "multi" ? Array.isArray(app.selected) && app.selected.length > 0 : app.selected !== null && app.selected !== "";
  if (!hasAnswer) return;

  const oldLevel = levelFromXp(state.xp);
  const willBeCorrect = evaluateAnswer(app.current, app.selected);
  const nextStreak = willBeCorrect ? state.currentStreak + 1 : 0;
  const gained = scoreForAnswer(willBeCorrect, app.current, nextStreak, app.mode);

  state.total += 1;
  state.currentStreak = nextStreak;
  state.bestStreak = Math.max(state.bestStreak, state.currentStreak);
  if (willBeCorrect) state.correct += 1;
  state.xp += gained;

  const stats = state.topicStats[app.current.topic] || { seen: 0, correct: 0, xp: 0 };
  stats.seen += 1;
  if (willBeCorrect) {
    stats.correct += 1;
    stats.xp += gained;
  }
  state.topicStats[app.current.topic] = stats;

  markDaily(app.mode, app.current.topic, willBeCorrect);

  if (willBeCorrect && app.mode !== "rapid") {
    state.modeWins[app.mode] = (state.modeWins[app.mode] || 0) + 1;
  }

  if (app.mode === "boss" && willBeCorrect) app.boss.correct += 1;

  const newLevel = levelFromXp(state.xp);
  const newBadges = awardBadges();
  saveState();
  showFeedback(willBeCorrect, gained, oldLevel, newLevel, newBadges);
  renderDashboard();

  app.locked = true;
  elements.submit.hidden = true;

  if (app.mode === "boss") {
    app.boss.index += 1;
    if (app.boss.index >= app.boss.deck.length) {
      app.boss.finished = true;
      elements.next.textContent = "Finish Boss Exam";
    } else {
      elements.next.textContent = "Next";
    }
  } else {
    elements.next.textContent = "Next";
  }
  elements.next.hidden = false;
}

function showFeedback(correct, gained, oldLevel, newLevel, newBadges) {
  const result = correct ? "Correct" : "Review";
  const answer = formatAnswer(app.current);
  const levelText = newLevel > oldLevel ? ` Level ${newLevel} reached.` : "";
  const badgeText = newBadges.length ? ` Badge earned: ${newBadges.map((badge) => badge.name).join(", ")}.` : "";
  elements.feedback.hidden = false;
  elements.feedback.classList.add(correct ? "is-correct" : "is-wrong");
  elements.feedback.innerHTML = `
    <strong>${result}${correct ? ` +${gained} XP` : ""}</strong>
    <div>Answer: <code></code></div>
    <p></p>
    <span>${levelText}${badgeText}</span>
  `;
  elements.feedback.querySelector("code").textContent = answer;
  elements.feedback.querySelector("p").textContent = app.current.explain;
}

function finishBoss() {
  const score = app.boss.correct;
  const total = app.boss.deck.length;
  const passed = score >= 12;
  const bonus = passed ? 180 : 60;
  state.xp += bonus;
  if (passed) state.bossClears += 1;
  const newBadges = awardBadges();
  saveState();
  app.boss = null;
  elements.modeTitle.textContent = modeNames.boss;
  elements.sessionStatus.textContent = "Complete";
  elements.topicPill.textContent = "BX / Boss Exam";
  elements.difficultyPill.textContent = "Trap";
  elements.prompt.textContent = passed ? `Boss clear: ${score}/${total}.` : `Boss run complete: ${score}/${total}.`;
  elements.answerArea.innerHTML = "";
  const restart = document.createElement("button");
  restart.type = "button";
  restart.className = "primary-action";
  restart.textContent = "Start Boss Exam";
  restart.addEventListener("click", () => {
    app.mode = "boss";
    nextQuestion();
  });
  const rapid = document.createElement("button");
  rapid.type = "button";
  rapid.className = "secondary-action";
  rapid.textContent = "Rapid Fire";
  rapid.addEventListener("click", () => {
    app.mode = "rapid";
    document.querySelectorAll("[data-mode]").forEach((item) => item.classList.toggle("is-active", item.dataset.mode === "rapid"));
    nextQuestion();
  });
  elements.answerArea.append(restart, rapid);
  elements.submit.hidden = true;
  elements.next.hidden = true;
  elements.feedback.hidden = false;
  elements.feedback.className = `feedback ${passed ? "is-correct" : "is-wrong"}`;
  elements.feedback.innerHTML = `<strong>${passed ? "Passed" : "Keep drilling"} +${bonus} XP</strong><p>Boss bonus applied.${newBadges.length ? ` Badge earned: ${newBadges.map((badge) => badge.name).join(", ")}.` : ""}</p>`;
  renderDashboard();
}

function markDaily(mode, topic, correct) {
  if (state.daily.date !== todayKey()) state.daily = defaultState().daily;
  state.daily.answered += 1;
  if (correct) state.daily.correct += 1;
  if (correct) state.daily.modes[mode] = (state.daily.modes[mode] || 0) + 1;
  state.daily.topics[topic] = true;
}

function awardBadges() {
  const earned = [];
  const topicCount = TOPICS.filter((topic) => state.topicStats[topic.id]?.seen > 0).length;
  const checks = new Map([
    ["first-login", state.total >= 1],
    ["five-streak", state.bestStreak >= 5],
    ["ten-streak", state.bestStreak >= 10],
    ["command-line", (state.modeWins.commands || 0) >= 10],
    ["port-watch", (state.modeWins.ports || 0) >= 10],
    ["perm-forge", (state.modeWins.permissions || 0) >= 10],
    ["level-five", levelFromXp(state.xp) >= 5],
    ["level-ten", levelFromXp(state.xp) >= 10],
    ["boss-clear", state.bossClears >= 1],
    ["full-map", topicCount === TOPICS.length]
  ]);

  for (const badge of BADGES) {
    if (checks.get(badge.id) && !state.badges.includes(badge.id)) {
      state.badges.push(badge.id);
      earned.push(badge);
    }
  }
  return earned;
}

function renderDashboard() {
  const progress = levelProgress(state.xp);
  const rank = rankForLevel(progress.level);
  elements.rankName.textContent = rank.name;
  elements.levelValue.textContent = progress.level;
  elements.streakValue.textContent = state.currentStreak;
  elements.xpText.textContent = `${state.xp} XP`;
  elements.nextLevelText.textContent = `${progress.next - state.xp} XP to Level ${progress.level + 1}`;
  elements.xpBar.style.width = `${progress.percent}%`;
  if (elements.saveStatus && !elements.saveStatus.textContent) {
    elements.saveStatus.textContent = "Saved locally in this browser";
  }
  elements.accuracyText.textContent = `${state.total ? Math.round((state.correct / state.total) * 100) : 0}%`;
  elements.answeredText.textContent = state.total;
  elements.bestStreakText.textContent = state.bestStreak;
  elements.bossText.textContent = state.bossClears;
  renderMastery();
  renderDaily();
  renderBadges();
  drawMap();
}

function renderMastery() {
  elements.masteryList.innerHTML = TOPICS.map((topic) => {
    const stats = state.topicStats[topic.id] || { correct: 0 };
    const percent = Math.min(100, Math.round((stats.correct / 6) * 100));
    return `
      <div class="mastery-row">
        <span>${topic.code}</span>
        <div class="mini-track" aria-hidden="true"><div class="mini-fill" style="width:${percent}%"></div></div>
        <strong>${percent}%</strong>
      </div>
    `;
  }).join("");
}

function renderDaily() {
  const touchedTopics = Object.keys(state.daily.topics || {}).length;
  const values = {
    answered: state.daily.answered,
    correct: state.daily.correct,
    commands: state.daily.modes.commands || 0,
    topicSpread: touchedTopics
  };

  elements.dailyOps.innerHTML = dailyGoalModels().map((goal) => {
    const value = Math.min(goal.target, values[goal.id] || 0);
    const percent = Math.round((value / goal.target) * 100);
    return `
      <div class="daily-item">
        <strong>${goal.label}</strong>
        <div class="mini-track" aria-hidden="true"><div class="mini-fill" style="width:${percent}%"></div></div>
        <span>${value}/${goal.target}</span>
      </div>
    `;
  }).join("");
}

function renderBadges() {
  elements.badgeList.innerHTML = BADGES.map((badge) => {
    const earned = state.badges.includes(badge.id);
    return `
      <div class="badge ${earned ? "is-earned" : ""}">
        <strong>${badge.name}</strong>
        <span>${earned ? "Earned" : badge.detail}</span>
      </div>
    `;
  }).join("");
}

function drawMap() {
  const positions = [
    [30, 108], [58, 63], [89, 48], [121, 88], [150, 59], [177, 44],
    [205, 53], [230, 78], [255, 83], [287, 97], [46, 124], [83, 115],
    [120, 127], [159, 111], [194, 99], [226, 116], [260, 124], [294, 114]
  ];
  elements.mapNodes.innerHTML = TOPICS.map((topic, index) => {
    const stats = state.topicStats[topic.id] || { correct: 0 };
    const [x, y] = positions[index];
    const mastered = stats.correct >= 3;
    return `
      <g>
        <circle class="map-node ${mastered ? "is-mastered" : ""}" cx="${x}" cy="${y}" r="12"></circle>
        <text class="map-label" x="${x}" y="${y + 4}">${topic.code.slice(0, 3)}</text>
      </g>
    `;
  }).join("");
}

window.__SYSFINALGAME__ = {
  storageKey,
  getState: () => structuredClone(state),
  reset: () => {
    state = defaultState();
    saveState();
    nextQuestion();
  }
};

setup();
