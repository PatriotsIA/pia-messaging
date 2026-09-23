// Supplied standalone artwork, one entry per slot on the landing page.
const photos = {
  website: {
    src: '/images/campaign-website.webp',
    size: [1536, 1024],
    label: 'A campaign website on a desktop monitor and a phone',
  },
  camera: {
    src: '/images/video-production.webp',
    size: [1536, 1024],
    label: 'Professional video camera in a production studio',
  },
  interview: {
    src: '/images/interview-studio.webp',
    size: [1536, 1024],
    label: 'Two armchairs in an interview studio with a Texas Capitol backdrop',
  },
  print: {
    src: '/images/campaign-print.webp',
    size: [1536, 1024],
    label: 'Campaign mailers, brochures, a door hanger, and signage',
  },
  writing: {
    src: '/images/writing-messaging.webp',
    size: [1536, 1024],
    label: 'An open notebook, pen, and phone displaying text messages',
  },
  amarillo: {
    src: '/images/amarillo-office.webp',
    size: [1200, 610],
    label: 'The Patriot Messaging office building in Amarillo, Texas',
  },
  studio: {
    src: '/images/patriot-recording-studio-photo.webp',
    size: [1600, 1200],
    label:
      'Two chairs and microphones at a round table in the Patriot Recording Studio, with a bison sculpture and American and Texas flags',
  },
} as const

export function ReferencePhoto({
  name,
  className = '',
  decorative = false,
}: {
  name: keyof typeof photos
  className?: string
  decorative?: boolean
}) {
  const photo = photos[name]

  return (
    <img
      className={`reference-photo ${className}`}
      src={photo.src}
      alt={decorative ? '' : photo.label}
      width={photo.size[0]}
      height={photo.size[1]}
      loading="lazy"
      decoding="async"
      aria-hidden={decorative || undefined}
    />
  )
}
