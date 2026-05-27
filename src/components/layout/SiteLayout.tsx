import { Outlet } from 'react-router-dom'
import { NavBar } from './NavBar'
import { Footer } from './Footer'
import { ScrollProgress } from '../motion/ScrollProgress'
import { BackToTop } from '../motion/BackToTop'
import { ScrollToTop } from './ScrollToTop'

export function SiteLayout() {
  return (
    <div className="page-shell">
      <ScrollToTop />
      <a
        href="#main-content"
        className="sr-only sr-only-focusable absolute left-3 top-3 z-[80] rounded-lg border border-patriot-border bg-patriot-bg px-3 py-2 text-sm font-semibold text-patriot-navy shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-patriot-blue/30"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <NavBar />
      <main
        id="main-content"
        tabIndex={-1}
        className="relative mx-auto w-full max-w-6xl px-4 pb-24 pt-10 focus:outline-none sm:px-6 lg:px-8"
      >
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

