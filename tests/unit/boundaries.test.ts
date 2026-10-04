import { it, expect } from "vitest";
// @ts-expect-error The repository checker is an executable JavaScript tool.
import { violation } from "../../scripts/boundaries.mjs";
it("rejects reversed dependencies and runtime server imports in the browser", () => {
  expect(
    violation(
      "apps/api/src/modules/account/domain/rule.ts",
      "../infrastructure/db",
    ),
  ).toBeTruthy();
  expect(
    violation(
      "apps/api/src/modules/account/application/action.ts",
      "../infrastructure/db",
    ),
  ).toBeTruthy();
  expect(
    violation("apps/web/src/view.ts", "../../api/src/composition"),
  ).toBeTruthy();
  expect(
    violation(
      "packages/contracts/src/index.ts",
      "../../../apps/api/src/composition",
    ),
  ).toBeTruthy();
});
it("permits pure rules, declared ports and the erased API router contract", () => {
  expect(
    violation(
      "apps/api/src/modules/account/application/action.ts",
      "../domain/profile",
    ),
  ).toBe(null);
  expect(
    violation(
      "apps/api/src/modules/account/infrastructure/db.ts",
      "../application/service",
    ),
  ).toBe(null);
  expect(
    violation(
      "apps/web/src/lib/client.ts",
      "../../../api/src/transport/router",
      true,
    ),
  ).toBe(null);
});
