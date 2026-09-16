import { useRef, useState, type FormEvent } from 'react'
import { ArrowRight, CheckCircle2, LoaderCircle, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { quoteOptions } from '../../config/content'
import { siteConfig } from '../../config/site'
import { hasEmailJsConfig, sendSiteFormEmail } from '../../lib/emailJsForms'

export function QuoteForm() {
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'sent' | 'draft' | 'error'
  >('idle')
  const [draftUrl, setDraftUrl] = useState('')
  const inFlight = useRef(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (inFlight.current) return
    const form = event.currentTarget
    const fields = new FormData(form)
    if (fields.get('company_website')) return
    const data = {
      name: String(fields.get('name') ?? '').trim(),
      email: String(fields.get('email') ?? '').trim(),
      race: String(fields.get('race') ?? '').trim(),
      interest: String(fields.get('interest') ?? '').trim(),
      message: String(fields.get('message') ?? '').trim(),
    }
    if (!data.name) {
      form.querySelector<HTMLInputElement>('#quote-name')?.focus()
      return
    }
    const title = data.race
      ? `Quote request: ${data.race}`
      : 'Patriot Messaging quote request'
    if (!hasEmailJsConfig()) {
      const body = `Name: ${data.name}\nEmail: ${data.email}\nRace or campaign: ${data.race}\nInterested in: ${data.interest}\n\n${data.message}`
      const url = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`
      setDraftUrl(url)
      setStatus('draft')
      window.location.href = url
      return
    }
    inFlight.current = true
    setStatus('sending')
    try {
      await sendSiteFormEmail({
        formLabel: 'Patriot Messaging quote request',
        emailSubjectTitle: title,
        data,
      })
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    } finally {
      inFlight.current = false
    }
  }

  return (
    <form className="quote-form" onSubmit={submit} aria-label="Request a quote">
      <div className="form-pair">
        <label htmlFor="quote-name">
          Name
          <input
            id="quote-name"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            required
            maxLength={120}
          />
        </label>
        <label htmlFor="quote-email">
          Email
          <input
            id="quote-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            required
            maxLength={254}
          />
        </label>
      </div>
      <label htmlFor="quote-race">
        Race or campaign
        <input
          id="quote-race"
          name="race"
          placeholder="e.g. County Commissioner, Bond Issue, etc."
          maxLength={200}
        />
      </label>
      <label htmlFor="quote-interest">
        What you’re interested in
        <select id="quote-interest" name="interest" defaultValue="">
          <option value="" disabled>
            Select an option
          </option>
          {quoteOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <label htmlFor="quote-message">
        Anything else
        <textarea
          id="quote-message"
          name="message"
          placeholder="Tell us more about your goals…"
          rows={3}
          maxLength={5000}
        />
      </label>
      <div className="form-honeypot" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button
        className="button button-primary"
        type="submit"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? (
          <>
            <LoaderCircle className="spinner" />
            Sending…
          </>
        ) : (
          <>
            Send request <ArrowRight />
          </>
        )}
      </button>
      <p className="form-policy">
        By sending, you agree to be contacted about your request.{' '}
        <Link to="/privacy">Privacy</Link> · <Link to="/terms">Terms</Link>
      </p>
      <div aria-live="polite" aria-atomic="true">
        {status === 'sent' && (
          <p className="form-result">
            <CheckCircle2 /> Request sent. Thank you — Dan will be in touch.
          </p>
        )}
        {status === 'draft' && (
          <p className="form-result">
            <Mail />
            <span>
              Your email draft is ready. Send it from your email app to complete
              your request. <a href={draftUrl}>Open draft again</a>, or email{' '}
              <a href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
              .
            </span>
          </p>
        )}
        {status === 'error' && (
          <p className="form-result form-error" role="alert">
            Your request wasn’t sent. Please try again or email{' '}
            <a href={`mailto:${siteConfig.contact.email}`}>
              {siteConfig.contact.email}
            </a>
            . Your answers are still here.
          </p>
        )}
      </div>
    </form>
  )
}
