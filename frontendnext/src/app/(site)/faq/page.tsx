import CtaBanner from "@/components/page/CtaBanner";
import FaqList from "@/components/page/FaqList";
import PageHero from "@/components/page/PageHero";
import Section from "@/components/page/Section";
import JsonLd from "@/components/seo/JsonLd";
import { GENERAL_FAQS } from "@/constants/pages";
import { SERVICES } from "@/constants/services";
import { ROUTES, SITE } from "@/constants/site";
import { buildMetadata, faqSchema } from "@/utils/seo";

export const metadata = buildMetadata({
  title: "FAQ",
  description: `Answers to common questions about working with ${SITE.name}: pricing, timelines, ownership, NDAs and support.`,
  path: ROUTES.faq,
});

const GROUPS = [
  { title: "Working with us", items: GENERAL_FAQS },
  ...SERVICES.map((s) => ({ title: s.title, items: s.faqs })),
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title={
          <>
            Questions, <span className="accent pr-2">answered.</span>
          </>
        }
        description="Everything you might want to know before starting a project. Can't find your answer? Just ask."
        crumbs={[{ name: "FAQ", path: ROUTES.faq }]}
      />
      <Section className="pt-0">
        <div className="mx-auto max-w-3xl space-y-14">
          {GROUPS.map((g) => (
            <div key={g.title}>
              <h2 className="mb-5 font-display text-2xl font-semibold text-white">{g.title}</h2>
              <FaqList items={g.items} />
            </div>
          ))}
        </div>
      </Section>
      <CtaBanner title="Still have questions?" text="Talk to us — a free 30-minute call is often the fastest way to get clarity." label="Contact us" />
      <JsonLd data={faqSchema(GROUPS.flatMap((g) => g.items))} />
    </>
  );
}
