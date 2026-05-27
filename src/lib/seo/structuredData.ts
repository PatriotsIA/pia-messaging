import { siteConfig } from '../../config/site'
import type { EventItem, NewsPost } from '../models'

export function absoluteSiteUrl(pathOrUrl = '/') {
  return new URL(pathOrUrl, `${siteConfig.url}/`).toString()
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': absoluteSiteUrl('/#organization'),
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteSiteUrl(siteConfig.brand.pacLogoSrc),
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phoneDial,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1000 S. Jefferson Street',
      addressLocality: 'Amarillo',
      addressRegion: 'TX',
      postalCode: '79101',
      addressCountry: 'US',
    },
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': absoluteSiteUrl('/#website'),
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    publisher: { '@id': absoluteSiteUrl('/#organization') },
    inLanguage: 'en-US',
  }
}

export function newsArticleJsonLd(post: NewsPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: post.author ?? siteConfig.legalName,
    },
    publisher: { '@id': absoluteSiteUrl('/#organization') },
    mainEntityOfPage: absoluteSiteUrl(`/news/${post.slug}`),
    image: [absoluteSiteUrl(siteConfig.brand.pacLogoSrc)],
  }
}

export function eventJsonLd(event: EventItem) {
  const location = event.isVirtual
    ? {
        '@type': 'VirtualLocation',
        url: event.virtualUrl ?? absoluteSiteUrl(`/events/${event.slug}`),
      }
    : {
        '@type': 'Place',
        name: event.locationName ?? 'Location details to be shared',
        address: [event.locationAddress, event.locationCity, event.locationRegion].filter(Boolean).join(', '),
      }

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.summary,
    startDate: event.startsAt,
    ...(event.endsAt ? { endDate: event.endsAt } : {}),
    eventAttendanceMode: event.isVirtual
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location,
    organizer: { '@id': absoluteSiteUrl('/#organization') },
    url: absoluteSiteUrl(`/events/${event.slug}`),
    ...(event.registrationUrl ? { offers: { '@type': 'Offer', url: event.registrationUrl, price: '0', priceCurrency: 'USD' } } : {}),
  }
}
