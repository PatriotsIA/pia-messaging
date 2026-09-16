import { useSyncExternalStore } from 'react'
import { Link } from 'react-router-dom'

function subscribe(listener: () => void) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)')
  media.addEventListener('change', listener)
  return () => media.removeEventListener('change', listener)
}

export function Footer() {
  const reducedMotion = useSyncExternalStore(
    subscribe,
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => true,
  )
  return (
    <footer className="site-footer">
      <div className="site-container footer-inner">
        <Link
          className="footer-brand"
          to="/#top"
          aria-label="Patriot Messaging home"
        >
          <img
            src="/brand/patriot-messaging-logo.png"
            alt="Patriot Messaging — Always Ready. Always Connected."
            width="870"
            height="567"
            loading="lazy"
          />
        </Link>
        <div className="footer-copy">
          <p>© 2026 Patriot Messaging, LLC · Amarillo, Texas</p>
          <p>
            Political messaging services. Not authorized by any candidate or
            candidate’s committee.
          </p>
          <div>
            <Link to="/privacy">Privacy policy</Link>
            <span aria-hidden="true"> · </span>
            <Link to="/terms">Terms &amp; conditions</Link>
          </div>
        </div>
        <div className="footer-patriot">
          {!reducedMotion && (
            <img
              src="/brand/patriot-animation.gif"
              alt="A patriot walking with his phone"
              width="250"
              height="350"
              loading="lazy"
            />
          )}
        </div>
      </div>
    </footer>
  )
}
