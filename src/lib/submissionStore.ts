import fs from "fs";
import path from "path";
import { Submission } from "@/lib/types";

/**
 * Server-only. Submissions are written to a small JSON file under `.data/`
 * (fine for a local `npm run dev` demo, not meant to survive across
 * environments or scale to multiple instances). No database required.
 *
 * A plain in-memory Map was tried first, but Next.js dev mode compiles API
 * route handlers and pages as separate module instances, so that singleton
 * wasn't actually shared between the route that writes a submission and the
 * page that reads it back. Going through the filesystem sidesteps that.
 */

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "submissions.json");

function readAllSubmissions(): Record<string, Submission> {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return {};
  }
}

function writeAllSubmissions(all: Record<string, Submission>) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2));
}

export function saveSubmission(submission: Submission) {
  const all = readAllSubmissions();
  all[submission.id] = submission;
  writeAllSubmissions(all);
}

export function getSubmission(id: string): Submission | undefined {
  return readAllSubmissions()[id];
}
