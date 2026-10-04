import { test, expect } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { capture } from "./evidence";
test("new learner creates an account and recovers it through local email", async ({
  page,
  request,
}, info) => {
  const status = JSON.parse(
    execFileSync("supabase", ["status", "-o", "json"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }),
  );
  const admin = createClient(status.API_URL, status.SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });
  const email = "recovery-" + Date.now() + "@example.test";
  const password = randomBytes(24).toString("base64url");
  let userId: string | undefined;
  try {
    await page.goto("/");
    await page
      .getByRole("button", { name: "Create a practice account" })
      .click();
    await page.getByLabel("Email address").fill(email);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page
      .getByRole("button", { name: "Create practice account", exact: true })
      .click();
    await expect(
      page.getByRole("heading", { name: "A strong foundation.", exact: false }),
    ).toBeVisible();
    const users = await admin.auth.admin.listUsers();
    userId = users.data.users.find((u) => u.email === email)?.id;
    await page.getByRole("button", { name: "Sign out" }).click();
    await page.getByRole("button", { name: "Forgot password?" }).click();
    await page.getByLabel("Email address").fill(email);
    await page.getByRole("button", { name: "Send recovery link" }).click();
    await expect(page.getByRole("status")).toContainText("local email inbox");
    await capture(page, info, "10-recovery-requested");
    let mailId = "";
    await expect
      .poll(async () => {
        const response = await request.get(
          "http://127.0.0.1:58324/api/v1/messages",
        );
        const data = z
          .object({
            messages: z.array(
              z.object({
                ID: z.string(),
                To: z.array(z.object({ Address: z.string() })),
              }),
            ),
          })
          .parse(await response.json());
        mailId =
          data.messages.find((message) =>
            message.To.some((to) => to.Address === email),
          )?.ID ?? "";
        return Boolean(mailId);
      })
      .toBe(true);
    const mailResponse = await request.get(
      "http://127.0.0.1:58324/api/v1/message/" + mailId,
    );
    const mail = z
      .object({ HTML: z.string() })
      .parse(await mailResponse.json());
    const link = mail.HTML.match(/href="([^"]+)"/)?.[1]?.replaceAll(
      "&amp;",
      "&",
    );
    if (!link || !link.startsWith("http://127.0.0.1:58321/auth/v1/verify"))
      throw Error("Expected local recovery link.");
    await page.goto(link);
    await expect(
      page.getByRole("heading", { name: "A space that feels like you." }),
    ).toBeVisible();
    const replacement = randomBytes(24).toString("base64url");
    await page.getByLabel("New password", { exact: true }).fill(replacement);
    await page
      .getByRole("button", { name: "Update password", exact: true })
      .click();
    await expect(page.getByRole("status")).toContainText(
      "Your password has been changed",
    );
    await capture(page, info, "11-password-recovered");
    await page.getByRole("button", { name: "Sign out" }).click();
    await page.getByLabel("Email address").fill(email);
    await page.getByLabel("Password", { exact: true }).fill(replacement);
    await page.getByRole("button", { name: "Sign in", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "A space that feels like you." }),
    ).toBeVisible();
  } finally {
    if (userId) await admin.auth.admin.deleteUser(userId);
  }
});
