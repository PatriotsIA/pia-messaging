import { z } from 'zod'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { Building2, Megaphone, MessageSquareText, ShieldCheck, Vote } from 'lucide-react'
import { Seo } from '../lib/seo/Seo'
import { PageHeader } from '../components/ui/PageHeader'
import { Card, CardGlow } from '../components/ui/Card'
import { Field } from '../components/ui/Field'
import { Input } from '../components/ui/Input'
import { Textarea } from '../components/ui/Textarea'
import { Select } from '../components/ui/Select'
import { Button } from '../components/ui/Button'
import { sendSiteFormEmail } from '../lib/emailJsForms'
import { siteConfig } from '../config/site'
import { EnSpotSmsOptInLabel } from '../components/compliance/EnSpotSmsOptInLabel'
import { ContactConsentLabel } from '../components/compliance/ContactConsentLabel'

const audienceOptions = [
  { value: 'business', label: 'Business or commercial brand' },
  { value: 'candidate', label: 'Candidate or campaign' },
  { value: 'issue', label: 'Issue advocacy or ballot measure' },
  { value: 'official', label: 'Elected official or public office' },
  { value: 'nonprofit', label: 'Nonprofit, civic group, or association' },
] as const

const programOptions = [
  { value: 'promotional', label: 'Promotional / business outreach' },
  { value: 'political', label: 'Political / candidate outreach' },
  { value: 'issue', label: 'Issue advocacy / voter education' },
  { value: 'mixed', label: 'Mixed or not sure yet' },
] as const

const messagingSchema = z
  .object({
    audienceType: z.enum(['business', 'candidate', 'issue', 'official', 'nonprofit']),
    programType: z.enum(['promotional', 'political', 'issue', 'mixed']),
    organizationName: z.string().min(2, 'Enter the campaign, organization, office, or business name.'),
    name: z.string().min(2, 'Please enter your name.'),
    email: z.string().email('Please enter a valid email address.'),
    phone: z.string().optional(),
    targetAudience: z.string().optional(),
    message: z.string().min(10, 'Please describe what you are looking for (at least a few words).'),
    consentToContact: z.boolean().refine((v) => v === true, {
      message: 'Please confirm consent to be contacted.',
    }),
    smsConsent: z.boolean().optional(),
    botField: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.phone?.trim() && data.smsConsent !== true) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'When you add a mobile number, please confirm consent to receive text messages.',
        path: ['smsConsent'],
      })
    }
  })

type MessagingValues = z.infer<typeof messagingSchema>

