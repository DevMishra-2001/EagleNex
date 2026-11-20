import type { Metadata } from "next";
import { ROUTES, SITE } from "@/constants/site";
import type { FaqItem } from "@/types";

// "/about" -> "https://eaglenex.com/about"
export const absoluteUrl = (path = "/") => new URL(path, `${SITE.url}/`).toString();

// Root opengraph-image.tsx; child segments that set openGraph must repeat it (metadata merges shallowly)
const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: SITE.title };

type MetaInput = { title?: string; description?: string; path: string; absoluteTitle?: boolean; noIndex?: boolean };

/** Page metadata with canonical URL + matching Open Graph / Twitter tags */
export function buildMetadata({ title, description = SITE.description, path, absoluteTitle, noIndex }: MetaInput): Metadata {
  const fullTitle = title ? `${title} | ${SITE.name}` : SITE.title;
  return {
    title: absoluteTitle || !title ? { absolute: fullTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: path, siteName: SITE.name, type: "website", locale: "en_IN", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [OG_IMAGE.url] },
    ...(noIndex && { robots: { index: false, follow: true } }),
  };
}

// Serialises JSON-LD safely for an inline <script> (blocks "</script>" injection)
export const serializeJsonLd = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  logo: absoluteUrl("/icon.svg"),
  description: SITE.longDescription,
  email: SITE.email,
  telephone: SITE.phone,
  address: { "@type": "PostalAddress", streetAddress: SITE.address, addressCountry: SITE.country },
  contactPoint: { "@type": "ContactPoint", contactType: "sales", email: SITE.email, telephone: SITE.phone, areaServed: "Worldwide" },
});

export const websiteSchema = () => ({ "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: SITE.url });

export type Crumb = { name: string; path: string };

export const breadcrumbSchema = (crumbs: Crumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: ROUTES.home }, ...crumbs].map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: absoluteUrl(c.path),
  })),
});

export const faqSchema = (faqs: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const serviceSchema = (s: { title: string; overview: string; slug: string }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: s.title,
  description: s.overview,
  serviceType: s.title,
  url: absoluteUrl(`${ROUTES.services}/${s.slug}`),
  provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
  areaServed: "Worldwide",
});
