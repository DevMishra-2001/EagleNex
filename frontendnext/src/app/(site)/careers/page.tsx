import { ArrowUpRight, Briefcase, MapPin } from "lucide-react";
import CtaBanner from "@/components/page/CtaBanner";
import FeatureGrid from "@/components/page/FeatureGrid";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import SectionIntro from "@/components/page/SectionIntro";
import Reveal from "@/components/ui/Reveal";
import { CAREER_PERKS, HIRING_STEPS, JOB_OPENINGS } from "@/constants/pages";
import { ROUTES, SITE } from "@/constants/site";
import { pad2 } from "@/utils/format";
import { toMailtoWithSubject } from "@/utils/links";
import { buildMetadata } from "@/utils/seo";

export const metadata = buildMetadata({
  title: "Careers",
  description: `Join ${SITE.name} — remote-friendly roles in engineering, design and growth, working on products for clients around the world.`,
  path: ROUTES.careers,
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={
          <>
            Do the best work of your <span className="accent pr-2">career.</span>
          </>
        }
        description="We're a small, senior team that ships products for ambitious clients. If you love craft, ownership and learning fast, you'll fit right in."
        crumbs={[{ name: "Careers", path: ROUTES.careers }]}
      />

      <Section className="pt-0">
        <SectionIntro eyebrow="Why join us" title="Perks & culture" />
        <FeatureGrid items={CAREER_PERKS} className="mt-12" />
      </Section>

      <Section id="openings">
        <SectionIntro eyebrow="Open roles" title="Current openings" />
        <div className="mt-10 space-y-4">
          {JOB_OPENINGS.map((job, i) => (
            <Reveal key={job.title} delay={i * 0.05} y={16}>
              <a
                href={toMailtoWithSubject(SITE.careersEmail, `Application: ${job.title}`)}
                className="group glass flex flex-col gap-4 rounded-3xl p-6 transition hover:border-white/20 sm:flex-row sm:items-center sm:justify-between sm:p-8"
              >
                <div>
                  <h3 className="font-display text-xl font-semibold text-white">{job.title}</h3>
                  <p className="mt-2 max-w-xl text-zinc-400">{job.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4" /> {job.team} · {job.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" /> {job.location}
                    </span>
                  </div>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 font-semibold text-brand-cyan">
                  Apply <ArrowUpRight className="h-5 w-5 transition group-hover:rotate-45" />
                </span>
              </a>
            </Reveal>
          ))}
          <div className="rounded-3xl border border-dashed border-white/15 p-6 sm:p-8">
            <h3 className="font-display text-xl font-semibold text-white">Don&apos;t see your role?</h3>
            <p className="mt-2 text-zinc-400">
              We&apos;re always happy to meet great people. Send your CV or portfolio to{" "}
              <a href={toMailtoWithSubject(SITE.careersEmail, "Open application")} className="text-brand-cyan hover:underline">
                {SITE.careersEmail}
              </a>
              .
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionIntro eyebrow="Hiring process" title="What to expect" />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {HIRING_STEPS.map((step, i) => (
            <li key={step} className="rounded-2xl border border-white/10 p-5">
              <span className="font-mono text-xs text-zinc-500">{pad2(i + 1)}</span>
              <p className="mt-2 font-medium text-white">{step}</p>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBanner title="Want to work with us instead?" text="If you're a client rather than a candidate, we'd love to hear about your project." />
    </>
  );
}
