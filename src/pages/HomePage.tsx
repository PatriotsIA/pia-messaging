import { ArrowRight, Megaphone, MessageSquareText, ShieldCheck, Users } from 'lucide-react'
import { LinkButton } from '../components/ui/LinkButton'
import { Card, CardGlow } from '../components/ui/Card'
import { Reveal } from '../components/motion/Reveal'
import { Seo } from '../lib/seo/Seo'
import { siteConfig } from '../config/site'
import { organizationJsonLd, websiteJsonLd } from '../lib/seo/structuredData'

const serviceCards = [
  {
    title: 'Promotional messaging',
    icon: Megaphone,
    description:
      'Business announcements, event promotion, customer reactivation, appointment reminders, and audience updates with clear opt-in language.',
  },
  {
    title: 'Political outreach',
    icon: Users,
    description:
      'Candidate, committee, and issue-advocacy outreach intake for voter education, persuasion, fundraising, GOTV, and event turnout.',
  },
  {
    title: 'Compliance-first setup',
    icon: ShieldCheck,
    description:
      'Website disclosures, consent labels, privacy and terms links, HELP/STOP language, and intake documentation aligned with 10DLC review expectations.',
  },
]

export function HomePage() {
  return (
    <>
      <Seo
        title="Messaging & outreach services"
        description="Patriot Messaging supports promotional business messaging and political outreach for candidates, causes, and issue campaigns."
        canonicalPath="/"
        keywords={['Patriot Messaging', 'SMS outreach', 'political texting', 'business messaging', '10DLC compliance']}
        jsonLd={[organizationJsonLd(), websiteJsonLd()]}
      />

      <div className="relative">
        <div className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-patriot-blue/10 to-transparent" />

        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="text-xs font-bold uppercase tracking-[0.28em] text-patriot-red">
              Business, political, and issue outreach
            </div>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-wide text-patriot-navy sm:text-6xl">
              Patriot Messaging
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-snug tracking-wide text-patriot-navy/85 sm:text-base">
              {siteConfig.tagline}
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-patriot-text sm:text-lg">
              Reach the right people with clear, compliant messaging workflows for business promotions, candidate
              campaigns, public officials, ballot issues, advocacy groups, and civic organizations.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <LinkButton to="/messaging" variant="primary">
                Start an outreach inquiry <ArrowRight className="h-4 w-4" />
              </LinkButton>
              <LinkButton to="/contact" variant="outline">
                Contact us <MessageSquareText className="h-4 w-4" />
              </LinkButton>
            </div>
            <div className="mx-auto mt-4 max-w-3xl rounded-2xl border border-patriot-border bg-patriot-bg-soft p-4 text-left">
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-patriot-red">Required consent language</div>
              <p className="mt-2 text-xs leading-relaxed text-patriot-muted">
                Message and data rates may apply. Message frequency varies. Reply STOP to opt out and HELP for help.
                Consent is not required as a condition of purchase. SMS information is not rented, sold, or shared.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {serviceCards.map((service, index) => {
            const Icon = service.icon
            return (
              <Reveal key={service.title} delay={index * 0.05}>
                <Card>
                  <CardGlow />
                  <div className="relative">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-patriot-blue/10 text-patriot-blue">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="mt-4 font-display text-2xl font-bold tracking-wide text-patriot-navy">
                      {service.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-patriot-text">{service.description}</p>
                  </div>
                </Card>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.14}>
          <section className="mt-12 rounded-3xl border border-patriot-border bg-patriot-bg p-6 shadow-card sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.26em] text-patriot-red">How we help</div>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-wide text-patriot-navy">
                  Outreach with the disclosures reviewers expect
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  'Program intake for promotional and political messaging',
                  'On-site contact forms wired through EmailJS',
                  'Privacy and terms links beside consent checkboxes',
                  'HELP/STOP, frequency, carrier, and no-purchase disclosures',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-patriot-border bg-patriot-bg-soft p-4 text-sm font-semibold text-patriot-navy">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>
      </div>
    </>
  )
}
