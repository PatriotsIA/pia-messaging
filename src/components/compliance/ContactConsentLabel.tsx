import { Link } from 'react-router-dom'
import { siteConfig } from '../../config/site'

type Props = {
  purpose: string
}

const linkClass =
  'font-semibold text-patriot-blue underline decoration-patriot-blue/30 underline-offset-2 hover:decoration-patriot-blue/60'

export function ContactConsentLabel({ purpose }: Props) {
  return (
    <>
      I consent to be contacted by {siteConfig.legalName} about {purpose} using the contact information I provide. I
      have read and agree to the{' '}
      <Link className={linkClass} to="/privacy" target="_blank" rel="noopener noreferrer">
        Privacy Policy
      </Link>{' '}
      and{' '}
      <Link className={linkClass} to="/terms" target="_blank" rel="noopener noreferrer">
        Terms &amp; Conditions
      </Link>
      .
    </>
  )
}
