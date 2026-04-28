# Agent Guide: Make a Final-Exam Study Game

This file documents how SysFinalGame was built so a future agent can repeat the process for a different class final.

## Hard Rules

- Do not touch the MDSwap repo or any parent repo files.
- For a new class, make a fresh folder and a fresh GitHub repo. Do not reuse this repo except as a reference.
- Before committing or pushing, verify the git root is the new game folder:
  ```bash
  pwd
  git rev-parse --show-toplevel
  git status --short --branch
  ```
- Never edit parent files such as `/Users/meliwat/Desktop/mdswap/AGENTS.md`, `CHANGELOG.md`, `package.json`, `src/*`, or `tests/*`.
- Use only the final-exam spec, review sheet, or course notes the user provides. Do not invent private course content.
- Do not store user progress on a server. Save progress locally in the browser with `localStorage`.

## Outcome To Build

Create a standalone browser game for the new final exam:

- Static vanilla app: no React, no bundler, no database.
- Study modes: rapid recall, exact-command/text entry, focused category drills, and a boss/final-exam mode.
- Engagement loop: XP, levels, ranks, streaks, badges, daily objectives, and topic mastery.
- Local persistence: `localStorage` with a class-specific key, visible save status in the UI, and a reset button.
- Easy sharing: public GitHub repo plus GitHub Pages URL.
- Easy local install:
  ```bash
  git clone https://github.com/Meliwat/<new-repo>.git
  cd <new-repo>
  npm run dev
  ```

## Recommended Fresh-Repo Flow

Use a new folder outside the MDSwap repo when possible:

```bash
cd /Users/meliwat/Desktop
mkdir <class-final-game>
cd <class-final-game>
git init -b main
```

If the user starts from a nested folder, it is still acceptable only if that folder becomes its own git root with `.git/` inside it. Confirm with `git rev-parse --show-toplevel`.

Create these files:

```text
index.html
styles.css
app.js
study-data.js
game-core.js
server.mjs
package.json
README.md
.gitignore
tests/core.test.mjs
tests/smoke.test.mjs
AGENTS.md
```

## App Architecture

- `study-data.js`: topic list, ranks, badges, and question bank extracted from the provided final spec.
- `game-core.js`: pure logic for XP thresholds, rank lookup, answer normalization, scoring, generated drills, and boss decks.
- `app.js`: DOM rendering, mode switching, answer submission, localStorage save/load, dashboard updates.
- `server.mjs`: tiny static Node server that prints a local URL and moves to the next open port if needed.
- `tests/core.test.mjs`: pure logic tests.
- `tests/smoke.test.mjs`: Playwright browser checks, including localStorage persistence after reload.

Keep the content class-specific. Rename labels, repo name, storage key, title, README links, and topic codes for the new final.

## Local Save Pattern

Use a class-specific key:

```js
const storageKey = "<class-final-game>.v1";
```

Save after every answer:

```js
localStorage.setItem(storageKey, JSON.stringify(state));
```

Test that persistence works:

1. Reset state.
2. Answer one question.
3. Read `localStorage`.
4. Reload the page.
5. Confirm the answered count and progress still display.

## Building The Question Bank

Turn the exam spec into these shapes:

- Multiple choice for recall and scenario questions.
- Multi-select for "select all that apply" topics.
- Text-entry for exact command syntax, ports, file paths, scripts, formulas, and definitions.
- Generated drills for repetitive domains such as ports, permissions, vocabulary, formulas, dates, anatomy labels, or command syntax.

Every question needs:

```js
{
  id: "unique-id",
  topic: "topic-id",
  type: "choice" | "multi" | "text",
  prompt: "Question text",
  choices: ["A", "B", "C", "D"],
  answer: 0,
  explain: "Short explanation",
  difficulty: 1
}
```

For text questions, use:

```js
{
  type: "text",
  accepted: ["exact answer", "alternate exact answer"],
  answer: "display answer"
}
```

## Verification

Run:

```bash
npm test
```

Also manually or with Playwright verify:

- The app loads.
- Every mode is reachable.
- A question can be answered.
- Feedback appears.
- Progress saves to `localStorage`.
- Reload preserves progress.
- Mobile viewport does not break the layout.

## Publish To A New Public GitHub Repo

Only do this from the new game folder after verifying the git root.

```bash
git add .
git commit -m "Initial <Class> final game release"
gh repo create Meliwat/<new-repo> \
  --public \
  --description "<Class> final exam study game" \
  --source=. \
  --remote=origin \
  --push
```

Enable GitHub Pages from the `main` branch root:

```bash
gh api -X POST repos/Meliwat/<new-repo>/pages \
  -F 'source[branch]=main' \
  -F 'source[path]=/'
gh repo edit Meliwat/<new-repo> --homepage https://meliwat.github.io/<new-repo>/
```

Check it:

```bash
gh api repos/Meliwat/<new-repo>/pages
curl -I -L https://meliwat.github.io/<new-repo>/
```

Expected share links:

```text
https://github.com/Meliwat/<new-repo>
https://meliwat.github.io/<new-repo>/
```

## README Template

Include:

- Public play link.
- GitHub repo link.
- One-line description of the class/final.
- Clear statement that progress is saved locally in each browser.
- Local install commands.
- Test command.
- Coverage summary based on the provided final spec.

## What Was Done For SysFinalGame

For this CSC 4320 final, the agent:

1. Created a standalone static app in `/Users/meliwat/Desktop/mdswap/sysfinalgame`.
2. Initialized that folder as its own git repo, separate from the parent MDSwap repo.
3. Built the game from the pasted final-exam specification.
4. Added localStorage persistence and a visible save status.
5. Added tests for scoring, generated questions, browser loading, mode switching, and persistence after reload.
6. Created the public repo `Meliwat/sysfinalgame`.
7. Enabled GitHub Pages at `https://meliwat.github.io/sysfinalgame/`.

Repeat the same pattern for the next class, but use a new folder, new storage key, new repo name, and new question bank.
