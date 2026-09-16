import { Outlet, useLocation } from 'react-router-dom'
import { NavBar } from './NavBar'
import { Footer } from './Footer'
import { ScrollToTop } from './ScrollToTop'

export function SiteLayout() {
  const { pathname } = useLocation()
  const landing = ['/', '/services', '/messaging', '/contact'].includes(
    pathname.replace(/\/$/, '') || '/',
  )
  return (
    <div className="page-shell">
      <ScrollToTop />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <NavBar />
      <main
        id="main-content"
        tabIndex={-1}
        className={landing ? 'landing-main' : 'legal-main site-container'}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
