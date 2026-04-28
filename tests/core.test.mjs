import assert from "node:assert/strict";
import test from "node:test";
import {
  buildPermissionQuestion,
  buildPortQuestion,
  evaluateAnswer,
  levelFromXp,
  levelProgress,
  normalizeCommand,
  rankForLevel,
  xpForLevel
} from "../game-core.js";

test("level thresholds and rank progression are stable", () => {
  assert.equal(xpForLevel(1), 0);
  assert.equal(xpForLevel(2), 90);
  assert.equal(levelFromXp(89), 1);
  assert.equal(levelFromXp(90), 2);
  assert.equal(levelProgress(45).percent, 50);
  assert.equal(rankForLevel(5).name, "Permission Adept");
});

test("command normalization tolerates spacing and trailing semicolons", () => {
  assert.equal(normalizeCommand("  chmod   755   script.sh ; "), "chmod 755 script.sh");
});

test("answer evaluation handles choice, multi, and text formats", () => {
  assert.equal(evaluateAnswer({ type: "choice", answer: 2 }, 2), true);
  assert.equal(evaluateAnswer({ type: "multi", answer: [0, 2] }, [2, 0]), true);
  assert.equal(evaluateAnswer({ type: "text", accepted: ["systemctl status httpd"] }, " systemctl   status httpd "), true);
});

test("generated port questions know their own correct answer", () => {
  for (let index = 0; index < 20; index += 1) {
    const question = buildPortQuestion();
    assert.equal(evaluateAnswer(question, question.answer), true);
  }
});

test("generated permission questions know their own correct answer", () => {
  for (let index = 0; index < 40; index += 1) {
    const question = buildPermissionQuestion();
    assert.equal(evaluateAnswer(question, question.type === "text" ? question.answer : question.answer), true);
  }
});
