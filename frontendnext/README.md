# EagleNex — Next.js frontend

Next.js 16 (App Router, Turbopack) port of the Vite landing page in `../frontend`. Same UI and behaviour; Tailwind v4.

```bash
npm run dev     # http://localhost:3000
npm run build && npm start
npm run lint
```

## Pages

`/` · `/about` · `/services` · `/services/[slug]` (6 services) · `/contact` · `/careers` · `/faq` · `/privacy-policy` · `/terms-and-conditions` · `/cookie-policy` · custom 404

SEO: `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, Open Graph image, canonical URLs and JSON-LD (Organization, WebSite, Breadcrumbs, Service, FAQPage).

## Environment

Copy `.env.example` to `.env.local`:

- `NEXT_PUBLIC_SITE_URL` — public origin for canonical URLs, sitemap and OG tags (default `https://eaglenex.com`).
- `CONTACT_WEBHOOK_URL` — optional; contact-form enquiries are POSTed here as JSON (Slack, Zapier, Make, n8n, CRM). Without it, enquiries are only logged on the server.

Legal pages in `src/constants/legal.ts` are templates — get them reviewed by a lawyer and fill in the real company name and address in `src/constants/site.ts`.

## Structure

```
src/
  app/              root layout, (site)/ route group with all pages, robots/sitemap/manifest/OG image, globals.css
  actions/          server actions (contact form)
  components/
    layout/         Navbar, Footer
    sections/       Hero, Marquee, Services, About, Process, Testimonials, CTA
    ui/             Reveal, TiltCard, Perspective, ThemeToggle, Logo
    common/         SectionHeading, IconBadge, CurrentYear, SmartLink
    page/           PageHero, Breadcrumbs, Section, FaqList, FeatureGrid, CtaBanner, ...
    contact/ legal/ seo/
    three/          react-three-fiber scenes (client-only, lazy-loaded)
  constants/        site + routes, copy (content, services, pages, legal), theme, motion
  hooks/            useTheme, useScrolled, useActiveSection, useElementVisible, ...
  stores/           theme-store (data-theme on <html> + localStorage)
  types/            shared TS types
  utils/            seo, validation, links, dom, random, canvas-sampling, three, format, date, cn
```

Edit site text in `src/constants/content.ts`. Theme tokens live in `src/app/globals.css`.
