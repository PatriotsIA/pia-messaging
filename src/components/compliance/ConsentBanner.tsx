import { useState, useSyncExternalStore } from 'react'
import {
  getStoredAnalyticsConsent,
  updateAnalyticsConsent,
} from '../../lib/analytics/googleConsent'

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
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    getClientSnapshot,
    getServerSnapshot,
  )
  const [hasSavedChoice, setHasSavedChoice] = useState(false)

  if (!isHydrated || hasSavedChoice || getStoredAnalyticsConsent() !== null)
    return null

  const saveChoice = (analyticsGranted: boolean) => {
    updateAnalyticsConsent(analyticsGranted)
    setHasSavedChoice(true)
  }

  return (
    <aside aria-label="Cookie and analytics consent" className="consent-panel">
      <div>
        <div>
          <h2>Help us improve this website</h2>
          <p>
            We use analytics to understand site visits. You can accept or
            decline analytics cookies. Read our{' '}
            <a href="/privacy">privacy policy</a>.
          </p>
        </div>
        <div className="consent-actions">
          <button
            className="button consent-decline"
            onClick={() => saveChoice(false)}
          >
            Decline analytics
          </button>
          <button
            className="button button-primary"
            onClick={() => saveChoice(true)}
          >
            Accept analytics
          </button>
        </div>
      </div>
    </aside>
  )
}
