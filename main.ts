// Rejected Olympic Sports — make.fun entry
// u-motasimfuad-rejected-olympic-sports-9d83e7da
//
// Writes one funny single-line sport the Olympics turned down to
// /output/entry.txt. The line must be a made-up event that sounds like
// something a broadcaster would have to announce with a straight face:
// plausible as an event name, absurd as a contest. Node 22, stdlib only.

import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = "/output";
const OUT_PATH = join(OUT_DIR, "entry.txt");

// The entry: synchronised queueing — four athletes, one bus that never
// arrives, and a podium decided by who loses their temper first.
const ENTRY =
  "Synchronised Queueing: four athletes stand in line for a bus that " +
  "never comes, judged on posture, patience, and who snaps first.";

function validateEntry(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
  if (/[\n\r]/.test(text)) {
    throw new Error("entry must be exactly one line");
  }
  if (/\t/.test(text) || /  /.test(text)) {
    throw new Error("entry must not contain tabs or double spaces");
  }
  if (!text.endsWith(".")) {
    throw new Error("entry must end with a full stop");
  }
}

function sha256(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

function main(): void {
  validateEntry(ENTRY);
  // Create the output directory if missing; never delete it.
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_PATH, ENTRY, "utf8");
  // Read back and confirm the file on disk is exactly the entry.
  const onDisk = readFileSync(OUT_PATH, "utf8");
  if (onDisk !== ENTRY) {
    throw new Error("output on disk does not match the entry");
  }
  validateEntry(onDisk);
  console.log(`wrote ${OUT_PATH} (${[...onDisk].length} chars, sha256 ${sha256(onDisk)})`);
}

main();
