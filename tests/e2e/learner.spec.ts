import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile } from "node:fs/promises";
import { capture } from "./evidence";
test("learner signs in, changes their name, keeps a private file and signs out", async ({
  page,
}, testInfo) => {
  const fixture = JSON.parse(await readFile(".local/reviewer.json", "utf8"));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Welcome back." }),
  ).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await capture(page, testInfo, "01-sign-in");
  await page.getByLabel("Email address").fill(fixture.email);
  await page.getByLabel("Password", { exact: true }).fill(fixture.password);
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "A strong foundation.", exact: false }),
  ).toBeVisible();
  await page.screenshot({
    path: ".local/" + testInfo.project.name + "-overview.png",
    fullPage: true,
  });
  await capture(page, testInfo, "02-overview");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await expect(
      page.getByRole("dialog", { name: "Workspace navigation" }),
    ).toBeVisible();
    await capture(page, testInfo, "12-mobile-navigation");
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: "Open navigation" }),
    ).toBeFocused();
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page
      .getByRole("dialog")
      .getByRole("link", { name: "My files" })
      .click();
    await expect(
      page.getByRole("heading", { name: "Keep useful things close." }),
    ).toBeVisible();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await page.goto("/");
  }
  // Scan once Home has rendered: after the reload the opening message has no heading yet.
  await expect(
    page.getByRole("heading", { name: "A strong foundation.", exact: false }),
  ).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.getByRole("link", { name: "Set up your account" }).click();
  await page.getByLabel("Your name").fill("Alex Example");
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Your details have been saved",
  );
  await capture(page, testInfo, "03-profile-saved");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.reload();
  await expect(page.getByLabel("Your name")).toHaveValue("Alex Example");
  await page.goto("/files");
  await expect(
    page.getByRole("heading", { name: "Keep useful things close." }),
  ).toBeVisible();
  const name = "practice-" + testInfo.project.name + "-" + Date.now() + ".txt";
  await capture(page, testInfo, "04-files-empty");
  await page.getByLabel("Add a file").setInputFiles({
    name,
    mimeType: "text/plain",
    buffer: Buffer.from("Synthetic practice file. No business evidence."),
  });
  await expect(page.getByText(name, { exact: true })).toBeVisible();
  await capture(page, testInfo, "05-file-uploaded");
  const downloadEvent = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Download " + name, exact: true })
    .click();
  expect((await downloadEvent).suggestedFilename()).toBe(name);
  await page
    .getByRole("button", { name: "Remove " + name, exact: true })
    .click();
  await capture(page, testInfo, "06-remove-confirmation");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Keep file", exact: true }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Keep file", exact: true }).click();
  await expect(page.getByText(name, { exact: true })).toBeVisible();
  await page
    .getByRole("button", { name: "Remove " + name, exact: true })
    .click();
  await page.getByRole("button", { name: "Remove file", exact: true }).click();
  await expect(page.getByText(name, { exact: true })).toHaveCount(0);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  const width = await page.evaluate(() => ({
    content: document.documentElement.scrollWidth,
    viewport: innerWidth,
  }));
  expect(width.content).toBeLessThanOrEqual(width.viewport);
  await page.goto("/guide");
  await expect(
    page.getByRole("heading", { name: "Start small. Make it yours." }),
  ).toBeVisible();
  await capture(page, testInfo, "07-getting-started");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(
    page.getByRole("heading", { name: "Welcome back." }),
  ).toBeVisible();
  await page.goto("/account");
  await expect(
    page.getByRole("heading", { name: "Welcome back." }),
  ).toBeVisible();
});
test("invalid login stays private and keyboard focus is visible", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByLabel("Email address").fill("nobody@example.test");
  await page
    .getByLabel("Password", { exact: true })
    .fill("wrong-password-example");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText(
    "We could not sign you in",
  );
  // Start from a known field. Which element holds focus after a mouse click differs by browser
  // (WebKit does not focus a clicked button), so pressing Tab straight after the click landed on
  // different things and this check failed now and then on changes that never touched it.
  await page.getByLabel("Email address").focus();
  await page.keyboard.press("Tab");
  await expect
    .poll(() =>
      page.evaluate(() => {
        const focused = document.activeElement;
        return !focused || focused === document.body
          ? "nothing focused"
          : getComputedStyle(focused).outlineStyle;
      }),
    )
    .toBe("solid");
});
