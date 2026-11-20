import FeatureGrid from "@/components/page/FeatureGrid";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import SectionIntro from "@/components/page/SectionIntro";
import CtaBanner from "@/components/page/CtaBanner";
import Reveal from "@/components/ui/Reveal";
import { ABOUT_STATS, PROCESS_STEPS } from "@/constants/content";
import { ENGAGEMENT_MODELS, INDUSTRIES, MISSION, VALUES, VISION } from "@/constants/pages";
import { ROUTES, SITE } from "@/constants/site";
import { pad2 } from "@/utils/format";
import { buildMetadata } from "@/utils/seo";

export const metadata = buildMetadata({
  title: "About Us",
  description: `${SITE.name} is a software development company and digital studio building websites, mobile apps and AI solutions for ambitious brands.`,
  path: ROUTES.about,
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`About ${SITE.name}`}
        title={
          <>
            We build products that help brands <span className="accent pr-2">soar.</span>
          </>
        }
        description={SITE.longDescription}
        crumbs={[{ name: "About", path: ROUTES.about }]}
      />

      <Section className="pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { label: "Our mission", text: MISSION },
            { label: "Our vision", text: VISION },
          ].map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08} y={24}>
              <div className="glass h-full rounded-3xl p-8 sm:p-10">
                <span className="eyebrow">{m.label}</span>
                <p className="mt-5 font-display text-2xl leading-snug font-medium tracking-tight text-white sm:text-3xl">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-y-8 border-y border-white/10 py-10 sm:grid-cols-4">
          {ABOUT_STATS.map((s) => (
            <div key={s.label} className="px-2 text-center">
              <p className="font-display text-4xl font-semibold tracking-tight text-white">{s.value}</p>
              <p className="mt-1 text-sm text-zinc-500">{s.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionIntro eyebrow="What we believe" title="The values behind every project" />
        <FeatureGrid items={VALUES} className="mt-12" />
      </Section>

      <Section>
        <SectionIntro eyebrow="How we work" title="A simple, proven process" text="Every engagement follows the same four steps, so you always know what comes next." />
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06} y={24}>
              <li className="h-full rounded-3xl border border-white/10 p-7">
                <span className="font-mono text-xs text-zinc-500">STEP {pad2(i + 1)}</span>
                <s.icon className="mt-4 h-6 w-6 text-brand-cyan" />
                <h3 className="mt-4 font-display text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-zinc-400">{s.desc}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionIntro eyebrow="Ways to work with us" title="Pick the model that fits" />
        <FeatureGrid items={ENGAGEMENT_MODELS} className="mt-12" />
      </Section>

      <Section>
        <SectionIntro eyebrow="Industries" title="Experience across sectors" />
        <Reveal className="mt-10 flex flex-wrap gap-3" y={16}>
          {INDUSTRIES.map((i) => (
            <span key={i} className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-zinc-300">
              {i}
            </span>
          ))}
        </Reveal>
      </Section>

      <CtaBanner />
    </>
  );
}
