import type { SiteFormFieldValue } from './emailJsForms'

export type ReadinessFormValues = {
  readinessItems: string[]
  websiteUrl: string
  messagingNumber: string
  budgetRange: string
  campaignManagerContact: string
  candidateContact: string
  decisionMakerContact: string
  readinessNotes: string
}

export const readinessDefaultValues: ReadinessFormValues = {
  readinessItems: [],
  websiteUrl: '',
  messagingNumber: '',
  budgetRange: '',
  campaignManagerContact: '',
  candidateContact: '',
  decisionMakerContact: '',
  readinessNotes: '',
}

export const readinessItems = [
  {
    value: 'terms_privacy_live',
    label: 'Terms and Privacy Policy are live on our website',
  },
  {
    value: 'campaign_verify_or_business_verification',
    label: 'Campaign Verify, business verification, or brand registration is complete or started',
  },
  {
    value: 'messaging_number_and_public_contact',
    label: 'Messaging number, public phone number, and contact details are ready',
  },
  {
    value: 'budget_defined',
    label: 'Budget range and timeline are defined',
  },
  {
    value: 'campaign_manager_or_project_lead',
    label: 'Campaign manager, project lead, or marketing contact is identified',
  },
  {
    value: 'candidate_principal_or_owner_contact',
    label: 'Candidate, principal, owner, or final decision maker contact is available',
  },
  {
    value: 'audience_or_opt_in_source',
    label: 'Audience list, subscriber opt-in source, or voter universe is identified',
  },
] as const

export const budgetOptions = [
  { value: '', label: 'Select a budget range' },
  { value: 'not_sure', label: 'Not sure yet' },
  { value: 'under_1000', label: 'Under $1,000' },
  { value: '1000_5000', label: '$1,000 - $5,000' },
  { value: '5000_15000', label: '$5,000 - $15,000' },
  { value: '15000_plus', label: '$15,000+' },
] as const

function formatValue(value: string, options: readonly { value: string; label: string }[]) {
  return options.find((option) => option.value === value)?.label ?? value
}

export function formatReadinessItems(values: string[] | undefined) {
  if (!values?.length) return []
  return values.map((value) => formatValue(value, readinessItems))
}

export function buildReadinessEmailData(
  values: Partial<ReadinessFormValues>,
): Record<string, SiteFormFieldValue> {
  return {
    readinessChecklist: formatReadinessItems(values.readinessItems),
    websiteUrl: values.websiteUrl,
    messagingNumber: values.messagingNumber,
    budgetRange: values.budgetRange ? formatValue(values.budgetRange, budgetOptions) : undefined,
    campaignManagerContact: values.campaignManagerContact,
    candidateContact: values.candidateContact,
    decisionMakerContact: values.decisionMakerContact,
    readinessNotes: values.readinessNotes,
  }
}
