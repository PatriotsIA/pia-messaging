import fs from 'node:fs/promises'
import path from 'node:path'

const distDir = path.join(process.cwd(), 'dist')
const baseUrlRaw = process.env.VITE_SITE_URL || process.env.SITE_URL || ''
const baseUrl = (baseUrlRaw || 'https://patriotmessaging.com').replace(/\/+$/, '')

function joinUrl(p) {
  return new URL(p, `${baseUrl}/`).toString()
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10)
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
]

const routesByPath = new Map()
for (const route of staticRoutes) {
  if (route?.path && !routesByPath.has(route.path)) routesByPath.set(route.path, route)
}
const routes = Array.from(routesByPath.values())

const lastmod = todayIsoDate()
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  routes
    .map((r) => {
      const loc = escapeXml(joinUrl(r.path))
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${escapeXml(r.lastmod ?? lastmod)}</lastmod>`,
        `    <changefreq>${escapeXml(r.changefreq ?? 'monthly')}</changefreq>`,
        `    <priority>${escapeXml(r.priority ?? '0.5')}</priority>`,
        '  </url>',
      ].join('\n')
    })
    .join('\n') +
  `\n</urlset>\n`

const robotsTxt = [
  'User-agent: *',
  'Allow: /',
  `Sitemap: ${new URL('/sitemap.xml', `${baseUrl}/`).toString()}`,
  '',
].join('\n')

await fs.mkdir(distDir, { recursive: true })
await fs.writeFile(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8')
await fs.writeFile(path.join(distDir, 'robots.txt'), robotsTxt, 'utf8')

console.log(`[seo] Wrote sitemap.xml (${routes.length} routes) and robots.txt`)
