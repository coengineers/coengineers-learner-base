import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";

// Exercise the hosted presentation with the isolated local identity service.
// This does not prove hosted email delivery or provider configuration.
test("hosted users can sign in and request recovery without GitHub", async ({
  page,
}) => {
  await page.route("**/api/config", async (route) => {
    const response = await route.fetch();
    const config = await response.json();
    await route.fulfill({ response, json: { ...config, local: false } });
  });
  const fixture = JSON.parse(await readFile(".local/reviewer.json", "utf8"));
  await page.goto("/");
  // Identity stays beside the form even when the story panel is hidden on phones.
  await expect(page.locator(".auth-card .brand-identity")).toBeVisible();
  // The name is shown exactly once: as the wordmark text, or as the accessible name of a
  // logo that already spells it (logoIncludesName), never both.
  await expect(
    page
      .locator(".auth-card .brand-identity")
      .locator(".wordmark:not(:empty), img.brand-logo:not([alt=''])"),
  ).toHaveCount(1);
  await expect(
    page.getByRole("button", { name: "Continue with GitHub" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Create an account", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Create an account", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Create account", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".auth-card .brand-identity")).toBeVisible();
  await expect(
    page.getByText(
      "Use at least 12 characters and a password unique to this app.",
    ),
  ).toBeVisible();
  await expect(page.getByText("Local preview", { exact: false })).toHaveCount(
    0,
  );
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await page.getByLabel("Email address").fill(fixture.email);
  await page.getByLabel("Password", { exact: true }).fill(fixture.password);
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
  await page.goto("/account");
  await expect(page.getByLabel("New password", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Sign out" }).click();
  await page.getByRole("button", { name: "Forgot password?" }).click();
  await expect(page.locator(".auth-card .brand-identity")).toBeVisible();
  await page
    .getByLabel("Email address")
    .fill("g13-recovery-check@example.test");
  await page.getByRole("button", { name: "Send recovery link" }).click();
  await expect(page.getByRole("status")).toContainText(
    "check your email for a recovery link",
  );
  await expect(
    page.getByRole("link", { name: "Open local email inbox" }),
  ).toHaveCount(0);
});
