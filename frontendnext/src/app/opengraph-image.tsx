import { ImageResponse } from "next/og";
import { MARK_LAYERS, MARK_VIEWBOX } from "@/constants/eagle-mark";
import { SITE } from "@/constants/site";

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social share card for every page */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(circle at 15% 20%, #2a1a5e 0%, #0a0a14 55%), #0a0a14",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg viewBox={MARK_VIEWBOX} width={150} height={92}>
            {MARK_LAYERS.map((l, i) => (
              <path key={i} d={l.d} fill={l.beak ? "#FBBF24" : l.light ? "#E9E3FF" : "#8B5CF6"} fillRule="evenodd" />
            ))}
          </svg>
          <span style={{ fontSize: 56, fontWeight: 700, letterSpacing: -1.5 }}>{SITE.name}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 88, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>Digital products that soar.</span>
          <span style={{ marginTop: 28, fontSize: 32, color: "#a1a1aa" }}>Web · Mobile · AI · Design · Cloud · Growth</span>
        </div>
        <div style={{ display: "flex", height: 8, borderRadius: 8, background: "linear-gradient(90deg, #8B5CF6, #22D3EE, #EC4899)" }} />
      </div>
    ),
    size,
  );
}
