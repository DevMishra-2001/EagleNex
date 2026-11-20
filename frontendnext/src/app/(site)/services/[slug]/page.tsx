import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import IconBadge from "@/components/common/IconBadge";
import CheckList from "@/components/page/CheckList";
import CtaBanner from "@/components/page/CtaBanner";
import FaqList from "@/components/page/FaqList";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import SectionIntro from "@/components/page/SectionIntro";
import JsonLd from "@/components/seo/JsonLd";
import Reveal from "@/components/ui/Reveal";
import { PROCESS_STEPS } from "@/constants/content";
import { getService, SERVICES } from "@/constants/services";
import { ROUTES, serviceRoute } from "@/constants/site";
import { buildMetadata, faqSchema, serviceSchema } from "@/utils/seo";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const service = getService((await params).slug);
  if (!service) return {};
  return buildMetadata({ title: service.title, description: `${service.tagline} ${service.desc}`, path: serviceRoute(service.slug) });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={service.title}
        description={service.tagline}
        crumbs={[
          { name: "Services", path: ROUTES.services },
          { name: service.title, path: serviceRoute(service.slug) },
        ]}
      >
        <div className="mt-8 flex flex-wrap gap-2">
          {service.stack.map((t) => (
            <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-sm text-zinc-300">
              {t}
            </span>
          ))}
        </div>
      </PageHero>

      <Section className="pt-0">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr] [&>*]:min-w-0">
          <Reveal y={24}>
            <span className="eyebrow">Overview</span>
            <p className="mt-5 text-xl leading-relaxed text-zinc-300">{service.overview}</p>
            <h2 className="mt-12 font-display text-2xl font-semibold text-white">What&apos;s included</h2>
            <CheckList items={service.deliverables} className="mt-6" />
          </Reveal>
          <Reveal delay={0.1} y={24}>
            <div className="glass rounded-3xl p-8">
              <IconBadge icon={service.icon} gradient={service.color} className="h-14 w-14 rounded-2xl" iconClassName="h-7 w-7" />
              <dl className="mt-8 space-y-6">
                {service.outcomes.map((o) => (
                  <div key={o.label} className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
                    <dt className="text-sm text-zinc-500">{o.label}</dt>
                    <dd className="mt-1 font-display text-3xl font-semibold tracking-tight text-white">{o.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionIntro eyebrow="How we deliver" title="From first call to liftoff" />
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((s, i) => (
            <li key={s.title} className="rounded-3xl border border-white/10 p-6">
              <span className="font-mono text-xs text-zinc-500">0{i + 1}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{s.desc}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionIntro eyebrow="FAQ" title={`${service.title} questions`} center />
        <div className="mx-auto mt-12 max-w-3xl">
          <FaqList items={service.faqs} />
        </div>
      </Section>

      <Section>
        <SectionIntro eyebrow="Explore more" title="Other services" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {others.map((s) => (
            <Link key={s.slug} href={serviceRoute(s.slug)} className="group glass rounded-3xl p-6 transition hover:border-white/20">
              <h3 className="font-display text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{s.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-cyan transition-all group-hover:gap-3">
                Learn more <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBanner title={`Need ${service.title.toLowerCase()}?`} />
      <JsonLd data={[serviceSchema(service), faqSchema(service.faqs)]} />
    </>
  );
}
