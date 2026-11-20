import About from "@/components/sections/About";
import CTA from "@/components/sections/CTA";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Process from "@/components/sections/Process";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import { buildMetadata } from "@/utils/seo";

export const metadata = buildMetadata({ path: "/", absoluteTitle: true });

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <About />
      <Process />
      <Testimonials />
      <CTA />
    </>
  );
}
