"use client";

import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function PageMotion({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        aria-hidden="true"
        className="fixed left-0 top-0 z-[80] h-[3px] w-full origin-left bg-[#ffd018]"
        style={{ scaleX }}
      />
      <m.div
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        className="min-h-full flex flex-col"
        initial={{ opacity: 0.96, y: 10, filter: "blur(3px)" }}
        key={pathname}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
