export const siteConfig = {
  name: 'Patriot Messaging',
  legalName: 'Patriot Messaging',
  url: 'https://patriotmessaging.com',
  tagline: 'Compliant outreach for business and civic campaigns.',
  description:
    'A messaging and outreach service for promotional business campaigns, political candidates, issue advocacy, and civic organizations that need clear intake, consent, and compliant communication workflows.',
  contact: {
    email: 'giving@patriotsforaction.org',
    /** Display (after "Phone: " in UI where labeled) */
    phone: '(866) 756 1776',
    /** E.164 for <a href="tel:..."> */
    phoneDial: '+18667561776',
    mailingAddress: '1000 S. Jefferson Street, Amarillo, TX 79101',
  },
  links: {
    patriotsInAction: 'https://patriotsinaction.com/',
    privacy: '/privacy',
    terms: '/terms',
  },
  brand: {
    pacLogoSrc: '/brand/PIAPatriot.png',
    faviconSrc: '/brand/SocialIcon.png',
    footerLogoSrc: '/brand/PIAFooterLogo.png',
    patriotsInActionLockupSrc: '/brand/PIAFullTextLogoRedWhite.png',
    operationShowUpCoverSrc: '/brand/operation-show-up-cover.png',
    coloringBookCoverSrc: '/brand/ColoringBookFront.webp',
  },
} as const
