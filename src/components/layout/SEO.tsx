import { Helmet } from 'react-helmet-async';

// PLACEHOLDER — update once the real production domain is confirmed.
// This is the single source of truth for canonical/OG URLs across the site.
export const SITE_URL = 'https://drvijaykhatri.com';
const SITE_NAME = 'Dr. Vijay Khatri — Rhinoplasty Surgeon, Karachi';
const DEFAULT_OG_IMAGE = `${SITE_URL}/doctor/portrait.webp`;

interface SEOProps {
  title: string;
  description: string;
  path: string; // e.g. '/about' or '/blog/some-slug'
  image?: string; // absolute path from site root, e.g. '/blog/cover.svg'
  type?: 'website' | 'article';
  jsonLd?: object | object[];
  noindex?: boolean;
}

export default function SEO({ title, description, path, image, type = 'website', jsonLd, noindex }: SEOProps) {
  const url = `${SITE_URL}${path}`;
  const ogImage = image ? `${SITE_URL}${image}` : DEFAULT_OG_IMAGE;
  const fullTitle = title.includes('Dr.') ? title : `${title} | ${SITE_NAME}`;
  const jsonLdList = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLdList.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
}
