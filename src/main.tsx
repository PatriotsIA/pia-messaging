import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const container = document.getElementById('root')
if (!container) throw new Error('Missing #root container')

const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

const normalizePath = (path: string) => path.replace(/\/+$/, '') || '/'
const prerenderedPath = container.dataset.prerenderedPath
const matchesPrerender = prerenderedPath !== undefined &&
  normalizePath(prerenderedPath) === normalizePath(window.location.pathname)

// Static hosts can return the home document for a deep link. Only hydrate the
// matching page; let the router render a fresh tree for a fallback document.
if (container.childElementCount > 0 && matchesPrerender) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
