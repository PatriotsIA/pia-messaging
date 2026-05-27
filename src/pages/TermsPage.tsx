import { Link } from 'react-router-dom'
import { Seo } from '../lib/seo/Seo'
import { PageHeader } from '../components/ui/PageHeader'
import { Card, CardGlow } from '../components/ui/Card'
import { siteConfig } from '../config/site'

const lastRevised = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

export function TermsPage() {
  return (
    <>
      <Seo
        title="Terms & conditions"
        description="Review the Patriot Messaging terms and conditions for website use, outreach intake, forms, and communications."
        canonicalPath="/terms"
      />
      <PageHeader
        eyebrow="Legal"
        title="Terms &amp; conditions"
        subtitle={`Terms for use of ${siteConfig.legalName} online services, including mobile communications disclosures used for business and political outreach vetting.`}
      />

      <div className="mt-10 mx-auto max-w-4xl">
        <Card>
          <CardGlow />
          <div className="relative space-y-8 text-sm leading-relaxed text-patriot-text">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-patriot-muted">Last revised: {lastRevised}</p>

            <p>
              These Terms and Conditions (&quot;Terms&quot;) apply to your access to and use of the websites and other online
              services (collectively, the &quot;Services&quot;) provided by {siteConfig.legalName} (&quot;we,&quot; &quot;us,&quot; or &quot;client&quot;).
              By accessing and using the Services, you agree to these Terms. If you do not agree to these Terms, do not
              use the Services.
            </p>
            <p>
              We may update these Terms from time to time by revising the &quot;Last revised&quot; date above; when required we
              may provide additional notice. Continued use after changes constitutes acceptance unless you stop using the
              Services.
            </p>
            <p>
              Questions:{' '}
              <a className="font-semibold text-patriot-blue underline" href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
              , by phone at{' '}
              <a className="font-semibold text-patriot-blue underline" href={`tel:${siteConfig.contact.phoneDial}`}>
                Phone: {siteConfig.contact.phone}
              </a>
              , or by mail to {siteConfig.contact.mailingAddress}.
            </p>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold tracking-wide text-patriot-navy">Privacy policy</h2>
              <p>
                For information about how we collect, use, and share information about you, please see our{' '}
                <Link className="font-semibold text-patriot-blue underline" to="/privacy">
                  Privacy Policy
                </Link>
                .
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold tracking-wide text-patriot-navy">Mobile communications</h2>
              <p>
                If you subscribe to receive messages or calls, you consent to receive automated messages from us via your
                mobile device. Subscribers may receive multiple messages a week from us, depending on the program you join.
                Programs may include promotional business communications, candidate or campaign updates, public official
                communications, issue advocacy, voter education, event reminders, fundraising messages, and other outreach.
              </p>
              <p>
                We do not charge for these services. However, your carrier's normal messaging, data, and other rates and
                fees will still apply. You should check with your carrier to find out what plans are available and how much
                they cost. At any time, you may text STOP to cancel or HELP for customer support information. For all
                questions about the services provided, you can send an email to{' '}
                <a className="font-semibold text-patriot-blue underline" href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
                .
              </p>
              <p>Carriers are not liable for delayed or undelivered messages.</p>
              <p>
                By entering your phone number and selecting to opt in, you consent to join a recurring SMS/MMS text
                messaging program that may provide alerts, promotional offers, business updates, political communications,
                issue advocacy, donation requests, voter education, event reminders, and other important information. By
                participating, you agree to the terms &amp; privacy policy for auto-dialed messages from us to the phone
                number you provide. No consent is required to buy goods or services. Msg &amp; data rates may apply. Reply
                HELP for help or STOP to opt-out at any time. SMS information is not rented, sold, or shared. See our{' '}
                <Link className="font-semibold text-patriot-blue underline" to="/privacy">
                  Privacy Policy
                </Link>{' '}
                and these Terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold tracking-wide text-patriot-navy">Outreach services</h2>
              <p>
                Patriot Messaging provides intake and coordination for messaging and outreach programs. You are responsible
                for ensuring that your campaign, business, committee, organization, content, data, consent records, and
                outreach instructions comply with applicable laws, platform rules, carrier requirements, and any approvals
                required by your counsel or compliance vendors.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold tracking-wide text-patriot-navy">User submissions</h2>
              <p>
                Messages, campaign details, business information, audience notes, and other content you provide may be
                reviewed, edited for clarity, or declined. Do not submit confidential information you are not authorized to
                share.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold tracking-wide text-patriot-navy">Disclaimer &amp; limitation of liability</h2>
              <p>
                THE SERVICES AND CONTENT ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY
                KIND, EXPRESS OR IMPLIED, TO THE FULLEST EXTENT PERMITTED BY LAW. TO THE FULLEST EXTENT PERMITTED BY LAW,
                WE WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY
                LOSS OF DATA, PROFITS, REVENUE, DELIVERABILITY, PLATFORM ACCESS, CARRIER APPROVAL, OR CAMPAIGN OUTCOME,
                ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICES.
              </p>
            </section>
          </div>
        </Card>
      </div>
    </>
  )
}
