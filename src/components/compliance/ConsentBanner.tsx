import { useState, useSyncExternalStore } from 'react'
import { Button } from '../ui/Button'
import { getStoredAnalyticsConsent, updateAnalyticsConsent } from '../../lib/analytics/googleConsent'

function subscribeToHydration() {
  return () => undefined
}

function getClientSnapshot() {
  return true
}

function getServerSnapshot() {
  return false
}

export function ConsentBanner() {
  const isHydrated = useSyncExternalStore(subscribeToHydration, getClientSnapshot, getServerSnapshot)
  const [hasSavedChoice, setHasSavedChoice] = useState(false)

  if (!isHydrated || hasSavedChoice || getStoredAnalyticsConsent() !== null) return null

  const saveChoice = (analyticsGranted: boolean) => {
    updateAnalyticsConsent(analyticsGranted)
    setHasSavedChoice(true)
  }

  return (
    <section
      aria-label="Cookie and analytics consent"
      className="fixed inset-x-0 bottom-0 z-[90] border-t border-patriot-border bg-patriot-bg/95 px-4 py-4 shadow-[0_-18px_50px_rgba(27,38,115,0.14)] backdrop-blur sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl space-y-2">
          <h2 className="font-display text-lg font-bold tracking-wide text-patriot-navy">
            Help us improve this website
          </h2>
          <p className="text-sm leading-relaxed text-patriot-muted">
            We use Google Analytics through Google Tag Manager to understand site traffic and improve our outreach.
            You can choose whether analytics storage is allowed. Advertising storage, ad personalization, and ad user
            data stay off. See our{' '}
            <a className="font-semibold text-patriot-navy underline decoration-patriot-blue/40 underline-offset-4" href="/privacy">
              privacy policy
            </a>
            .
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:shrink-0">
          <Button variant="outline" size="sm" onClick={() => saveChoice(false)}>
            Decline analytics
          </Button>
          <Button variant="primary" size="sm" onClick={() => saveChoice(true)}>
            Accept analytics
          </Button>
        </div>
      </div>
    </section>
  )
}

