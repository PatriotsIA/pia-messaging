import { renderToString } from 'react-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import { createMemoryRouter } from 'react-router'
import { AppShell } from './app/AppShell'
import { routes } from './app/router'

export async function render(url: string) {
  const helmetContext: Record<string, unknown> = {}
  const router = createMemoryRouter(routes, { initialEntries: [url] })

  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <AppShell router={router} />
    </HelmetProvider>,
  )

  const helmet = (
    helmetContext as {
      helmet?: {
        title?: { toString(): string }
        meta?: { toString(): string }
        link?: { toString(): string }
        script?: { toString(): string }
      }
    }
  ).helmet

  const head = [helmet?.title?.toString(), helmet?.meta?.toString(), helmet?.link?.toString(), helmet?.script?.toString()]
    .filter(Boolean)
    .join('\n')

  return { appHtml, head }
}

