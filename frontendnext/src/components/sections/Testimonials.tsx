import { Quote, Star } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import Perspective from "@/components/ui/Perspective";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import { TESTIMONIALS } from "@/constants/content";
import { SECTION_IDS } from "@/constants/site";
import { initial } from "@/utils/format";

const RATING = 5;

export default function Testimonials() {
  return (
    <section id={SECTION_IDS.testimonials} className="relative py-28">
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              Founders <span className="accent">love</span> working with us
            </>
          }
        />

        <Perspective className="mt-16" tilt={22}>
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <TiltCard>
                  <Quote className="h-8 w-8 text-brand-violet" />
                  <div className="mt-4 flex gap-1">
                    {Array.from({ length: RATING }, (_, k) => (
                      <Star key={k} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="mt-4 leading-relaxed text-zinc-300">&ldquo;{t.text}&rdquo;</p>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-linear-to-br/srgb from-brand-violet to-brand-cyan font-display font-bold text-pure">
                      {initial(t.name)}
                    </span>
                    <div>
                      <p className="font-semibold text-white">{t.name}</p>
                      <p className="text-sm text-zinc-500">{t.role}</p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Perspective>
      </div>
    </section>
  );
}
