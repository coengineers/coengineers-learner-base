import { it, expect } from "vitest";
import { spawnSync } from "node:child_process";

it.each([
  [],
  [process.cwd(), "learner-1234567890"],
  [process.cwd(), "coengineers-learner-base", "--confirm-synthetic-reset"],
  [process.cwd(), "../unsafe", "--confirm-synthetic-reset"],
])("refuses recovery without a confirmed isolated fixture: %j", (...args) => {
  const result = spawnSync(
    process.execPath,
    ["scripts/recovery-drill.mjs", ...args],
    { encoding: "utf8" },
  );
  expect(result.status).not.toBe(0);
  expect(result.stderr).toContain("Usage:");
  expect(result.stdout).not.toContain("starting");
});
