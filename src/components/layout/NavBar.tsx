import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'
import { cn } from '../../lib/cn'
import { BrandLockup } from '../brand/Brand'
import { LinkButton } from '../ui/LinkButton'
import { siteConfig } from '../../config/site'

type NavItem = { to: string; label: string }

function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [locked])
}

function getFocusable(container: HTMLElement) {
  const selector =
    'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'
  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter((el) => !el.hasAttribute('disabled'))
}

export function NavBar() {
  const [open, setOpen] = useState(false)
  useLockBodyScroll(open)

  const openButtonRef = useRef<HTMLButtonElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)

  const nav: NavItem[] = useMemo(
    () => [
      { to: '/', label: 'Home' },
      { to: '/messaging', label: 'Services' },
      { to: '/contact', label: 'Contact' },
      { to: '/privacy', label: 'Privacy' },
      { to: '/terms', label: 'Terms' },
    ],
    [],
  )

  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    if (!panel) return

    const prev = document.activeElement as HTMLElement | null
    const focusables = getFocusable(panel)
    focusables[0]?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (!panelRef.current) return
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
        return
      }
      if (e.key !== 'Tab') return

      const focusable = getFocusable(panelRef.current)
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement as HTMLElement | null

      if (e.shiftKey) {
        if (!active || active === first) {
          e.preventDefault()
          last.focus()
        }
      } else if (active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      if (prev) prev.focus()
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-patriot-navy text-patriot-white">
        <div className="mx-auto flex w-full max-w-none flex-wrap items-center justify-between gap-3 px-3 py-2.5 text-xs sm:px-5 lg:px-8 xl:px-12 2xl:px-16">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a className="hover:underline" href={`mailto:${siteConfig.contact.email}`}>
              {siteConfig.contact.email}
            </a>
            <a className="hover:underline" href={`tel:${siteConfig.contact.phoneDial}`}>
              Phone: {siteConfig.contact.phone}
            </a>
          </div>
          <div className="hidden font-semibold tracking-wide text-patriot-white/80 sm:block">
            Promotional, political, and issue outreach
          </div>
        </div>
      </div>

      <div className="relative border-b border-patriot-border bg-patriot-bg/95 backdrop-blur">
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-patriot-red via-patriot-blue to-patriot-navy" />
        <div className="mx-auto flex w-full max-w-none items-center gap-2 px-3 py-3.5 sm:gap-3 sm:px-5 lg:gap-4 lg:px-8 lg:py-4 xl:gap-6 xl:px-12 2xl:px-16">
          <div className="min-w-0 shrink-0 lg:mr-1 xl:mr-2 2xl:mr-4">
            <BrandLockup />
          </div>

          <nav aria-label="Primary" className="hidden min-w-0 flex-1 items-stretch gap-1 lg:flex lg:gap-1.5 xl:gap-2 2xl:gap-3">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'relative flex min-w-0 flex-1 basis-0 items-center justify-center text-balance rounded-md px-1 py-2 text-center text-[0.7rem] font-semibold leading-snug tracking-wide transition sm:text-[0.75rem] md:text-xs lg:text-[0.8125rem] xl:text-sm xl:whitespace-nowrap',
                    'after:absolute after:inset-x-1 after:-bottom-0.5 after:h-[2px] after:origin-left after:rounded-full after:bg-patriot-red after:transition-transform after:duration-300 after:content-[\'\'] xl:after:inset-x-2',
                    isActive
                      ? 'text-patriot-navy after:scale-x-100'
                      : 'text-patriot-navy/80 after:scale-x-0 hover:text-patriot-navy hover:after:scale-x-100',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-2.5 lg:ml-1 xl:ml-2 2xl:ml-4">
            <div className="hidden items-center gap-2 sm:gap-2.5 lg:flex">
              <LinkButton to="/messaging" variant="outline" size="sm">
                Start outreach <ArrowRight className="h-4 w-4" />
              </LinkButton>
            </div>
            <button
              ref={openButtonRef}
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-patriot-border bg-patriot-bg text-patriot-navy shadow-[0_10px_30px_rgba(27,38,115,0.10)] hover:border-patriot-blue/55 hover:bg-patriot-bg-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-patriot-blue/25 focus-visible:ring-offset-2 focus-visible:ring-offset-patriot-bg lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-haspopup="dialog"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div className="fixed inset-0 z-[60] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" className="absolute inset-0 bg-black/30" aria-label="Close menu" onClick={() => setOpen(false)} />
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              ref={panelRef}
              className="absolute right-0 top-0 flex h-full w-[min(420px,92vw)] flex-col border-l border-patriot-border bg-patriot-bg backdrop-blur"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 40, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 240 }}
            >
              <div className="flex items-center justify-between gap-3 border-b border-patriot-border px-4 py-3">
                <Link to="/" className="inline-flex items-center gap-3" onClick={() => setOpen(false)}>
                  <span className="font-display text-lg tracking-wide text-patriot-navy">{siteConfig.name}</span>
                </Link>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-patriot-border bg-patriot-bg text-patriot-navy hover:border-patriot-blue/55 hover:bg-patriot-bg-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-patriot-blue/25 focus-visible:ring-offset-2 focus-visible:ring-offset-patriot-bg"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col gap-1 px-2 py-3">
                {nav.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'rounded-lg px-4 py-3 text-base font-semibold tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-patriot-blue/25',
                        isActive ? 'bg-patriot-bg-soft text-patriot-navy' : 'text-patriot-navy/85 hover:bg-patriot-bg-soft',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>

              <div className="mt-auto border-t border-patriot-border p-4">
                <LinkButton to="/messaging" variant="outline" onClick={() => setOpen(false)}>
                  Start outreach <ArrowRight className="h-4 w-4" />
                </LinkButton>
                <p className="mt-3 text-xs text-patriot-muted">{siteConfig.tagline}</p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
