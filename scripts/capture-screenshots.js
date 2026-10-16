import { chromium } from "playwright";
import path from "path";
import fs from "fs";

const viewports = [
  { name: "1440x1000", width: 1440, height: 1000 },
  { name: "1280x800", width: 1280, height: 800 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "390x844", width: 390, height: 844 },
  { name: "320x700", width: 320, height: 700 },
];

const routes = [
  { path: "/", name: "home" },
  { path: "/comparisons/", name: "comparisons-index" },
  { path: "/comparisons/flexirule-vs-server-scripts/", name: "comparison-server-scripts" },
  { path: "/comparisons/flexirule-vs-custom-hooks/", name: "comparison-custom-hooks" },
];

const mode = process.argv[2] || "after"; // "baseline", "after", or "reference"
const targetDir = path.join(process.cwd(), "docs", "screenshots", mode);

fs.mkdirSync(targetDir, { recursive: true });

async function captureScreenshots() {
  const browser = await chromium.launch();

  if (mode === "reference") {
    console.log("Capturing reference website screenshots...");
    const refUrl = "https://frappe.io/erpnext/version-16";
    for (const vp of viewports) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      try {
        await page.goto(refUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
        await page.waitForTimeout(3000);
        const filename = `reference_${vp.name}.png`;
        await page.screenshot({ path: path.join(targetDir, filename), fullPage: true });
        console.log(`Saved reference screenshot: ${filename}`);
      } catch (err) {
        console.error(`Failed to capture reference page at ${vp.name}:`, err);
      } finally {
        await page.close();
      }
    }
  } else {
    console.log(`Capturing local site (${mode}) screenshots...`);
    const baseUrl = "http://localhost:4321";
    for (const route of routes) {
      for (const vp of viewports) {
        const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
        try {
          await page.goto(`${baseUrl}${route.path}`, { waitUntil: "networkidle", timeout: 15000 });
          await page.waitForTimeout(300);

          // General full page screenshot
          const filename = `${route.name}_${vp.name}.png`;
          await page.screenshot({ path: path.join(targetDir, filename), fullPage: true });
          console.log(`Saved ${mode} screenshot: ${filename}`);

          // Specifically on home route, capture side menu expanded and collapsed states
          if (route.path === "/" && (vp.name === "1440x1000" || vp.name === "390x844")) {
            const toggleBtn = page.locator("[data-side-menu-toggle]");
            if (await toggleBtn.count() > 0) {
              // Capture open state screenshot viewport
              await page.screenshot({ path: path.join(targetDir, `${route.name}_sidemenu_open_${vp.name}.png`) });
              console.log(`Saved sidemenu open screenshot: ${route.name}_sidemenu_open_${vp.name}.png`);

              // Toggle collapse
              await toggleBtn.click();
              await page.waitForTimeout(200);
              await page.screenshot({ path: path.join(targetDir, `${route.name}_sidemenu_collapsed_${vp.name}.png`) });
              console.log(`Saved sidemenu collapsed screenshot: ${route.name}_sidemenu_collapsed_${vp.name}.png`);
            }
          }
        } catch (err) {
          console.error(`Failed to capture ${route.path} at ${vp.name}:`, err);
        } finally {
          await page.close();
        }
      }
    }
  }

  await browser.close();
}

captureScreenshots().catch(console.error);
