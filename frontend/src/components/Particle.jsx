import { Suspense, lazy, useRef } from "react";
import { useInView } from "framer-motion";

const ParticleShape = lazy(() => import("./three/ParticleShape"));

/**
 * Lazy particle object: loads only near the viewport, pauses when off-screen.
 * Usage: <Particle shapes={["⚡"]} className="h-56 w-56" />
 */
export default function Particle({ className = "", ...props }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, margin: "300px" });
  const visible = useInView(ref, { margin: "50px" });

  // stable array identity so the shape isn't re-sampled every render
  const shapesKey = props.shapes.join("|");
  const shapes = useStableShapes(shapesKey);

  return (
    <div ref={ref} className={className}>
      {seen && (
        <Suspense fallback={null}>
          <ParticleShape {...props} shapes={shapes} active={visible} />
        </Suspense>
      )}
    </div>
  );
}

const shapeStore = new Map();
function useStableShapes(key) {
  if (!shapeStore.has(key)) shapeStore.set(key, key.split("|"));
  return shapeStore.get(key);
}
