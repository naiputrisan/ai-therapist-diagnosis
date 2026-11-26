import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Entry: a single-line diagnosis from an AI therapist, calm clinical voice,
// human habit turned into a deadpan finding, twist landing at the very end.
const ENTRY =
  "Diagnosis: chronic prompt addiction. You asked me to diagnose you, then rephrased the question until I said what you wanted to hear.";

// Pre-write guard: the source text itself must already satisfy the gate.
if (ENTRY.length < 1 || ENTRY.length > 200 || ENTRY.trim().length === 0) {
  throw new Error(`source entry length ${ENTRY.length} outside gate 1-200`);
}
if (ENTRY.includes("\n") || ENTRY !== ENTRY.trim()) {
  throw new Error("source entry must be a single line with no surrounding whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read back and enforce the gate ourselves: UTF-8, 1-200 chars, one line.
const out = readFileSync("/output/entry.txt", "utf8");
if (out.length < 1 || out.length > 200) {
  throw new Error(`entry length ${out.length} outside gate 1-200`);
}
if (out.trim().length === 0 || out.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}
console.log(`wrote /output/entry.txt (${out.length} chars)`);
