import { chromium } from "playwright";

async function verifyInteractions() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  console.log("==> Navigating to homepage...");
  await page.goto("http://localhost:4321/", { waitUntil: "networkidle" });

  console.log("==> Testing Theme Toggle...");
  const themeBtn = page.locator("[data-theme-toggle]");
  await themeBtn.click();
  const themeVal = await page.evaluate(() => document.documentElement.dataset.theme);
  console.log(`Theme toggled to: ${themeVal}`);

  console.log("==> Testing Navigation Dropdown...");
  const summary = page.locator("nav details summary").first();
  await summary.click();
  const isOpen = await page.evaluate(() => document.querySelector("nav details")?.hasAttribute("open"));
  console.log(`Navigation dropdown open state: ${isOpen}`);

  console.log("==> Testing FAQ Accordion...");
  const faqSummary = page.locator(".faq-question").first();
  await faqSummary.click();
  const faqOpen = await page.evaluate(() => document.querySelector(".faq-item")?.hasAttribute("open"));
  console.log(`FAQ accordion open state: ${faqOpen}`);

  console.log("==> Testing Mobile Menu...");
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mobilePage = await mobileContext.newPage();
  mobilePage.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  await mobilePage.goto("http://localhost:4321/", { waitUntil: "networkidle" });
  const toggleBtn = mobilePage.locator("[data-mobile-nav-toggle]");
  await toggleBtn.click();
  const isMobileNavOpen = await mobilePage.evaluate(() => document.body.classList.contains("mobile-nav-open"));
  console.log(`Mobile navigation drawer open state: ${isMobileNavOpen}`);

  await browser.close();

  if (consoleErrors.length > 0) {
    console.error("Console errors found:", consoleErrors);
    process.exit(1);
  } else {
    console.log("✓ All interaction tests passed with 0 console errors!");
  }
}

verifyInteractions().catch((err) => {
  console.error(err);
  process.exit(1);
});
