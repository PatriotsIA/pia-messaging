import emailjs from '@emailjs/browser'

export type SiteFormFieldValue = string | string[] | boolean | undefined

function getEmailJsConfig() {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined
  return { serviceId, templateId, publicKey }
}

function formatFieldLine(key: string, value: SiteFormFieldValue): string | null {
  if (key === 'botField') return null
  if (value === undefined || value === null) return null
  if (typeof value === 'string' && value.trim() === '') return null
  if (Array.isArray(value)) {
    const joined = value.map((v) => String(v).trim()).filter(Boolean).join(', ')
    return joined ? `${key}: ${joined}` : null
  }
  if (typeof value === 'boolean') return `${key}: ${value ? 'Yes' : 'No'}`
  return `${key}: ${value}`
}

function formatMessageBody(data: Record<string, SiteFormFieldValue>): string {
  const lines: string[] = []
  for (const [key, value] of Object.entries(data)) {
    const line = formatFieldLine(key, value)
    if (line) lines.push(line)
  }
  return lines.join('\n')
}

/**
 * Sends form data through EmailJS. Your template should define placeholders matching
 * what you pass from the dashboard; this app sends `name`, `title`, `message`, and `time`
 * (common “Contact Us” style: subject like `Contact Us: {{title}}`, body with `{{name}}`, `{{time}}`, `{{message}}`).
 */
export async function sendSiteFormEmail(params: {
  formLabel: string
  /** Fills `{{title}}` (e.g. in subject “Contact Us: {{title}}”). Defaults to `formLabel`. */
  emailSubjectTitle?: string
  data: Record<string, SiteFormFieldValue>
}): Promise<void> {
  const { serviceId, templateId, publicKey } = getEmailJsConfig()
  if (!serviceId?.trim() || !templateId?.trim() || !publicKey?.trim()) {
    throw new Error(
      'Missing EmailJS configuration. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY.',
    )
  }

  const name = String(params.data.name ?? '').trim() || 'Website visitor'
  const title =
    String(params.emailSubjectTitle ?? params.formLabel).trim() || params.formLabel
  const time = new Date().toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
  const message = [`Form: ${params.formLabel}`, '', formatMessageBody(params.data)].join('\n')

  await emailjs.send(
    serviceId.trim(),
    templateId.trim(),
    {
      name,
      title,
      message,
      time,
    },
    { publicKey: publicKey.trim() },
  )
}
