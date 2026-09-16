// These photo windows preserve the photography in the supplied visual reference.
// The surrounding layout and all page text are responsive HTML.
const photos = {
  website: {
    viewBox: '47 1168 209 108',
    label: 'A campaign website on a laptop and phone',
  },
  camera: {
    viewBox: '273 1168 211 108',
    label: 'Professional video camera in a production studio',
  },
  interview: {
    viewBox: '503 1171 204 106',
    label: 'Two chairs and microphones in an interview studio',
  },
  print: { viewBox: '47 1376 69 76', label: 'Printed campaign mailers' },
  writing: { viewBox: '273 1376 62 76', label: 'A pen and a written message' },
  amarillo: {
    viewBox: '47 1629 317 117',
    label: 'A historic red-brick building in Amarillo, Texas',
  },
  capitol: { viewBox: '600 128 155 182', label: 'Texas State Capitol' },
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
