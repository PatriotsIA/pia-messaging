import { Seo } from '../lib/seo/Seo'
import { PageHeader } from '../components/ui/PageHeader'
import { Card, CardGlow } from '../components/ui/Card'
import { siteConfig } from '../config/site'

const effective = siteConfig.legalRevisionDate

export function PrivacyPage() {
  return (
    <>
      <Seo
        title="Privacy policy"
        description="Review the Patriot Messaging privacy policy for website, contact, outreach intake, analytics, and communications data."
        canonicalPath="/privacy"
      />
      <PageHeader
        eyebrow="Legal"
        title="Privacy policy"
        subtitle={`Privacy Policy for ${siteConfig.legalName} website and outreach intake services, aligned with common 10DLC and text messaging review expectations.`}
      />

      <div className="mt-10 mx-auto max-w-4xl">
        <Card>
          <CardGlow />
          <div className="relative space-y-8 text-sm leading-relaxed text-patriot-text">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-patriot-muted">
              Effective date: {effective}
            </p>

            <p>
              {siteConfig.legalName} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting the privacy of visitors,
              prospects, clients, subscribers, and users (&quot;you&quot; or &quot;your&quot;) of our website and outreach intake services.
              This Privacy Policy outlines our practices regarding the collection, use, and disclosure of personal
              information through our website, contact forms, messaging intake forms, and related communications. By
              accessing and using our website, you consent to the terms of this Privacy Policy.
            </p>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold tracking-wide text-patriot-navy">1. Information we collect</h2>
              <p className="font-semibold text-patriot-navy">a) Personal information</p>
              <p>
                We may collect personal information you voluntarily provide, such as your name, email address, postal
                address, phone number, organization name, campaign or business details, target audience notes, message
                content, and any other information you submit through our website forms.
              </p>
              <p className="font-semibold text-patriot-navy">b) Text messaging opt-in data</p>
              <p>
                If you choose to opt in to receive text messages from us, we may collect your phone number, consent
                status, program context, and related data required for text messaging services.
              </p>
              <p className="font-semibold text-patriot-navy">c) Automatically collected information</p>
              <p>
                When you visit our website, we may automatically collect certain information about your device, browser,
                and usage patterns. This information may include IP addresses, cookies, and other tracking technologies
                when those tools are enabled for this deployment.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold tracking-wide text-patriot-navy">2. Use of information</h2>
              <p className="font-semibold text-patriot-navy">a) General uses</p>
              <p>We may use the personal information you provide to:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Communicate with you, respond to inquiries, and evaluate outreach service requests;</li>
                <li>Prepare or administer promotional business, political, candidate, issue advocacy, civic, or public-facing outreach programs;</li>
                <li>Send updates, service communications, scheduling messages, support responses, and other information you request or consent to receive;</li>
                <li>Analyze and improve our website performance, content, forms, and user experience;</li>
                <li>Comply with legal, regulatory, carrier, platform, or vendor obligations and enforce our rights and agreements.</li>
              </ul>
              <p className="font-semibold text-patriot-navy">b) Text messaging opt-in data</p>
              <p>
                Your phone number and related data collected for text messaging services will be used to send you
                messages and updates you have consented to receive, which may include promotional, political, issue
                advocacy, informational, or service-related messages depending on the program you join.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold tracking-wide text-patriot-navy">3. Sharing of information</h2>
              <p className="font-semibold text-patriot-navy">a) General</p>
              <p>
                <strong className="text-patriot-navy">
                  We will not share, sell, rent, or disclose your personal information to any third parties,
                </strong>{' '}
                except as described in this Privacy Policy or when required by law. For clarity, we may engage service
                providers such as website hosting, form intake, email delivery, SMS delivery vendors, compliance vendors,
                analytics providers, or customer support tools solely to operate services on our behalf, under contractual
                obligations consistent with this Policy. They may not use your data for their own marketing.
              </p>
              <p className="font-semibold text-patriot-navy">b) Text messaging opt-in data</p>
              <p>
                <strong className="text-patriot-navy">
                  We will not share or sell your text messaging opt-in data, consent, or related personal information with
                  any third parties,
                </strong>{' '}
                unless required by law.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold tracking-wide text-patriot-navy">4. Data security</h2>
              <p>
                We take reasonable measures to protect the security of your personal information and employ
                industry-standard security technologies where appropriate. However, no method of transmission over the
                internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold tracking-wide text-patriot-navy">5. Third-party services</h2>
              <p>
                Our website may contain links to third-party websites or services. We are not responsible for the privacy
                practices or content of such third parties. We encourage you to review the privacy policies of those third
                parties when you leave our site.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold tracking-wide text-patriot-navy">6. Children's privacy</h2>
              <p>
                Our website is not intended for use by individuals under the age of 13. We do not knowingly collect
                personal information from children under 13. If we become aware that we have collected personal
                information from a child under 13 without appropriate consent, we will take steps to remove such information.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold tracking-wide text-patriot-navy">7. Updates to this privacy policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other
                operational, legal, or regulatory reasons. Changes will be effective upon posting of the revised Privacy
                Policy on our website. We encourage you to review this page periodically.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-bold tracking-wide text-patriot-navy">8. Contact us</h2>
              <p>
                If you have any questions or concerns regarding this Privacy Policy or our privacy practices, please
                contact us at{' '}
                <a className="font-semibold text-patriot-blue underline" href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
                , by phone at{' '}
                <a className="font-semibold text-patriot-blue underline" href={`tel:${siteConfig.contact.phoneDial}`}>
                  Phone: {siteConfig.contact.phone}
                </a>
                , by mail at {siteConfig.contact.mailingAddress}, or through the Contact page on this website.
              </p>
            </section>
          </div>
        </Card>
      </div>
    </>
  )
}
