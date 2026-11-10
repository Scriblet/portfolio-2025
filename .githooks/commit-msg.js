#!/usr/bin/env node
// Conventional Commits v1.0.0: see docs/agents/commits.md
import { readFileSync } from "node:fs";

const TYPES = [
  "feat",
  "fix",
  "docs",
  "style",
  "refactor",
  "perf",
  "test",
  "build",
  "ci",
  "chore",
  "revert",
];

const HEADER_RE = new RegExp(
  `^(${TYPES.join("|")})(\\([a-z0-9][a-z0-9._/-]*\\))?(!)?: (.+)$`,
);
const SKIP_RE = /^(Merge |Revert "|fixup! |squash! |Initial commit$)/;

const file = process.argv[2];

if (!file) {
  console.error("usage: commit-msg.js <path-to-commit-message-file>");
  process.exit(1);
}

const raw = readFileSync(file, "utf8");
const header = raw.split(/\r?\n/)[0].trim();

if (SKIP_RE.test(header)) {
  process.exit(0);
}

const match = HEADER_RE.exec(header);

if (!match) {
  console.error(
    [
      "",
      "✖ Commit message does not follow Conventional Commits v1.0.0.",
      "",
      "  Expected: <type>(<scope>)!: <description>",
      "  Types:    " + TYPES.join(", "),
      "  Example:  feat(contact): validate payload on the server",
      "",
      "  See docs/agents/commits.md",
      "",
    ].join("\n"),
  );
  process.exit(1);
}

const description = match[4];

if (description.length > 100) {
  console.error(
    `✖ Description has ${description.length} characters (max 100). Keep the header short and move detail to the body.`,
  );
  process.exit(1);
}

if (description.endsWith(".")) {
  console.error("✖ Description must not end with a period.");
  process.exit(1);
}

if (header.length > 100) {
  console.warn(
    `⚠ Header has ${header.length} characters; Conventional Commits recommends keeping it under 100.`,
  );
}

process.exit(0);
