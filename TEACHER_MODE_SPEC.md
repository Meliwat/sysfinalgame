# Teacher Mode Spec

SysFinalGame now defaults to `Coach Path`, a guided study loop for users who do not know the exam content yet.

## Behavior

- Show a short topic mental model before each prompt.
- Ask a retrieval question after the mini-lesson instead of only presenting notes.
- Provide a three-step hint ladder before the answer is revealed.
- Let the user choose `Teach me` when stuck; this records a miss, shows the answer, and queues a same-topic repair question.
- Avoid repeating the exact failed question for repair when another question exists for that topic.
- Track concept-level status in `localStorage`: `New`, `Needs repair`, `Hinted`, `Recalled once`, `Spaced`, and `Applied`.
- Schedule next reviews with expanding intervals after correct spaced retrievals.
- Keep the original drill modes for faster practice after the user has some footing.

## Product Direction

This is intentionally closer to Duolingo than a flashcard deck: short exposure, immediate attempt, small hints, repair, and visible progress. It does not claim mastery after one correct answer. A concept needs spaced correct retrieval before it is treated as durable.

## Verification

Run:

```bash
npm test
npm run dev
```

`npm test` runs core scheduling and question-engine tests. The browser smoke test is optional and skips when Playwright is not installed, preserving the dependency-free local setup.
