const { chromium } = require('playwright');
const path = require('path');

const baseDir = 'C:/Users/lucas/Documents/Github/portfolio-2025';
const antesDir = path.join(baseDir, 'screenshots/antes');
const depoisDir = path.join(baseDir, 'screenshots/depois');

async function capture() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  // Screenshots do site atual
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Header
  const header = await page.locator('header').first();
  await header.screenshot({ path: path.join(antesDir, 'header-atual.png') });

  // Presentation
  const presentation = await page.locator('#home');
  await presentation.screenshot({ path: path.join(antesDir, 'presentation-atual.png') });

  // Experience
  const experience = await page.locator('#experience');
  await experience.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await experience.screenshot({ path: path.join(antesDir, 'experience-atual.png') });

  // Skills
  const skills = await page.locator('#skills');
  await skills.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await skills.screenshot({ path: path.join(antesDir, 'skills-atual.png') });

  // GitHub banner - procurar por section com texto Github
  await page.evaluate(() => window.scrollTo(0, 3500));
  await page.waitForTimeout(800);
  const github = await page.locator('section, div').filter({ hasText: /Github/i }).first();
  if (await github.count() > 0) {
    await github.screenshot({ path: path.join(antesDir, 'github-atual.png') });
  }

  // Contato
  const contact = await page.locator('#contact');
  await contact.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await contact.screenshot({ path: path.join(antesDir, 'contact-atual.png') });

  // Screenshots dos previews
  const previews = [
    { file: 'preview-header.html', name: 'header-scroll-progresso' },
    { file: 'preview-projetos.html', name: 'projetos-destaque' },
    { file: 'preview-depoimentos.html', name: 'depoimentos' },
    { file: 'preview-timeline.html', name: 'timeline-carreira' },
    { file: 'preview-tema.html', name: 'tema-claro-escuro' },
    { file: 'preview-toolbox.html', name: 'toolbox-visual' },
    { file: 'preview-seo.html', name: 'link-preview-seo' },
    { file: 'preview-snackbar.html', name: 'snackbar-contato' },
    { file: 'preview-cv.html', name: 'download-cv' }
  ];

  for (const preview of previews) {
    await page.goto(`file:///${path.join(baseDir, 'previews', preview.file).replace(/\\/g, '/')}`);
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(depoisDir, `${preview.name}.png`), fullPage: true });
  }

  await browser.close();
  console.log('Screenshots capturados com sucesso');
}

capture().catch(err => {
  console.error('Erro:', err.message);
  process.exit(1);
});
