import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { siteConfig } from '../../config/site'

type BrandMarkProps = {
  className?: string
  title?: string
  /**
   * Swap-in hook: provide a path to a real logo file (e.g. '/logo.svg').
   * When set, we render an <img> instead of the inline SVG.
   */
  logoSrc?: string
}

export function BrandMark({ className, title = siteConfig.name, logoSrc }: BrandMarkProps) {
  const src = logoSrc ?? siteConfig.brand.pacLogoSrc

  if (src) {
    return (
      <img
        src={src}
        alt={title}
        className={cn('h-10 w-10 object-contain sm:h-11 sm:w-11', className)}
        loading="eager"
        decoding="async"
      />
    )
  }

  return (
    <svg
      className={cn('h-10 w-10 sm:h-11 sm:w-11', className)}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id="pfa-g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#be1e2d" />
          <stop offset="0.55" stopColor="#ffffff" />
          <stop offset="1" stopColor="#1b2673" />
        </linearGradient>
      </defs>
      <path
        d="M32 4c10 6 18 7 24 8v21c0 14-9 22-24 27C17 55 8 47 8 33V12c6-1 14-2 24-8Z"
        fill="#ffffff"
        stroke="url(#pfa-g)"
        strokeWidth="2"
      />
      <path
        d="M20 21h21c4.2 0 7.8 2.7 7.8 7 0 4.6-3.8 7.2-8.4 7.2H20V21Zm7 6v5.6h11.8c1.7 0 2.9-1 2.9-2.8s-1.2-2.8-2.9-2.8H27Z"
        fill="#1b2673"
        opacity="0.92"
      />
      <path d="M22 41h20" stroke="#be1e2d" strokeWidth="2.4" strokeLinecap="round" opacity="0.9" />
    </svg>
  )
}

type BrandLockupProps = {
  className?: string
  logoSrc?: string
}

export function BrandLockup({ className, logoSrc }: BrandLockupProps) {
  return (
    <Link
      to="/"
      className={cn('group inline-flex min-w-0 shrink-0 items-center gap-3.5 sm:gap-4 pr-1 sm:pr-2', className)}
    >
      <BrandMark logoSrc={logoSrc} className="shrink-0 transition-transform duration-300 group-hover:scale-[1.03]" />
      <div className="font-display text-xl leading-tight tracking-wide text-patriot-navy sm:text-2xl sm:tracking-tight">
        {siteConfig.name}
      </div>
    </Link>
  )
}
