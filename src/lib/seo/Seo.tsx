import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { getSiteUrl } from '../env'
import { siteConfig } from '../../config/site'

type JsonLd = Record<string, unknown>

type SeoProps = {
  title?: string
  description?: string
  canonicalPath?: string
  ogImageUrl?: string
  ogImageAlt?: string
  type?: 'website' | 'article'
  keywords?: string[]
  publishedTime?: string
  modifiedTime?: string
  jsonLd?: JsonLd | JsonLd[]
  noIndex?: boolean
}

function buildAbsoluteUrl(pathOrUrl: string, siteUrl: string) {
  return new URL(pathOrUrl, `${siteUrl}/`).toString()
}

export function Seo({
  title,
  description = siteConfig.description,
  canonicalPath,
  ogImageUrl = siteConfig.brand.pacLogoSrc,
  ogImageAlt = `${siteConfig.legalName} logo`,
  type = 'website',
  keywords,
  publishedTime,
  modifiedTime,
  jsonLd,
  noIndex = false,
}: SeoProps) {
  const location = useLocation()
  const siteUrl = getSiteUrl() || siteConfig.url

  const fullTitle = title ? `${title} · ${siteConfig.legalName}` : siteConfig.legalName
  const canonical = siteUrl
    ? buildAbsoluteUrl(canonicalPath ?? location.pathname, siteUrl)
    : undefined

  const ogImage = ogImageUrl && siteUrl ? buildAbsoluteUrl(ogImageUrl, siteUrl) : ogImageUrl
  const jsonLdItems = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords?.length ? <meta name="keywords" content={keywords.join(', ')} /> : null}
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      <meta
        name="robots"
        content={noIndex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'}
      />

      <meta property="og:site_name" content={siteConfig.legalName} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      <meta property="og:type" content={type} />
      {ogImage ? <meta property="og:image" content={ogImage} /> : null}
      {ogImage ? <meta property="og:image:alt" content={ogImageAlt} /> : null}
      {publishedTime ? <meta property="article:published_time" content={publishedTime} /> : null}
      {modifiedTime ? <meta property="article:modified_time" content={modifiedTime} /> : null}

      <meta name="twitter:card" content={ogImage ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}
      {ogImage ? <meta name="twitter:image:alt" content={ogImageAlt} /> : null}

      {jsonLdItems.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  )
}

