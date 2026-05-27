import { Link } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'
import { Seo } from '../lib/seo/Seo'
import { Card, CardGlow } from '../components/ui/Card'

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Seo title="Not found" noIndex />
      <Card>
        <CardGlow />
        <div className="relative">
          <div className="text-xs font-bold uppercase tracking-[0.28em] text-patriot-red">404</div>
          <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-wide text-patriot-navy sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-patriot-text">
            The page you’re looking for doesn’t exist, or it may have moved.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-patriot-blue px-4 text-sm font-semibold tracking-wide text-patriot-white shadow-glow-blue transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-patriot-blue/40 focus-visible:ring-offset-2 focus-visible:ring-offset-patriot-bg"
            >
              Home <Home className="h-4 w-4" />
            </Link>
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault()
                window.history.back()
              }}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-patriot-border bg-patriot-bg px-4 text-sm font-semibold tracking-wide text-patriot-navy hover:bg-patriot-bg-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-patriot-blue/40 focus-visible:ring-offset-2 focus-visible:ring-offset-patriot-bg"
            >
              Go back <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}

