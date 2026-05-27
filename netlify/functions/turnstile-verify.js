/**
 * Cloudflare Turnstile verification example (server-side).
 *
 * - Set env var: TURNSTILE_SECRET_KEY
 * - POST JSON: { "token": "<turnstile-response>" }
 *
 * This function is intentionally minimal; add logging/ratelimiting as needed.
 */
export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    return { statusCode: 500, body: JSON.stringify({ success: false, error: 'Missing TURNSTILE_SECRET_KEY' }) }
  }

  let token = ''
  try {
    const body = event.body ? JSON.parse(event.body) : {}
    token = body.token || ''
  } catch {
    token = ''
  }

  if (!token) {
    return { statusCode: 400, body: JSON.stringify({ success: false, error: 'Missing token' }) }
  }

  const resp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token }).toString(),
  })

  const data = await resp.json().catch(() => ({}))
  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(data),
  }
}

