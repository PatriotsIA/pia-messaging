import { NavLink } from 'react-router-dom'
import { BrandMark } from '../brand/Brand'
import { cn } from '../../lib/cn'
import { siteConfig } from '../../config/site'

const outreachDisclosure =
  'Message and data rates may apply. Message frequency varies by program. Reply STOP to opt out and HELP for help. Consent is not required as a condition of purchase. SMS information is not rented, sold, or shared.'

export function Footer() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'text-sm font-semibold text-patriot-white/80 transition hover:text-patriot-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-patriot-blue/30 focus-visible:ring-offset-2 focus-visible:ring-offset-patriot-navy',
      isActive && 'text-patriot-white',
    )

  return (
    <footer className="relative bg-patriot-navy text-patriot-white">
      <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-patriot-red via-patriot-blue to-patriot-white" />
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.9fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3">
              <BrandMark className="h-10 w-10" />
              <div>
                <div className="font-display text-lg tracking-wide">{siteConfig.legalName}</div>
                <div className="text-sm text-patriot-white/70">{siteConfig.tagline}</div>
              </div>
            </div>
            <p className="mt-4 max-w-prose text-sm leading-relaxed text-patriot-white/75">
              Campaign-ready intake, consent language, and outreach support for businesses, candidates, issue campaigns,
              civic groups, and public-facing organizations.
            </p>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-patriot-white/70">Pages</div>
            <div className="mt-3 grid gap-2">
              <NavLink to="/" className={linkClass} end>
                Home
              </NavLink>
              <NavLink to="/messaging" className={linkClass}>
                Messaging services
              </NavLink>
              <NavLink to="/contact" className={linkClass}>
                Contact
              </NavLink>
              <NavLink to="/privacy" className={linkClass}>
                Privacy
              </NavLink>
              <NavLink to="/terms" className={linkClass}>
                Terms
              </NavLink>
            </div>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-patriot-white/70">Contact</div>
            <div className="mt-3 grid gap-2 text-sm text-patriot-white/80">
              <a className="hover:text-patriot-white" href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
              <a className="hover:text-patriot-white" href={`tel:${siteConfig.contact.phoneDial}`}>
                Phone: {siteConfig.contact.phone}
              </a>
              <div className="max-w-xs leading-relaxed text-patriot-white/75">{siteConfig.contact.mailingAddress}</div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-white/15 bg-white/10 p-4">
          <div className="text-xs leading-relaxed text-patriot-white/85">
            <div className="font-semibold tracking-wide text-patriot-white">Messaging disclosure</div>
            <div className="mt-2 text-patriot-white/80">{outreachDisclosure}</div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 text-xs text-patriot-white/60 sm:flex-row sm:items-center sm:justify-between">
          <div>Copyright {new Date().getFullYear()} {siteConfig.legalName}</div>
          <div className="font-medium tracking-wide">{siteConfig.tagline}</div>
        </div>
      </div>
    </footer>
  )
}
