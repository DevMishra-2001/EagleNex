import Link from "next/link";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import { ROUTES } from "@/constants/site";
import type { LegalDocument } from "@/types";

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: ROUTES.privacy },
  { label: "Terms & Conditions", href: ROUTES.terms },
  { label: "Cookie Policy", href: ROUTES.cookies },
];

/** Renders a legal document with a sticky table of contents */
export default function LegalArticle({ doc, path }: { doc: LegalDocument; path: string }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={doc.title} description={`Last updated: ${doc.updated}`} crumbs={[{ name: doc.title, path }]} />
      <Section className="pt-0">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[260px_1fr] [&>*]:min-w-0">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-semibold text-white">On this page</p>
            <ol className="mt-4 space-y-2 text-sm">
              {doc.sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-zinc-400 transition hover:text-white">
                    {i + 1}. {s.heading}
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm font-semibold text-white">Related</p>
            <ul className="mt-3 space-y-2 text-sm">
              {LEGAL_LINKS.filter((l) => l.href !== path).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-brand-cyan hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          <article className="max-w-3xl">
            <p className="text-lg leading-relaxed text-zinc-300">{doc.intro}</p>
            {doc.sections.map((s, i) => (
              <section key={s.id} id={s.id} className="mt-12 scroll-mt-28">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-white">
                  {i + 1}. {s.heading}
                </h2>
                {s.body.map((block, k) =>
                  Array.isArray(block) ? (
                    <ul key={k} className="mt-4 list-disc space-y-2 pl-6 text-zinc-400 marker:text-brand-cyan">
                      {block.map((item) => (
                        <li key={item} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p key={k} className="mt-4 leading-relaxed text-zinc-400">
                      {block}
                    </p>
                  ),
                )}
              </section>
            ))}
          </article>
        </div>
      </Section>
    </>
  );
}
