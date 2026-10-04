import type { Page, TestInfo } from "@playwright/test";
export async function capture(page: Page, info: TestInfo, name: string) {
  if (
    process.env.CAPTURE_EVIDENCE !== "1" ||
    !["desktop", "mobile"].includes(info.project.name)
  )
    return;
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await page.screenshot({
    path:
      "docs/evidence/screenshots/" + info.project.name + "-" + name + ".png",
    fullPage: name !== "12-mobile-navigation",
    mask: [page.locator('input[type="password"]')],
    maskColor: "#e9e7e1",
  });
}
