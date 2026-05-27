/**
 * Cloudflare Turnstile verification example (server-side, Vercel).
 *
 * - Set env var: TURNSTILE_SECRET_KEY
 * - POST JSON: { "token": "<turnstile-response>" }
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed')
    return
  }

  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    res.status(500).json({ success: false, error: 'Missing TURNSTILE_SECRET_KEY' })
    return
  }

  const token = req.body?.token || ''
  if (!token) {
    res.status(400).json({ success: false, error: 'Missing token' })
    return
  }

  const resp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token }).toString(),
  })

  const data = await resp.json().catch(() => ({}))
  res.status(200).json(data)
}

