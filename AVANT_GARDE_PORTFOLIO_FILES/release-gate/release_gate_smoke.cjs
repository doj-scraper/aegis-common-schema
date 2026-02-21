const { chromium, devices } = require('playwright');
const fs = require('node:fs/promises');
const path = require('node:path');

(async () => {
  const baseURL = 'http://127.0.0.1:4173';
  const outDir = '/home/mya/Documents/2026/Kimi/AVANT_GARDE_PORTFOLIO_FILES/release-gate';

  const results = {
    generatedAt: new Date().toISOString(),
    baseURL,
    checks: [],
    screenshots: [],
    status: 'pass',
  };

  function record(name, pass, details = '') {
    results.checks.push({ name, pass, details });
    if (!pass) results.status = 'fail';
  }

  async function assertPath(page, expectedPath, name) {
    const got = new URL(page.url()).pathname;
    const pass = got === expectedPath;
    record(name, pass, `expected=${expectedPath} actual=${got}`);
  }

  async function screenshot(page, relPath, fullPage = true) {
    const file = path.join(outDir, relPath);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await page.screenshot({ path: file, fullPage });
    results.screenshots.push(relPath);
  }

  const browser = await chromium.launch({ headless: true });
  try {
    const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await desktop.newPage();

    const deepLinks = [
      { route: '/about', marker: 'CHRISTOPHER_RODRIGUEZ' },
      { route: '/projects/webapps', marker: 'Web Applications' },
      { route: '/projects/webapps/nebula-stream', marker: 'Nebula Stream' },
    ];

    for (const link of deepLinks) {
      await page.goto(`${baseURL}${link.route}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(300);
      const beforeVisible = await page.getByText(link.marker, { exact: false }).first().isVisible().catch(() => false);
      record(`deep-link render ${link.route}`, beforeVisible, `marker=${link.marker}`);

      await page.reload({ waitUntil: 'networkidle' });
      await page.waitForTimeout(300);
      const afterVisible = await page.getByText(link.marker, { exact: false }).first().isVisible().catch(() => false);
      record(`deep-link reload ${link.route}`, afterVisible, `marker=${link.marker}`);
    }

    await page.goto(`${baseURL}/about`, { waitUntil: 'networkidle' });
    await page.keyboard.press('Control+k');
    const paletteInput = page.locator('input[placeholder="Search..."]');
    const paletteVisible = await paletteInput.isVisible().catch(() => false);
    record('palette opens with Ctrl+K', paletteVisible);

    await paletteInput.fill('nebula stream');
    await page.keyboard.press('Enter');
    await page.waitForLoadState('networkidle');
    await assertPath(page, '/projects/webapps/nebula-stream', 'palette enter navigates to detail');

    await page.keyboard.press('Control+k');
    await page.waitForTimeout(100);
    const openedAgain = await paletteInput.isVisible().catch(() => false);
    record('palette reopens', openedAgain);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(100);
    const closed = !(await paletteInput.isVisible().catch(() => false));
    record('escape closes palette', closed);

    await page.goto(`${baseURL}/about`, { waitUntil: 'networkidle' });
    await page.keyboard.press('g');
    await page.keyboard.press('a');
    await page.waitForLoadState('networkidle');
    await assertPath(page, '/projects/webapps', 'g+a chord navigates webapps');

    await page.keyboard.press('g');
    await page.keyboard.press('d');
    await page.waitForLoadState('networkidle');
    await assertPath(page, '/projects/articles', 'g+d chord navigates articles');

    await page.goto(`${baseURL}/about`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(200);
    await screenshot(page, 'screenshots/desktop/about.png', true);

    await page.goto(`${baseURL}/projects/webapps`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(200);
    await screenshot(page, 'screenshots/desktop/projects-webapps.png', true);

    await page.goto(`${baseURL}/projects/webapps/nebula-stream`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(200);
    await screenshot(page, 'screenshots/desktop/projects-webapps-nebula-stream.png', true);

    const mobile = await browser.newContext({ ...devices['iPhone 13'] });
    const mPage = await mobile.newPage();

    await mPage.goto(`${baseURL}/about`, { waitUntil: 'networkidle' });
    await mPage.waitForTimeout(200);
    await screenshot(mPage, 'screenshots/mobile/about-iphone13.png', true);

    await mPage.goto(`${baseURL}/projects/webapps`, { waitUntil: 'networkidle' });
    await mPage.waitForTimeout(200);
    await screenshot(mPage, 'screenshots/mobile/projects-webapps-iphone13.png', true);

    await mobile.close();
    await desktop.close();
  } finally {
    await browser.close();
  }

  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, 'smoke-results.json'), JSON.stringify(results, null, 2));

  const failed = results.checks.filter(c => !c.pass);
  if (failed.length > 0) {
    console.error('Release smoke checks failed:');
    for (const f of failed) console.error(`- ${f.name}: ${f.details}`);
    process.exit(1);
  }

  console.log(`Release smoke checks passed (${results.checks.length} checks).`);
})();
