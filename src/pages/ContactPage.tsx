import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { Mail } from 'lucide-react'
import { Seo } from '../lib/seo/Seo'
import { PageHeader } from '../components/ui/PageHeader'
import { Card, CardGlow } from '../components/ui/Card'
import { Field } from '../components/ui/Field'
import { Input } from '../components/ui/Input'
import { Textarea } from '../components/ui/Textarea'
import { Button } from '../components/ui/Button'
import { sendSiteFormEmail } from '../lib/emailJsForms'
import { siteConfig } from '../config/site'
import { ContactConsentLabel } from '../components/compliance/ContactConsentLabel'

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name.'),
  email: z.string().email('Please enter a valid email address.'),
  subject: z.string().optional(),
  organizationName: z.string().optional(),
  message: z.string().min(10, 'Please enter a message.'),
  consentToContact: z.boolean().refine((v) => v === true, {
    message: 'Please confirm consent to be contacted.',
  }),
  botField: z.string().optional(),
})

type ContactValues = z.infer<typeof contactSchema>

export function ContactPage() {
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      organizationName: '',
      message: '',
      consentToContact: false,
      botField: '',
    },
  })

  async function onSubmit(values: ContactValues) {
    if (values.botField) return
    await sendSiteFormEmail({
      formLabel: 'Patriot Messaging contact',
      emailSubjectTitle: values.subject?.trim() || 'General inquiry',
      data: {
        name: values.name,
        email: values.email,
        ...(values.subject?.trim() ? { subject: values.subject.trim() } : {}),
        ...(values.organizationName?.trim() ? { organizationName: values.organizationName.trim() } : {}),
        message: values.message,
        consentToContact: true,
        agreePrivacyPolicy: true,
      },
    })
  }

  return (
    <>
      <Seo
        title="Contact"
        description="Contact Patriot Messaging about promotional, business, political, candidate, issue, and civic outreach services."
        canonicalPath="/contact"
      />
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        subtitle="Have a question about promotional, political, candidate, issue, or civic outreach? Send a note and our team will follow up."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card className="lg:order-2">
          <CardGlow />
          <div className="relative space-y-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-patriot-red">Email</div>
              <div className="mt-2 font-display text-2xl font-bold tracking-wide text-patriot-navy">
                {siteConfig.contact.email}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-patriot-text">
                For faster routing, include whether your inquiry is promotional, political, issue advocacy, or general.
              </p>
              <div className="mt-5">
                <a
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-patriot-blue px-4 text-sm font-semibold tracking-wide text-patriot-white shadow-glow-blue transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-patriot-blue/40 focus-visible:ring-offset-2 focus-visible:ring-offset-patriot-bg"
                  href={`mailto:${siteConfig.contact.email}`}
                >
                  Email us <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-patriot-red">Phone</div>
              <a
                className="mt-2 block font-display text-2xl font-bold tracking-wide text-patriot-navy underline decoration-patriot-blue/25 underline-offset-4 transition hover:decoration-patriot-blue/60"
                href={`tel:${siteConfig.contact.phoneDial}`}
              >
                {siteConfig.contact.phone}
              </a>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-patriot-red">Mailing address</div>
              <p className="mt-2 text-base font-medium leading-relaxed text-patriot-navy">{siteConfig.contact.mailingAddress}</p>
            </div>
          </div>
        </Card>

        <Card className="lg:order-1">
          <CardGlow />
          <div className="relative">
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-patriot-red">Contact form</div>
            <form
              className="mt-5 grid gap-4 md:grid-cols-2"
              onSubmit={form.handleSubmit(async (values) => {
                await toast.promise(onSubmit(values), {
                  loading: 'Sending...',
                  success: 'Message sent - thanks. Our team receives an email with your note.',
                  error: 'Send failed. Please try again or email us directly.',
                })
                form.reset()
              })}
              name="contact"
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
              <Field label="Subject (optional)">
                <Input {...form.register('subject')} autoComplete="off" />
              </Field>
              <Field label="Organization (optional)">
                <Input {...form.register('organizationName')} autoComplete="organization" />
              </Field>
              <div className="md:col-span-2">
                <Field label="Message" error={form.formState.errors.message?.message}>
                  <Textarea {...form.register('message')} aria-invalid={!!form.formState.errors.message} />
                </Field>
              </div>

              <div className="md:col-span-2">
                <label className="flex items-start gap-3 rounded-xl border border-patriot-border bg-patriot-bg-soft px-4 py-3 text-sm text-patriot-text">
                  <input type="checkbox" {...form.register('consentToContact')} className="mt-1 h-4 w-4 accent-patriot-blue" />
                  <span>
                    <ContactConsentLabel purpose="my message or outreach inquiry" />
                    {form.formState.errors.consentToContact?.message ? (
                      <span className="ml-2 text-xs font-semibold text-patriot-red">{form.formState.errors.consentToContact.message}</span>
                    ) : null}
                  </span>
                </label>
              </div>

              <div className="md:col-span-2 flex items-center justify-end">
                <Button type="submit" variant="primary">
                  Send
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </>
  )
}
