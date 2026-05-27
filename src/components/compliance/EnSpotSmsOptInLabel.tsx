import { Link } from 'react-router-dom'

type Props = {
  /** Organization or brand name that appears in carrier / 10DLC registration (e.g. PAC legal name). */
  organizationName: string
  /** Phrase after “receive … messages” — e.g. EnSpot’s “informational and donation-related”. */
  purposePhrase: string
}

/**
 * Checkbox label aligned with EnSpot Political’s website worksheet example (TCPA / 10DLC context).
 * “Privacy Policy” and “Terms & Conditions” must link to on-site pages, per EnSpot.
 */
export function EnSpotSmsOptInLabel({ organizationName, purposePhrase }: Props) {
  const linkClass =
    'font-semibold text-patriot-blue underline decoration-patriot-blue/30 underline-offset-2 hover:decoration-patriot-blue/60'

  return (
    <>
      By providing your telephone number and email, you consent to receive {purposePhrase} messages and calls from{' '}
      <strong className="font-semibold text-patriot-navy">{organizationName}</strong>, including pre-recorded messages and
      via automated methods. Msg &amp; data rates may apply. Msg frequency may vary. Reply &quot;STOP&quot; to opt-out and
      &quot;HELP&quot; for help. View our{' '}
      <Link className={linkClass} to="/privacy" target="_blank" rel="noopener noreferrer">
        Privacy Policy
      </Link>{' '}
      and{' '}
      <Link className={linkClass} to="/terms" target="_blank" rel="noopener noreferrer">
        Terms &amp; Conditions
      </Link>{' '}
      for more information.
    </>
  )
}
