# SysFinalGame

Share link: <https://meliwat.github.io/sysfinalgame/>

GitHub repo: <https://github.com/Meliwat/sysfinalgame>

A dependency-free study game for the CSC 4320 Systems Administration final exam review. It turns the provided final-exam specification into a guided Coach Path, rapid recall, exact command, port, permission, and boss-exam drills with persistent XP, levels, ranks, streaks, daily objectives, spaced review, and topic mastery.

## Coach Path

The default mode teaches before it drills. Each prompt includes a compact topic mental model, a hint ladder, and a `Teach me` escape hatch for when the material is unfamiliar. Missed concepts are queued for same-topic repair, correct answers get spaced-review dates, and progress labels distinguish new exposure from real recall.

## Use It

No install is needed for classmates: open <https://meliwat.github.io/sysfinalgame/> in a browser.

Progress is saved locally in each browser with `localStorage`. Your XP, streaks, ranks, daily objectives, badges, and topic mastery stay on your device; they are not uploaded to GitHub or shared with other players.

## Run Locally

```bash
git clone https://github.com/Meliwat/sysfinalgame.git
cd sysfinalgame
npm run dev
```

The app has no runtime npm dependencies. The dev server prints the local URL. By default it starts at `http://127.0.0.1:4174` and moves to the next open port if needed.

## Test

```bash
npm test
```

The browser smoke test is optional and skips if Playwright is not installed. Core scheduling, scoring, command normalization, generated questions, and guided repair behavior run without extra dependencies.

## Coverage

The question engine covers the review file end to end: Linux commands, redirection, permissions and special bits, least privilege, three-tier web architecture, cron, SysV run levels and systemd targets, `case`, Linux file type codes, `PATH`, monitoring, `/etc/passwd`, `/etc/shadow`, `/etc/group`, ports, OSI, TCP handshakes, TCP vs UDP, DNS, Apache, IPv4 classes, loopback/private ranges, and shell scripting.

Progress is stored in browser `localStorage` under `sysfinalgame.v1`. The reset action is available in the app.
