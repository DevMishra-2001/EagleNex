import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import IconBadge from "@/components/common/IconBadge";
import CtaBanner from "@/components/page/CtaBanner";
import FaqList from "@/components/page/FaqList";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import SectionIntro from "@/components/page/SectionIntro";
import JsonLd from "@/components/seo/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { GENERAL_FAQS } from "@/constants/pages";
import { SERVICES } from "@/constants/services";
import { ROUTES, serviceRoute } from "@/constants/site";
import { buildMetadata, faqSchema, serviceSchema } from "@/utils/seo";

export const metadata = buildMetadata({
  title: "Services",
  description: "Web development, mobile apps, AI solutions, UI/UX design, cloud & DevOps and digital marketing — one team from idea to growth.",
  path: ROUTES.services,
});

const SERVICE_FAQS = GENERAL_FAQS.slice(0, 4);

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title={
          <>
            Everything you need to <span className="accent pr-2">launch</span> and scale
          </>
        }
        description="Strategy, design, engineering and growth — one team, zero hand-offs. Explore each service to see what's included."
        crumbs={[{ name: "Services", path: ROUTES.services }]}
      />

      <Section className="pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.08} y={24}>
              <Link
                href={serviceRoute(s.slug)}
                className="group glass flex h-full flex-col rounded-3xl p-8 transition hover:-translate-y-1 hover:border-white/20"
              >
                <div className="flex items-start justify-between gap-6">
                  <IconBadge icon={s.icon} gradient={s.color} className="h-14 w-14 rounded-2xl" iconClassName="h-7 w-7" />
                  <ArrowUpRight className="h-6 w-6 text-zinc-600 transition group-hover:rotate-45 group-hover:text-white" />
                </div>
                <h2 className="mt-6 font-display text-2xl font-semibold text-white">{s.title}</h2>
                <p className="mt-3 leading-relaxed text-zinc-400">{s.tagline}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.deliverables.slice(0, 3).map((d) => (
                    <li key={d} className="rounded-full border border-white/10 px-3 py-1 text-sm text-zinc-400">
                      {d}
                    </li>
                  ))}
                </ul>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionIntro eyebrow="FAQ" title="Common questions" center />
        <div className="mx-auto mt-12 max-w-3xl">
          <FaqList items={SERVICE_FAQS} />
        </div>
      </Section>

      <CtaBanner />
      <JsonLd data={[...SERVICES.map(serviceSchema), faqSchema(SERVICE_FAQS)]} />
    </>
  );
}
