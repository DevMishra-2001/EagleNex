import { serializeJsonLd } from "@/utils/seo";

/** Structured data for search engines, one <script> per schema object */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <>
      {[data].flat().map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(d) }} />
      ))}
    </>
  );
}