export function MessagingPage() {
  const form = useForm<MessagingValues>({
    resolver: zodResolver(messagingSchema),
    defaultValues: {
      audienceType: 'business',
      programType: 'promotional',
      organizationName: '',
      name: '',
      email: '',
      phone: '',
      targetAudience: '',
      message: '',
      consentToContact: false,
      smsConsent: false,
      botField: '',
    },
  })

  const phoneValue = useWatch({ control: form.control, name: 'phone' })

  async function onSubmit(values: MessagingValues) {
    if (values.botField) return
    const audienceLabel = audienceOptions.find((o) => o.value === values.audienceType)?.label ?? values.audienceType
    const programLabel = programOptions.find((o) => o.value === values.programType)?.label ?? values.programType
    await sendSiteFormEmail({
      formLabel: 'Patriot Messaging inquiry',
      emailSubjectTitle: `${programLabel} - ${values.organizationName.trim()}`,
      data: {
        audienceType: audienceLabel,
        programType: programLabel,
        organizationName: values.organizationName.trim(),
        name: values.name,
        email: values.email,
        ...(values.phone?.trim() ? { phone: values.phone.trim(), smsConsent: true } : {}),
        ...(values.targetAudience?.trim() ? { targetAudience: values.targetAudience.trim() } : {}),
        message: values.message,
        consentToContact: true,
        agreePrivacyPolicy: true,
      },
    })
  }

  return (
    <>
      <Seo
        title="Messaging services"
        description="Start a Patriot Messaging inquiry for promotional, political, issue advocacy, voter education, and outreach campaigns."
        canonicalPath="/messaging"
      />
      <PageHeader
        eyebrow="Messaging"
        title="Outreach for business, candidates &amp; issues"
        subtitle="Tell us what you want to send, who you need to reach, and whether your program is promotional, political, issue-focused, or mixed."
        actions={
          <a
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-patriot-border bg-patriot-bg px-4 text-sm font-semibold tracking-wide text-patriot-navy shadow-[0_10px_30px_rgba(27,38,115,0.08)] transition hover:border-patriot-blue/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-patriot-blue/25"
            href={`mailto:${siteConfig.contact.email}?subject=Patriot%20Messaging%20inquiry`}
          >
            Email us directly <MessageSquareText className="h-4 w-4" />
          </a>
        }
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.05fr]">
        <Card className="lg:order-1">
          <CardGlow />
          <div className="relative space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-patriot-red">
              <ShieldCheck className="h-4 w-4" /> Compliance overview
            </div>
            <p className="text-sm leading-relaxed text-patriot-text">
              This intake uses the same EnSpot-style disclosure pattern as the source PAC site for forms that collect
              phone numbers: linked Privacy Policy and Terms, message and data rates, variable frequency, HELP/STOP
              instructions, carrier disclaimer, and clear no-purchase consent language.
            </p>
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-patriot-navy">
                <Building2 className="h-5 w-5 text-patriot-blue" />
                <h2 className="font-display text-lg font-bold tracking-wide">Promotional business outreach</h2>
              </div>
              <p className="text-sm leading-relaxed text-patriot-text">
                Use Patriot Messaging for announcements, customer lists, appointment reminders, events, offers, and
                recurring business updates where subscribers opt in to hear from your organization.
              </p>
            </section>
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-patriot-navy">
                <Vote className="h-5 w-5 text-patriot-blue" />
                <h2 className="font-display text-lg font-bold tracking-wide">Political and issue outreach</h2>
              </div>
              <p className="text-sm leading-relaxed text-patriot-text">
                Candidate campaigns, public officials, committees, PACs, ballot measures, and issue campaigns can request
                voter education, persuasion, fundraising, volunteer recruitment, event turnout, and GOTV outreach support.
              </p>
            </section>
            <section className="space-y-3 rounded-2xl border border-patriot-border bg-patriot-bg-soft p-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-patriot-red">
                <Megaphone className="h-4 w-4" /> Button and form disclosure
              </div>
              <p className="text-xs leading-relaxed text-patriot-muted">
                Message and data rates may apply. Message frequency varies by program. Reply STOP to opt out and HELP
                for help. Consent is not required as a condition of purchase. SMS information is not rented, sold, or shared.
              </p>
            </section>
          </div>
        </Card>

        <Card className="lg:order-2">
          <CardGlow />
          <div className="relative">
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-patriot-red">Start a conversation</div>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-wide text-patriot-navy">
              Tell us about your messaging program
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-patriot-text">
              Submissions are emailed to our team using the same EmailJS configuration and message payload pattern as the
              source PAC contact forms.
            </p>

            <form
              className="mt-6 grid gap-4 md:grid-cols-2"
              onSubmit={form.handleSubmit(async (values) => {
                await toast.promise(onSubmit(values), {
                  loading: 'Sending...',
                  success: 'Thanks - we received your inquiry and will follow up by email.',
                  error: 'Send failed. Please try again or email us directly.',
                })
                form.reset({
                  audienceType: 'business',
                  programType: 'promotional',
                  organizationName: '',
                  name: '',
                  email: '',
                  phone: '',
                  targetAudience: '',
                  message: '',
                  consentToContact: false,
                  smsConsent: false,
                  botField: '',
                })
              })}
              name="messaging-inquiry"
            >
              <div className="hidden">
                <label>
                  Do not fill this out if you are human: <input {...form.register('botField')} />
                </label>
              </div>

              <Field label="I am reaching out as" error={form.formState.errors.audienceType?.message}>
                <Select {...form.register('audienceType')} aria-invalid={!!form.formState.errors.audienceType}>
                  {audienceOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field label="Program type" error={form.formState.errors.programType?.message}>
                <Select {...form.register('programType')} aria-invalid={!!form.formState.errors.programType}>
                  {programOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
              </Field>

              <div className="md:col-span-2">
                <Field label="Campaign, organization, office, or business name" error={form.formState.errors.organizationName?.message}>
                  <Input {...form.register('organizationName')} aria-invalid={!!form.formState.errors.organizationName} autoComplete="organization" />
                </Field>
              </div>

              <Field label="Your name" error={form.formState.errors.name?.message}>
                <Input {...form.register('name')} aria-invalid={!!form.formState.errors.name} autoComplete="name" />
              </Field>
              <Field label="Email" error={form.formState.errors.email?.message}>
                <Input {...form.register('email')} aria-invalid={!!form.formState.errors.email} autoComplete="email" />
              </Field>

              <div className="md:col-span-2">
                <Field label="Mobile phone (optional)" hint="Required EnSpot-style consent checkbox below if provided.">
                  <Input {...form.register('phone')} autoComplete="tel" />
                </Field>
              </div>

              <div className="md:col-span-2">
                <Field label="Target audience (optional)" hint="Example: customers, donors, primary voters, event attendees, supporters.">
                  <Input {...form.register('targetAudience')} />
                </Field>
              </div>

              <div className="md:col-span-2">
                <Field label="What do you need?" error={form.formState.errors.message?.message}>
                  <Textarea {...form.register('message')} aria-invalid={!!form.formState.errors.message} />
                </Field>
              </div>

              <div className="md:col-span-2">
                <label className="flex items-start gap-3 rounded-xl border border-patriot-border bg-patriot-bg-soft px-4 py-3 text-sm text-patriot-text">
                  <input type="checkbox" {...form.register('consentToContact')} className="mt-1 h-4 w-4 accent-patriot-blue" />
                  <span>
                    <ContactConsentLabel purpose="my messaging and outreach inquiry" />
                    {form.formState.errors.consentToContact?.message ? (
                      <span className="text-xs font-semibold text-patriot-red"> {form.formState.errors.consentToContact.message}</span>
                    ) : null}
                  </span>
                </label>
              </div>

              {phoneValue?.trim() ? (
                <div className="md:col-span-2">
                  <label className="flex items-start gap-3 rounded-xl border border-patriot-border bg-patriot-bg-soft px-4 py-3 text-sm text-patriot-text">
                    <input type="checkbox" {...form.register('smsConsent')} className="mt-1 h-4 w-4 accent-patriot-blue" />
                    <span>
                      <EnSpotSmsOptInLabel organizationName={siteConfig.legalName} purposePhrase="promotional, political, issue advocacy, and outreach" />
                      {form.formState.errors.smsConsent?.message ? (
                        <span className="mt-1 block text-xs font-semibold text-patriot-red">{form.formState.errors.smsConsent.message}</span>
                      ) : null}
                    </span>
                  </label>
                </div>
              ) : null}

              <div className="md:col-span-2 flex justify-end">
                <Button type="submit" variant="primary">
                  Submit inquiry
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </>
  )
}
