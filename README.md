# Systema (Hackathon Demo)

> Practice system design and coding interviews with judged submissions, architecture diagrams graded against real criteria, code graded against real test cases.

This is the **public hackathon build** of Systema, submitted for the Razorpay hackathon. The real product is live at **[systema-sd.in](https://systema-sd.in)**.

> **Note for judges:** this is a scaled-down demo, not the production codebase. It's here to show the product concept and the judged-submission flow end to end, two sample problems, a real editor, a real diagram canvas, a mocked evaluation step. It is nowhere close to the real application in scope, scale, or engineering depth; the actual evaluation engine, infrastructure, and full problem set are proprietary and live only at systema-sd.in. See "What's real vs. mocked" below for the specifics.

## Why Systema

Most interview-prep platforms (LeetCode, Codeforces, etc.) only judge code. They have no way to practice the round that actually blocks a lot of engineers: system design. Systema judges both:

- **Code problems**: write a solution, run it against hidden test cases, get a verdict.
- **Design problems**: build an actual architecture diagram on a canvas (drag components like a load balancer, cache, or database from a palette, connect them, configure each one) and get it graded against real grading criteria, not a free-text essay someone reads later.

It's built for engineers and students who currently have no way to self-practice the design round with real feedback.

## What's real vs. mocked in this repo

The real Systema evaluation engine (both the code judge and the design-diagram grader) is closed-source and stays that way. It is **not** included, reconstructed, or reverse-engineered anywhere in this repository.

What you get here is a fully runnable clone of the product experience, browsing, filtering, a real code editor, a real drag-and-drop diagram canvas, submissions, profiles, streaks, with the evaluation step replaced by a mock judge (`src/lib/mockJudge.ts`) that returns results in the exact same shape as the real API, but the "grading" is a random roll, not a real evaluation. See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the full breakdown.

This demo ships **2 sample problems**, one code and one design, so a judge can try the full flow without needing a whole problem set. The real problem library lives at [systema-sd.in](https://systema-sd.in).

## Running it locally

No database, no API keys, no external services.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Stack

Next.js (App Router) + TypeScript, [Monaco Editor](https://microsoft.github.io/monaco-editor/) for the code editor, [React Flow](https://reactflow.dev/) for the design canvas. All state is in-memory on the server (submissions) or in the browser's `localStorage` (your activity/solved history), so the demo needs zero setup.

## Links

- Real product: [systema-sd.in](https://systema-sd.in)
- Architecture notes: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
