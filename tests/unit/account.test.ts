import { expect, it } from "vitest";
import { accountService } from "../../apps/api/src/modules/account/application/service";
import { normaliseDisplayName } from "../../apps/api/src/modules/account/domain/profile";
import { profileInput, fileName } from "../../packages/contracts/src";
import { parseConfiguration } from "../../packages/config/src";
it("normalises the user's name before crossing the persistence port", async () => {
  let saved = "";
  const service = accountService({
    get: async () => ({ id: "actor", displayName: saved }),
    save: async (displayName) => {
      saved = displayName;
      return { id: "actor", displayName };
    },
  });
  await service.save("  Alex   Smith ");
  expect(saved).toBe("Alex Smith");
  expect(await service.get()).toEqual({
    id: "actor",
    displayName: "Alex Smith",
  });
});
it("rejects empty or overlong names and extra actor identifiers", () => {
  expect(() => normaliseDisplayName("  ")).toThrow();
  expect(
    profileInput.safeParse({ displayName: "A", id: "someone-else" }).success,
  ).toBe(false);
  expect(profileInput.safeParse({ displayName: "A".repeat(81) }).success).toBe(
    false,
  );
});
it("rejects file path traversal", () => {
  for (const name of ["../other/file", "/secret", "x\\y", ".hidden"])
    expect(fileName.safeParse(name).success).toBe(false);
});
it("refuses local mode pointing to production and insecure hosted configuration", () => {
  expect(() =>
    parseConfiguration({
      SUPABASE_URL: "https://example.supabase.co",
      SUPABASE_PUBLISHABLE_KEY: "x".repeat(30),
      APP_ORIGIN: "http://localhost:4310",
      APP_ENV: "local",
    }),
  ).toThrow();
  expect(() =>
    parseConfiguration({
      SUPABASE_URL: "http://example.com",
      SUPABASE_PUBLISHABLE_KEY: "x".repeat(30),
      APP_ORIGIN: "https://example.com",
      APP_ENV: "production",
    }),
  ).toThrow();
});
