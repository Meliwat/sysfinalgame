import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = fileURLToPath(new URL("..", import.meta.url));
const port = 4297;
const url = `http://127.0.0.1:${port}`;

let server;
let output = "";

test.before(async () => {
  server = spawn(process.execPath, ["server.mjs"], {
    cwd: root,
    env: { ...process.env, PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"]
  });
  server.stdout.on("data", (chunk) => {
    output += chunk.toString();
  });
  server.stderr.on("data", (chunk) => {
    output += chunk.toString();
  });

  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      await delay(100);
    }
  }
  throw new Error(`Server did not start. Output:\n${output}`);
});

test.after(() => {
  server?.kill();
});

test("study game loads and answers a challenge", async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  try {
    await page.goto(url);
    await page.waitForSelector("[data-testid='challenge-panel']");
    assert.equal(await page.title(), "SysFinalGame");
    assert.match(await page.locator("h1").textContent(), /SysFinalGame/);
    assert.ok((await page.locator("#questionPrompt").textContent()).length > 10);

    const choices = page.locator("[data-testid='choice-option']");
    if ((await choices.count()) > 0) {
      await choices.first().click();
    } else {
      await page.locator("[data-testid='text-answer']").fill("pwd");
    }

    await page.locator("[data-testid='submit-answer']").click();
    await page.waitForSelector("[data-testid='feedback']:not([hidden])");
    assert.match(await page.locator("[data-testid='feedback']").textContent(), /Answer:/);
    assert.match(await page.locator("[data-testid='rank-strip']").textContent(), /Level/);
  } finally {
    await browser.close();
  }
});

test("progress is persisted in browser localStorage", async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 980, height: 820 } });
  try {
    await page.goto(url);
    await page.evaluate(() => window.__SYSFINALGAME__.reset());
    await page.waitForSelector("[data-testid='challenge-panel']");

    const choices = page.locator("[data-testid='choice-option']");
    if ((await choices.count()) > 0) {
      await choices.first().click();
    } else {
      await page.locator("[data-testid='text-answer']").fill("pwd");
    }

    await page.locator("[data-testid='submit-answer']").click();
    await page.waitForSelector("[data-testid='feedback']:not([hidden])");
    assert.match(await page.locator("[data-testid='save-status']").textContent(), /Saved locally/);

    const stored = await page.evaluate(() => JSON.parse(localStorage.getItem(window.__SYSFINALGAME__.storageKey)));
    assert.equal(stored.total, 1);

    await page.reload();
    await page.waitForSelector("[data-testid='challenge-panel']");
    assert.equal(await page.locator("#answeredText").textContent(), "1");
  } finally {
    await browser.close();
  }
});

test("command and boss modes are reachable", async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 820 } });
  try {
    await page.goto(url);
    await page.locator("[data-testid='mode-commands']").click();
    await page.waitForSelector("[data-testid='text-answer']");
    assert.match(await page.locator("#modeTitle").textContent(), /Command Lab/);

    await page.locator("[data-testid='mode-boss']").click();
    await page.waitForSelector("#sessionStatus");
    assert.match(await page.locator("#sessionStatus").textContent(), /Question 1 of 15/);
  } finally {
    await browser.close();
  }
});
