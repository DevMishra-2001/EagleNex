import Link from "next/link";
import { ArrowRight } from "lucide-react";
import IconBadge from "@/components/common/IconBadge";
import SectionHeading from "@/components/common/SectionHeading";
import Perspective from "@/components/ui/Perspective";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import { SERVICES } from "@/constants/services";
import { SECTION_IDS, serviceRoute } from "@/constants/site";

export default function Services() {
  return (
    <section id={SECTION_IDS.services} className="relative py-28">
      <div className="container-x relative">
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              Everything you need to <span className="accent">launch</span> and scale
            </>
          }
          subtitle="Strategy, design, engineering and growth — one team, zero hand-offs."
        />

        <Perspective className="mt-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <TiltCard>
                  <IconBadge icon={s.icon} gradient={s.color} className="h-14 w-14 rounded-2xl" iconClassName="h-7 w-7" />
                  <h3 className="mt-6 font-display text-xl font-semibold text-white">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-zinc-400">{s.desc}</p>
                  <Link
                    href={serviceRoute(s.slug)}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-cyan transition group-hover:gap-3"
                  >
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Perspective>
      </div>
    </section>
  );
}
