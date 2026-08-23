# Architecture

## Overview

```
Browser
  |
  |  Next.js App Router (single process)
  v
+-------------------------------------------+
| Pages (React Server + Client Components)  |
|  /            landing                     |
|  /problems           list + filters       |
|  /problems/[slug]     code or design ui    |
|  /submissions/[id]    result screen        |
|  /u/[username]        public profile       |
|  /dashboard            your activity        |
+-------------------------------------------+
  |
  |  fetch()
  v
+-------------------------------------------+
| API routes (src/app/api/**)               |
|  GET  /api/problems                       |
|  GET  /api/problems/[slug]                |
|  POST /api/submit/code      -> mockJudge  |
|  POST /api/submit/design    -> mockJudge  |
|  GET  /api/submissions/[id]               |
|  GET  /api/users/[username]               |
+-------------------------------------------+
  |
  v
+-------------------------------------------+
| src/lib                                   |
|  data/problems.ts   seed problems         |
|  data/users.ts      seed demo profiles    |
|  mockJudge.ts        <-- MOCKED, see below |
|  submissionStore.ts   server-side JSON file  |
|  clientActivity.ts    browser localStorage   |
+-------------------------------------------+
```

## What's real

- The UI, routing, and page flow match the real product's user journey (browse -> pick a problem -> solve -> submit -> see a result -> track progress on a profile).
- The code editor is a real Monaco editor instance.
- The design canvas is a real drag-and-drop diagram builder (React Flow): drag components from a palette, connect them, configure per-node properties (label, replica count, notes).
- The submission result shapes (`CodeResult`, `DesignResult` in `src/lib/types.ts`) match the real API contract field-for-field.
- Like the real product, a design submission never reveals which grading criteria passed or failed, only the aggregate score. That restraint is intentional in the real product (you're meant to practice against it like a real interview, not read it like an answer key), and this demo preserves it rather than inventing a more detailed report.

## What's mocked

`src/lib/mockJudge.ts` is the only place evaluation happens in this repo, and it is explicitly, visibly fake:

- `mockJudgeCode()` picks a random verdict (weighted so ACCEPTED is most common) and a random test-case pass count. It does not parse, run, or understand the submitted code at all.
- `mockJudgeDesign()` picks a random number of "criteria" passed out of a random total. It does not inspect the submitted diagram's nodes or edges for correctness.

The real Systema evaluation engine, both the code judge (sandboxed execution against hidden test cases) and the design grader (the actual criteria and how a diagram is checked against them), is proprietary and lives only in the private, closed-source repository. Nothing about its internal logic is present, described, or reconstructed here.

## Persistence

There is no database. This keeps the demo to `npm install && npm run dev` with zero setup:

- Submissions are written to a small JSON file under `.data/` on disk (`src/lib/submissionStore.ts`), gitignored. This is sufficient for a local demo; it does not persist across environments and would not survive multiple instances. (An in-memory `Map` was tried first, but Next.js dev mode compiles API routes and pages into separate module instances, so that singleton wasn't actually shared between the write and the read; going through the filesystem avoids that.)
- Your own solved/attempt history and streak are stored in the browser's `localStorage` (`src/lib/clientActivity.ts`), keyed per-browser. Other demo profiles (`ananya-dsgn`, `rohit-codes`) show pre-seeded, clearly-fake sample activity so the profile and follow UI has something to display.
