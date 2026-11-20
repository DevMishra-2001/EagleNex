import { Clock } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import FaqList from "@/components/page/FaqList";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import SectionIntro from "@/components/page/SectionIntro";
import JsonLd from "@/components/seo/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { CONTACT_OPTIONS, CONTACTS } from "@/constants/content";
import { GENERAL_FAQS } from "@/constants/pages";
import { ROUTES, SITE } from "@/constants/site";
import { absoluteUrl, buildMetadata } from "@/utils/seo";

export const metadata = buildMetadata({
  title: "Contact Us",
  description: `Tell ${SITE.name} about your website, app or AI project. Free consultation — we reply within 24 hours with a plan and a quote.`,
  path: ROUTES.contact,
});

const CONTACT_FAQS = GENERAL_FAQS.filter((f) => /cost|long|NDA|outside/i.test(f.q));

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s build something <span className="accent pr-2">great.</span>
          </>
        }
        description="Share a few details about your project and we'll get back within 24 hours with next steps, a rough timeline and a quote."
        crumbs={[{ name: "Contact", path: ROUTES.contact }]}
      />

      <Section className="pt-0">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14 [&>*]:min-w-0">
          <Reveal y={24}>
            <div className="glass rounded-[2rem] p-6 sm:p-10">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.1} y={24} className="space-y-4">
            {CONTACTS.map((c) => (
              <a key={c.label} href={c.href} className="group glass flex items-center gap-5 rounded-2xl p-5 transition hover:border-white/20">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-brand-cyan">
                  <c.icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-zinc-500">{c.label}</span>
                  <span className="block truncate text-lg text-zinc-200 transition group-hover:text-white">{c.value}</span>
                </span>
              </a>
            ))}
            <div className="glass flex items-center gap-5 rounded-2xl p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-brand-cyan">
                <Clock className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm text-zinc-500">Working hours</span>
                <span className="block text-lg text-zinc-200">{SITE.hours}</span>
              </span>
            </div>
            <p className="pt-4 text-sm text-zinc-500">Prefer to talk directly?</p>
            {CONTACT_OPTIONS.slice(0, 2).map((o) => (
              <a key={o.title} href={o.href} className="glass flex flex-wrap items-center gap-x-4 gap-y-1 rounded-2xl p-4 transition hover:border-white/20">
                <o.icon className="h-5 w-5 text-brand-cyan" />
                <span className="font-semibold text-white">{o.title}</span>
                <span className="text-sm text-zinc-500">{o.desc}</span>
              </a>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionIntro eyebrow="Before you write" title="Quick answers" center />
        <div className="mx-auto mt-12 max-w-3xl">
          <FaqList items={CONTACT_FAQS} />
        </div>
      </Section>

      <JsonLd data={{ "@context": "https://schema.org", "@type": "ContactPage", name: `Contact ${SITE.name}`, url: absoluteUrl(ROUTES.contact) }} />
    </>
  );
}
