// Public origin used for canonical URLs, sitemap and OG tags (set NEXT_PUBLIC_SITE_URL per environment)
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://eaglenex.com").replace(/\/+$/, "");

export const SITE = {
  name: "EagleNex",
  url: SITE_URL,
  title: "EagleNex — Think Higher, Fly Further",
  tagline: "Think Higher, Fly Further",
  description: "EagleNex — we design and build digital products that soar.",
  longDescription:
    "EagleNex is a digital innovation studio that designs and engineers modern websites, mobile apps and AI-powered solutions for ambitious brands.",
  email: "hello@eaglenex.com",
  careersEmail: "hello@eaglenex.com",
  phone: "+91 00000 00000",
  address: "Your office address, City, India",
  country: "IN",
  hours: "Mon – Fri, 10:00 – 19:00 IST",
  legalName: "EagleNex",
  jurisdiction: "India",
} as const;

// Section ids used for in-page anchors and nav highlighting
export const SECTION_IDS = {
  home: "home",
  services: "services",
  about: "about",
  process: "process",
  testimonials: "testimonials",
  contact: "contact",
  footer: "site-footer",
} as const;

// Every page route, the sitemap and footer read from here
export const ROUTES = {
  home: "/",
  about: "/about",
  services: "/services",
  contact: "/contact",
  careers: "/careers",
  faq: "/faq",
  privacy: "/privacy-policy",
  terms: "/terms-and-conditions",
  cookies: "/cookie-policy",
} as const;

export const serviceRoute = (slug: string) => `${ROUTES.services}/${slug}`;
