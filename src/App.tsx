import { HelmetProvider } from 'react-helmet-async'
import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from './app/AppShell'
import { routes } from './app/router'

const router = createBrowserRouter(routes)

export default function App() {
  return (
    <HelmetProvider>
      <AppShell router={router} />
    </HelmetProvider>
  )
}
