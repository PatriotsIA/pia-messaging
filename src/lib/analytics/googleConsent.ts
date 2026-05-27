const CONSENT_STORAGE_KEY = 'patriot_messaging_cookie_consent_v1'

type GoogleConsentValue = 'granted' | 'denied'

type StoredConsent = {
  analytics: boolean
  updatedAt: string
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function getConsentState(analyticsGranted: boolean) {
  const analyticsStorage: GoogleConsentValue = analyticsGranted ? 'granted' : 'denied'

  return {
    ad_storage: 'denied' as GoogleConsentValue,
    ad_user_data: 'denied' as GoogleConsentValue,
    ad_personalization: 'denied' as GoogleConsentValue,
    analytics_storage: analyticsStorage,
    functionality_storage: 'granted' as GoogleConsentValue,
    personalization_storage: 'denied' as GoogleConsentValue,
    security_storage: 'granted' as GoogleConsentValue,
  }
}

function pushGtagCommand(...args: unknown[]) {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer ?? []

  if (typeof window.gtag === 'function') {
    window.gtag(...args)
    return
  }

  window.dataLayer.push(args)
}

export function getStoredAnalyticsConsent() {
  if (typeof window === 'undefined') return null

  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!stored) return null

    const consent = JSON.parse(stored) as Partial<StoredConsent>
    return consent.analytics === true
  } catch {
    return null
  }
}

export function updateAnalyticsConsent(analyticsGranted: boolean) {
  if (typeof window === 'undefined') return

  const consent: StoredConsent = {
    analytics: analyticsGranted,
    updatedAt: new Date().toISOString(),
  }

  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent))
  pushGtagCommand('consent', 'update', getConsentState(analyticsGranted))
  window.dataLayer?.push({
    event: 'consent_update',
    analytics_consent: analyticsGranted ? 'granted' : 'denied',
  })
}

