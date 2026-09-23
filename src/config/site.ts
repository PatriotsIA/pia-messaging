export const siteConfig = {
  name: 'Patriot Messaging',
  legalName: 'Patriot Messaging, LLC',
  legalRevisionDate: 'September 15, 2026',
  url: 'https://patriotmessaging.com',
  tagline: 'Always Ready. Always Connected.',
  description:
    'Text, email, voicemail, digital ads, mail, print, and video for Republican and conservative campaigns, bond issues, and recalls — in Texas and all 50 states. Texas voter data is included.',
  contact: {
    email: 'dan@patriotmessaging.com',
    /** Display (after "Phone: " in UI where labeled) */
    phone: '866-756-1776',
    /** E.164 for <a href="tel:..."> */
    phoneDial: '+18667561776',
    hours: 'Mon–Fri, 7:30 am–7:30 pm Central.',
    weekendHours: "Weekends, call anyway — someone's usually here.",
    mailingAddress: '1000 S. Jefferson Street, Amarillo, TX 79101',
  },
  links: {
    patriotsInAction: 'https://patriotsinaction.com/',
    privacy: '/privacy',
    terms: '/terms',
  },
  brand: {
    pacLogoSrc: '/brand/patriot-messaging-logo.png',
    faviconSrc: '/favicon.svg',
    footerLogoSrc: '/brand/patriot-messaging-logo.png',
    patriotsInActionLockupSrc: '/brand/PIAFullTextLogoRedWhite.png',
    operationShowUpCoverSrc: '/brand/operation-show-up-cover.png',
    coloringBookCoverSrc: '/brand/ColoringBookFront.webp',
  },
} as const
