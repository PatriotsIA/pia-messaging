import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const distDir = path.join(process.cwd(), 'dist')
const ssrDir = path.join(process.cwd(), 'dist-ssr')

const routes = ['/', '/messaging', '/services', '/contact', '/privacy', '/terms']

async function findEntryServer() {
  const files = await fs.readdir(ssrDir).catch(() => [])
  const match = files.find((f) => /^entry-server\.(m?js|cjs)$/.test(f)) || files.find((f) => /^entry-server\./.test(f))
  if (!match) throw new Error('Could not find SSR entry in dist-ssr/. Run: vite build --ssr src/entry-server.tsx --outDir dist-ssr')
  return path.join(ssrDir, match)
}

const entry = await findEntryServer()
const mod = await import(pathToFileURL(entry).toString())
if (typeof mod.render !== 'function') throw new Error('SSR entry does not export render(url)')

const template = await fs.readFile(path.join(distDir, 'index.html'), 'utf8')

function extractLeadingHeadTags(html) {
  let rest = html
  const tags = []
  const tagPattern = /^\s*(<(?:title|meta|link)\b(?:[^>"']|"[^"]*"|'[^']*')*(?:\/>|>[\s\S]*?<\/title>))/i

  while (true) {
    const match = rest.match(tagPattern)
    if (!match) break
    tags.push(match[1])
    rest = rest.slice(match[0].length)
  }

  return { headTags: tags.join('\n'), appHtml: rest }
}

function stripTemplateSeo(html) {
  return html
    .replace(/\n\s*<title>[\s\S]*?<\/title>/i, '')
    .replace(/\n\s*<meta\s+name="description"[\s\S]*?\/>/i, '')
    .replace(/\n\s*<meta\s+name="robots"[\s\S]*?\/>/i, '')
}

for (const route of routes) {
  const { appHtml, head } = await mod.render(route)
  const extracted = extractLeadingHeadTags(appHtml ?? '')
  const headMarkup = [head, extracted.headTags].filter(Boolean).join('\n')
  const html = stripTemplateSeo(template)
    .replace('</head>', `${headMarkup}\n  </head>`)
    .replace('<div id="root">', `<div id="root" data-prerendered-path="${route}">`)
    .replace('<!--app-html-->', extracted.appHtml)

  const outDir = route === '/' ? distDir : path.join(distDir, route.replace(/^\//, ''))
  await fs.mkdir(outDir, { recursive: true })
  await fs.writeFile(path.join(outDir, 'index.html'), html, 'utf8')
  console.log(`[prerender] ${route} -> ${path.relative(process.cwd(), path.join(outDir, 'index.html'))}`)
}
