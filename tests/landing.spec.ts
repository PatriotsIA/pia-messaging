import { test, expect, type Page } from '@playwright/test'

async function settleFonts(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.load('700 40px "Barlow Condensed"')
    await document.fonts.load('400 17px "Source Sans 3"')
    await document.fonts.ready
  })
}

async function fillQuote(page: Page) {
  await page.getByLabel('Name', { exact: true }).fill('Website QA')
  await page.getByLabel('Email', { exact: true }).fill('qa@example.com')
  await page.getByLabel('Race or campaign').fill('Example county race')
  await page
    .getByLabel('What you’re interested in')
    .selectOption('Text messaging')
  await page
    .getByLabel('Anything else')
    .fill('A sample request used only in an intercepted browser test.')
}

test.beforeEach(async ({ page }) => {
  await page.route('https://api.emailjs.com/**', (route) => route.abort())
  await page.route(/googletagmanager|google-analytics/, (route) =>
    route.abort(),
  )
  await page.addInitScript(() =>
    localStorage.setItem(
      'patriot_messaging_cookie_consent_v1',
      JSON.stringify({ analytics: false }),
    ),
  )
})

test('production HTML contains the complete page before JavaScript', async ({
  request,
}) => {
  const response = await request.get('/')
  const html = await response.text()
  expect(html).toContain('Reach every Texas voter')
  expect(html).toContain('Hardeman County neighbors')
  expect(html).toContain('Outside Texas, the data charge applies')
  expect(html).toContain('dan@patriotmessaging.com')
  expect(html).toContain('application/ld+json')
  expect(html).toContain('data-prerendered-path="/"')
  const sitemap = await (await request.get('/sitemap.xml')).text()
  expect(sitemap).not.toContain('/messaging')
  expect(sitemap).not.toContain('/contact')
})

test('loads without runtime or hydration errors and uses local brand assets', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  const failures: string[] = []
  page.on('response', (response) => {
    if (response.url().includes('127.0.0.1') && response.status() >= 400)
      failures.push(response.url())
  })
  await page.goto('/')
  await settleFonts(page)
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
  await expect(page.locator('.header-brand img')).toHaveAttribute(
    'src',
    '/brand/patriot-messaging-logo.png',
  )
  await page.locator('footer').scrollIntoViewIfNeeded()
  await expect(page.locator('.footer-patriot img')).toHaveJSProperty(
    'naturalWidth',
    250,
  )
  expect(errors).toEqual([])
  expect(failures).toEqual([])
})

for (const width of [320, 390, 768, 1280, 1920]) {
  test(`responsive layout fits at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    await settleFonts(page)
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width)
    await expect(page.locator('.service-card')).toHaveCount(6)
    await expect(page.locator('.creative-card')).toHaveCount(3)
    const phone = await page.locator('.phone').boundingBox()
    expect(phone!.x).toBeGreaterThanOrEqual(0)
    expect(phone!.x + phone!.width).toBeLessThanOrEqual(width)
  })
}

test('section links and keyboard pricing disclosures work', async ({
  page,
}) => {
  await page.goto('/')
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Pricing' })
    .click()
  await expect(page).toHaveURL(/#pricing$/)
  const summary = page
    .locator('summary')
    .filter({ hasText: 'Setup and compliance' })
  await summary.focus()
  await page.keyboard.press('Enter')
  await expect(
    page.getByText(/Email IPs, sending domains, and setup are included/),
  ).toBeVisible()
  await page
    .locator('summary')
    .filter({ hasText: 'Voter data for smaller universes' })
    .click()
  await expect(
    page.getByText(/Outside Texas, the data charge applies/),
  ).toBeVisible()
  await page
    .locator('summary')
    .filter({ hasText: 'Which message is right' })
    .click()
  await expect(page.getByText(/On MMS: it earns its keep/)).toBeVisible()
})

test('mobile navigation supports Escape and closes after anchor navigation', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Open menu' }).click()
  await expect(
    page.getByRole('navigation', { name: 'Mobile navigation' }),
  ).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused()
  await page.getByRole('button', { name: 'Open menu' }).click()
  await page
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByRole('link', { name: 'Creative' })
    .click()
  await expect(page).toHaveURL(/#creative$/)
  await expect(
    page.getByRole('navigation', { name: 'Mobile navigation' }),
  ).toHaveCount(0)
})

for (const [path, section] of [
  ['/services', 'services'],
  ['/messaging', 'services'],
  ['/contact', 'contact'],
]) {
  test(`old ${path} URL opens the right single-page section`, async ({
    page,
  }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto(`${path}?source=legacy`)
    await expect(page).toHaveURL(new RegExp(`/\\?source=legacy#${section}$`))
    await expect(page.locator(`#${section}`)).toBeInViewport()
    expect(errors).toEqual([])
  })
}

