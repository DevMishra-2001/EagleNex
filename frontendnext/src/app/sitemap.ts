import type { MetadataRoute } from "next";
import { LEGAL_UPDATED } from "@/constants/legal";
import { SERVICES } from "@/constants/services";
import { ROUTES, serviceRoute } from "@/constants/site";
import { absoluteUrl } from "@/utils/seo";

type Entry = MetadataRoute.Sitemap[number];

// Bump when page content changes; a fixed date keeps the sitemap static
const CONTENT_UPDATED = new Date("2026-11-20");

const page = (path: string, priority: number, changeFrequency: Entry["changeFrequency"], lastModified = CONTENT_UPDATED): Entry => ({
  url: absoluteUrl(path),
  lastModified,
  changeFrequency,
  priority,
});

export default function sitemap(): MetadataRoute.Sitemap {
  const legalUpdated = new Date(LEGAL_UPDATED);
  return [
    page(ROUTES.home, 1, "weekly"),
    page(ROUTES.services, 0.9, "monthly"),
    ...SERVICES.map((s) => page(serviceRoute(s.slug), 0.8, "monthly")),
    page(ROUTES.about, 0.8, "monthly"),
    page(ROUTES.contact, 0.8, "yearly"),
    page(ROUTES.careers, 0.6, "weekly"),
    page(ROUTES.faq, 0.6, "monthly"),
    page(ROUTES.privacy, 0.3, "yearly", legalUpdated),
    page(ROUTES.terms, 0.3, "yearly", legalUpdated),
    page(ROUTES.cookies, 0.3, "yearly", legalUpdated),
  ];
}
