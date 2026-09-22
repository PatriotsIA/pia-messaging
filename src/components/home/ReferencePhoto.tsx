// Use supplied standalone artwork where available, with reference crops for
// the remaining website and Amarillo photographs.
const photos = {
  website: {
    viewBox: '47 1168 209 108',
    label: 'A campaign website on a laptop and phone',
  },
  camera: {
    src: '/images/video-production.webp',
    label: 'Professional video camera in a production studio',
  },
  interview: {
    src: '/images/interview-studio.webp',
    label: 'Two armchairs in an interview studio with a Texas Capitol backdrop',
  },
  print: {
    src: '/images/campaign-print.webp',
    label: 'Campaign mailers, brochures, a door hanger, and signage',
  },
  writing: {
    src: '/images/writing-messaging.webp',
    label: 'An open notebook, pen, and phone displaying text messages',
  },
  amarillo: {
    viewBox: '47 1629 317 117',
    label: 'A historic red-brick building in Amarillo, Texas',
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
  if ('src' in photo) {
    return (
      <img
        className={`reference-photo ${className}`}
        src={photo.src}
        alt={decorative ? '' : photo.label}
        width={1536}
        height={1024}
        loading="lazy"
        decoding="async"
        aria-hidden={decorative || undefined}
      />
    )
  }

  return (
    <svg
      className={`reference-photo ${className}`}
      viewBox={photo.viewBox}
      preserveAspectRatio="xMidYMid slice"
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : photo.label}
      aria-hidden={decorative || undefined}
    >
      <image href="/images/design-reference.png" width="756" height="2079" />
    </svg>
  )
}
