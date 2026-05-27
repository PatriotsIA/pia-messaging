import { useEffect } from 'react'
import { envBool } from '../env'

export function Analytics() {
  const enabled = envBool(import.meta.env.VITE_ANALYTICS_ENABLED, false)
  const provider = (import.meta.env.VITE_ANALYTICS_PROVIDER as string | undefined) ?? ''

  useEffect(() => {
    if (!enabled) return
    if (provider !== 'plausible') return

    const domain = (import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined) ?? ''
    if (!domain) return

    const src =
      (import.meta.env.VITE_PLAUSIBLE_SRC as string | undefined) ?? 'https://plausible.io/js/script.js'

    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-analytics="plausible"][data-domain="${CSS.escape(domain)}"]`,
    )
    if (existing) return

    const script = document.createElement('script')
    script.defer = true
    script.src = src
    script.dataset.domain = domain
    script.dataset.analytics = 'plausible'
    document.head.appendChild(script)

    return () => {
      script.remove()
    }
  }, [enabled, provider])

  return null
}

