import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Phone, X } from 'lucide-react'
import { siteConfig } from '../../config/site'

const navigation = [
  ['services', 'Services'],
  ['pricing', 'Pricing'],
  ['creative', 'Creative'],
  ['process', 'How it works'],
  ['about', 'About'],
]

export function NavBar() {
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const anchor = (id: string) =>
    location.pathname === '/' ? `#${id}` : `/#${id}`

  useEffect(() => {
    if (!open) return
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [open])

  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Link
          className="header-brand"
          to="/#top"
          aria-label="Patriot Messaging home"
          onClick={() => setOpen(false)}
        >
          <img
            src="/brand/patriot-messaging-logo.png"
            alt="Patriot Messaging — Always Ready. Always Connected."
            width="870"
            height="567"
          />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(([id, label]) => (
            <a href={anchor(id)} key={id}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a
            className="header-phone"
            href={`tel:${siteConfig.contact.phoneDial}`}
            onClick={() => setOpen(false)}
          >
            <Phone aria-hidden="true" />
            {siteConfig.contact.phone}
          </a>
          <a
            className="button button-primary header-quote"
            href={anchor('contact')}
            onClick={() => setOpen(false)}
          >
            Get a quote
          </a>
        </div>
        <button
          className="menu-toggle"
          ref={toggle}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          className="mobile-nav"
          id="mobile-menu"
          aria-label="Mobile navigation"
        >
          {navigation.map(([id, label]) => (
            <a key={id} href={anchor(id)} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
