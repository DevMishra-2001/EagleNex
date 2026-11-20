import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { ROUTES } from "@/constants/site";
import { buildMetadata } from "@/utils/seo";

export const metadata = buildMetadata({ title: "Page not found", path: "/404", noIndex: true });

const SUGGESTIONS = [
  { label: "Services", href: ROUTES.services },
  { label: "About us", href: ROUTES.about },
  { label: "Contact", href: ROUTES.contact },
];

/** 404 for any unknown URL, with the normal site chrome */
export default function NotFound() {
  return (
    <div className="relative w-full overflow-x-clip">
      <Navbar />
      <main className="relative flex min-h-[80svh] items-center overflow-hidden pt-32 pb-20">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute top-10 -left-40 h-[460px] w-[460px] rounded-full bg-brand-violet/20 blur-[140px]" />
        <div className="container-x relative">
          <p className="font-mono text-sm text-zinc-500">ERROR 404</p>
          <h1 className="mt-4 font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-white">
            This page flew <span className="accent pr-2">away.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-zinc-400">The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on course.</p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href={ROUTES.home} className="group inline-flex items-center gap-3 rounded-full bg-white py-2 pr-2 pl-6 font-semibold text-ink-950 transition hover:bg-zinc-200">
              Back to home
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ink-950 text-white transition-transform group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
            {SUGGESTIONS.map((s) => (
              <Link key={s.href} href={s.href} className="rounded-full px-5 py-3 font-semibold text-white transition hover:bg-white/5">
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
