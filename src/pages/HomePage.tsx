import { ArrowRight, Megaphone, MessageSquareText, ShieldCheck, Users } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { LinkButton } from '../components/ui/LinkButton'
import { Card, CardGlow } from '../components/ui/Card'
import { Reveal } from '../components/motion/Reveal'
import { Seo } from '../lib/seo/Seo'
import { siteConfig } from '../config/site'
import { organizationJsonLd, websiteJsonLd } from '../lib/seo/structuredData'
import { Field } from '../components/ui/Field'
import { Input } from '../components/ui/Input'
import { Textarea } from '../components/ui/Textarea'
import { Button } from '../components/ui/Button'
import { sendSiteFormEmail } from '../lib/emailJsForms'
import { ContactConsentLabel } from '../components/compliance/ContactConsentLabel'
import { ReadinessChecklistFields } from '../components/forms/ReadinessChecklistFields'
import { buildReadinessEmailData, readinessDefaultValues } from '../lib/readinessIntake'

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

const homeInquirySchema = z.object({
  name: z.string().min(2, 'Please enter your name.'),
  email: z.string().email('Please enter a valid email address.'),
  organizationName: z.string().optional(),
  message: z.string().min(10, 'Please tell us a little about your messaging needs.'),
  readinessItems: z.array(z.string()).optional(),
  websiteUrl: z.string().optional(),
  messagingNumber: z.string().optional(),
  budgetRange: z.string().optional(),
  campaignManagerContact: z.string().optional(),
  candidateContact: z.string().optional(),
  decisionMakerContact: z.string().optional(),
  readinessNotes: z.string().optional(),
  consentToContact: z.boolean().refine((v) => v === true, {
    message: 'Please confirm consent to be contacted.',
  }),
  botField: z.string().optional(),
})

type HomeInquiryValues = z.infer<typeof homeInquirySchema>

export function HomePage() {
  const form = useForm<HomeInquiryValues>({
    resolver: zodResolver(homeInquirySchema),
    defaultValues: {
      name: '',
      email: '',
      organizationName: '',
      message: '',
      ...readinessDefaultValues,
      consentToContact: false,
      botField: '',
    },
  })

  async function onSubmit(values: HomeInquiryValues) {
    if (values.botField) return
    await sendSiteFormEmail({
      formLabel: 'Patriot Messaging home page readiness inquiry',
      emailSubjectTitle: values.organizationName?.trim()
        ? `Readiness inquiry - ${values.organizationName.trim()}`
        : 'Readiness inquiry',
      data: {
        name: values.name,
        email: values.email,
        ...(values.organizationName?.trim() ? { organizationName: values.organizationName.trim() } : {}),
        message: values.message,
        ...buildReadinessEmailData(values),
        consentToContact: true,
        agreePrivacyPolicy: true,
      },
    })
  }

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

        <Reveal delay={0.18}>
          <section className="mt-12 rounded-3xl border border-patriot-border bg-patriot-bg p-6 shadow-card sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.26em] text-patriot-red">Readiness check</div>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-wide text-patriot-navy">
                  Know what is ready before your first message goes out
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-patriot-text">
                  Candidates, campaigns, and businesses can use this quick intake to tell us what is already in place:
                  policies, verification, numbers, contacts, budget, and list details.
                </p>
              </div>

              <Card>
                <CardGlow />
                <div className="relative">
                  <div className="text-xs font-bold uppercase tracking-[0.22em] text-patriot-red">Email contact form</div>
                  <form
                    className="mt-5 grid gap-4 md:grid-cols-2"
                    onSubmit={form.handleSubmit(async (values) => {
                      await toast.promise(onSubmit(values), {
                        loading: 'Sending...',
                        success: 'Thanks - we received your readiness details.',
                        error: 'Send failed. Please try again or email us directly.',
                      })
                      form.reset()
                    })}
                    name="home-readiness-inquiry"
                  >
                    <div className="hidden">
                      <label>
                        Do not fill this out if you are human: <input {...form.register('botField')} />
                      </label>
                    </div>

                    <Field label="Name" error={form.formState.errors.name?.message}>
                      <Input {...form.register('name')} aria-invalid={!!form.formState.errors.name} autoComplete="name" />
                    </Field>
                    <Field label="Email" error={form.formState.errors.email?.message}>
                      <Input {...form.register('email')} aria-invalid={!!form.formState.errors.email} autoComplete="email" />
                    </Field>
                    <div className="md:col-span-2">
                      <Field label="Campaign, organization, or business">
                        <Input {...form.register('organizationName')} autoComplete="organization" />
                      </Field>
                    </div>
                    <div className="md:col-span-2">
                      <Field label="What are you trying to send?" error={form.formState.errors.message?.message}>
                        <Textarea {...form.register('message')} aria-invalid={!!form.formState.errors.message} />
                      </Field>
                    </div>

                    <ReadinessChecklistFields register={form.register} />

                    <div className="md:col-span-2">
                      <label className="flex items-start gap-3 rounded-xl border border-patriot-border bg-patriot-bg-soft px-4 py-3 text-sm text-patriot-text">
                        <input type="checkbox" {...form.register('consentToContact')} className="mt-1 h-4 w-4 accent-patriot-blue" />
                        <span>
                          <ContactConsentLabel purpose="my readiness and messaging inquiry" />
                          {form.formState.errors.consentToContact?.message ? (
                            <span className="ml-2 text-xs font-semibold text-patriot-red">
                              {form.formState.errors.consentToContact.message}
                            </span>
                          ) : null}
                        </span>
                      </label>
                    </div>

                    <div className="md:col-span-2 flex justify-end">
                      <Button type="submit" variant="primary">
                        Send readiness details
                      </Button>
                    </div>
                  </form>
                </div>
              </Card>
            </div>
          </section>
        </Reveal>
      </div>
    </>
  )
}
