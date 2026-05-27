export function envBool(value: unknown, defaultValue = false) {
  if (value === undefined || value === null || value === '') return defaultValue
  if (typeof value === 'boolean') return value
  const v = String(value).trim().toLowerCase()
  return v === '1' || v === 'true' || v === 'yes' || v === 'on'
}

export function getSiteUrl() {
  const raw = (import.meta.env.VITE_SITE_URL as string | undefined) ?? ''
  return raw.replace(/\/+$/, '')
}

