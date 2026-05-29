import type { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { Field } from '../ui/Field'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Textarea } from '../ui/Textarea'
import { budgetOptions, readinessItems } from '../../lib/readinessIntake'

export function ReadinessChecklistFields<TValues extends FieldValues>({
  register,
  title = 'Messaging readiness checklist',
  description = 'Check what you already have and write in what is missing. This helps us quickly see what is ready and where you need help.',
}: {
  register: UseFormRegister<TValues>
  title?: string
  description?: string
}) {
  return (
    <section className="space-y-4 rounded-2xl border border-patriot-border bg-patriot-bg-soft p-4 md:col-span-2">
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.22em] text-patriot-red">{title}</div>
        <p className="mt-2 text-sm leading-relaxed text-patriot-text">{description}</p>
      </div>

      <div className="grid gap-3">
        {readinessItems.map((item) => (
          <label key={item.value} className="flex items-start gap-3 rounded-xl border border-patriot-border bg-patriot-bg px-3 py-3 text-sm text-patriot-text">
            <input
              type="checkbox"
              value={item.value}
              {...register('readinessItems' as Path<TValues>)}
              className="mt-1 h-4 w-4 accent-patriot-blue"
            />
            <span>{item.label}</span>
          </label>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Website URL" hint="For policy review">
          <Input {...register('websiteUrl' as Path<TValues>)} inputMode="url" placeholder="https://..." />
        </Field>
        <Field label="Messaging or public phone number">
          <Input {...register('messagingNumber' as Path<TValues>)} autoComplete="tel" />
        </Field>
        <Field label="Budget range">
          <Select {...register('budgetRange' as Path<TValues>)}>
            {budgetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Campaign manager or project lead">
          <Input {...register('campaignManagerContact' as Path<TValues>)} placeholder="Name, email, phone" />
        </Field>
        <Field label="Candidate, owner, or principal contact">
          <Input {...register('candidateContact' as Path<TValues>)} placeholder="Name, email, phone" />
        </Field>
        <Field label="Decision maker contact">
          <Input {...register('decisionMakerContact' as Path<TValues>)} placeholder="If different from above" />
        </Field>
      </div>

      <Field label="What do you still need help getting ready?">
        <Textarea
          {...register('readinessNotes' as Path<TValues>)}
          placeholder="Example: need privacy policy language, Campaign Verify guidance, budget planning, list review, or number setup."
        />
      </Field>
    </section>
  )
}
