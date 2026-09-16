import { RouterProvider } from 'react-router-dom'
import type { DataRouter } from 'react-router'
import { Analytics } from '../lib/analytics/Analytics'
import { ConsentBanner } from '../components/compliance/ConsentBanner'

export function AppShell({ router }: { router: DataRouter }) {
  return (
    <>
      <Analytics />
      <RouterProvider router={router} />
      <ConsentBanner />
    </>
  )
}
