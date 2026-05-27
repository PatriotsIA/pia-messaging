export type Tag = {
  slug: string
  label: string
}

export type CTA = {
  label: string
  to?: string
  href?: string
  variant?: 'primary' | 'outline' | 'red'
}

export type EventItem = {
  slug: string
  title: string
  summary: string
  startsAt: string // ISO 8601
  endsAt?: string // ISO 8601
  timezone?: string
  locationName?: string
  locationAddress?: string
  locationCity?: string
  locationRegion?: string // Optional free-text (not routed)
  isVirtual?: boolean
  virtualUrl?: string
  registrationUrl?: string
  tags?: Tag[]
  featured?: boolean
  detailsMarkdown: string
}

export type NewsPost = {
  slug: string
  title: string
  excerpt: string
  publishedAt: string // ISO 8601
  author?: string
  tags?: Tag[]
  sourceUrl?: string
  bodyMarkdown: string
}

export type VolunteerFormSubmission = {
  name: string
  email: string
  phone?: string
  countyOrRegion?: string
  interests: string[]
  message?: string
  consentToContact: boolean
}

export type ContactFormSubmission = {
  name: string
  email: string
  subject?: string
  countyOrRegion?: string
  message: string
}

