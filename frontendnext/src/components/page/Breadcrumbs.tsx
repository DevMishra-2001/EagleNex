import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import { ROUTES } from "@/constants/site";
import { breadcrumbSchema, type Crumb } from "@/utils/seo";

/** Visible trail + BreadcrumbList structured data; last crumb is the current page */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        {[{ name: "Home", path: ROUTES.home }, ...items].map((c, i, all) => {
          const last = i === all.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-zinc-600" aria-hidden />}
              {last ? (
                <span aria-current="page" className="text-zinc-300">
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="transition hover:text-white">
                  {c.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd data={breadcrumbSchema(items)} />
    </nav>
  );
}
