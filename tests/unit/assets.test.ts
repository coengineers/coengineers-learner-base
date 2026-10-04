import { it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import inventory from "../../docs/font-inventory.json";

it("includes reviewed font binaries and accompanying distribution notices", () => {
  const directory = "apps/web/public/fonts/";
  expect(
    readdirSync(directory)
      .filter((name) => name.endsWith(".woff2"))
      .sort(),
  ).toEqual(inventory.map((font) => font.file).sort());
  for (const font of inventory) {
    expect(
      createHash("sha256")
        .update(readFileSync(directory + font.file))
        .digest("hex"),
    ).toBe(font.sha256);
    const notice = readFileSync(directory + font.notice, "utf8");
    expect(notice).toContain(font.family + " Project Authors");
    expect(notice).toContain("SIL OPEN FONT LICENSE Version 1.1");
    expect(notice).toContain("PERMISSION");
    expect(notice).toContain("DISCLAIMER");
  }
});
