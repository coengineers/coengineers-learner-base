import { test, expect } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { capture } from "./evidence";
test("live API and database enforce actor ownership", async ({}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "API isolation is independent of viewport.",
  );
  execFileSync(process.execPath, ["scripts/integration.mjs"], {
    stdio: "pipe",
  });
});
test("a failed save keeps the entry and recovers on retry", async ({
  page,
}, testInfo) => {
  const fixture = JSON.parse(await readFile(".local/reviewer.json", "utf8"));
  await page.goto("/");
  await page.getByLabel("Email address").fill(fixture.email);
  await page.getByLabel("Password", { exact: true }).fill(fixture.password);
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "A strong foundation.", exact: false }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Set up your account" }).click();
  await expect(page.getByLabel("Your name")).toBeEnabled();
  await page.getByLabel("Your name").fill("Alex Recovery");
  await page.route("**/api/trpc/saveProfile**", (route) =>
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: '{"error":"unavailable"}',
    }),
  );
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByRole("alert")).toContainText(
    "Your entry is still here",
  );
  await expect(page.getByLabel("Your name")).toHaveValue("Alex Recovery");
  await capture(page, testInfo, "08-save-failure");
  await page.unroute("**/api/trpc/saveProfile**");
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Your details have been saved",
  );
  await capture(page, testInfo, "09-recovered-save");
});