test('required fields validate and the email fallback never claims delivery', async ({
  page,
}) => {
  await page.goto('http://127.0.0.1:5182/#contact')
  await page.getByRole('button', { name: 'Send request' }).click()
  await expect(page.getByLabel('Name', { exact: true })).toBeFocused()
  await fillQuote(page)
  await page.getByRole('button', { name: 'Send request' }).click()
  await expect(
    page.getByText('Your email draft is ready.', { exact: false }),
  ).toBeVisible()
  const draft = await page
    .getByRole('link', { name: 'Open draft again' })
    .getAttribute('href')
  expect(draft).toMatch(/^mailto:dan@patriotmessaging.com\?/)
  expect(decodeURIComponent(draft!)).toContain('Example county race')
  await expect(page.getByLabel('Name', { exact: true })).toHaveValue(
    'Website QA',
  )
  await expect(page.getByText('Request sent.', { exact: false })).toHaveCount(0)
})

test('configured email submission routes to Dan and reports success only after acceptance', async ({
  page,
}) => {
  let payload: Record<string, unknown> | undefined
  await page.route(
    'https://api.emailjs.com/api/v1.0/email/send',
    async (route) => {
      payload = route.request().postDataJSON()
      await route.fulfill({ status: 200, body: 'OK' })
    },
  )
  await page.goto('http://127.0.0.1:5181/#contact')
  await fillQuote(page)
  await page.getByRole('button', { name: 'Send request' }).click()
  await expect(
    page.getByText('Request sent. Thank you — Dan will be in touch.'),
  ).toBeVisible()
  expect(payload?.template_params).toMatchObject({
    to_email: 'dan@patriotmessaging.com',
    reply_to: 'qa@example.com',
    email: 'qa@example.com',
    page_url: 'http://127.0.0.1:5181/#contact',
  })
  await expect(page.getByLabel('Name', { exact: true })).toHaveValue('')
})

test('email failure keeps answers and lets the visitor retry', async ({
  page,
}) => {
  let requests = 0
  await page.route(
    'https://api.emailjs.com/api/v1.0/email/send',
    async (route) => {
      requests++
      await route.fulfill({
        status: requests === 1 ? 500 : 200,
        body: requests === 1 ? 'Failed' : 'OK',
      })
    },
  )
  await page.goto('http://127.0.0.1:5181/#contact')
  await fillQuote(page)
  await page.getByRole('button', { name: 'Send request' }).click()
  await expect(page.getByRole('alert')).toContainText(
    'Your request wasn’t sent.',
  )
  await expect(page.getByLabel('Race or campaign')).toHaveValue(
    'Example county race',
  )
  await page.getByRole('button', { name: 'Send request' }).click()
  await expect(
    page.getByText('Request sent. Thank you — Dan will be in touch.'),
  ).toBeVisible()
  expect(requests).toBe(2)
})

test('reduced motion suppresses the animated footer GIF', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('.footer-patriot img')).toHaveCount(0)
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe('auto')
})

test('legal pages retain the redesigned navigation and contact address', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  for (const path of ['/privacy', '/terms']) {
    await page.goto(path)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.locator('.desktop-nav')).toBeVisible()
    await expect(
      page.getByRole('link', { name: 'dan@patriotmessaging.com' }).first(),
    ).toBeVisible()
  }
  expect(errors).toEqual([])
})

test('first-visit analytics choices fit on mobile and persist', async ({
  browser,
}) => {
  for (const choice of ['Decline analytics', 'Accept analytics']) {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
    })
    await page.route(/googletagmanager|google-analytics/, (route) =>
      route.abort(),
    )
    await page.goto('http://127.0.0.1:5180/')
    const panel = page.getByRole('complementary', {
      name: 'Cookie and analytics consent',
    })
    await expect(panel).toBeVisible()
    const box = await panel.boundingBox()
    expect(box!.x + box!.width).toBeLessThanOrEqual(390)
    await panel.getByRole('button', { name: choice }).click()
    await expect(panel).toHaveCount(0)
    const saved = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('patriot_messaging_cookie_consent_v1')!),
    )
    expect(saved.analytics).toBe(choice === 'Accept analytics')
    await page.reload()
    await expect(panel).toHaveCount(0)
    await page.close()
  }
})

test('legal revision dates hydrate consistently after the build date', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.clock.setFixedTime(new Date('2027-01-01T12:00:00Z'))
  // Exercise the actual legal-page HTML even when Vite preview falls back to
  // the home document for an extensionless URL.
  await page.route(/\/(privacy|terms)$/, async (route) => {
    const pathname = new URL(route.request().url()).pathname
    const response = await page.request.get(`${pathname}/index.html`)
    expect(await response.text()).toContain(`data-prerendered-path="${pathname}"`)
    await route.fulfill({ response })
  })
  await page.goto('/privacy')
  await expect(page.getByText('Effective date: September 15, 2026')).toBeVisible()
  await page.goto('/terms')
  await expect(page.getByText('Last revised: September 15, 2026')).toBeVisible()
  expect(errors).toEqual([])
})
