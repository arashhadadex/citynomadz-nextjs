"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** initial translateY in px */
  y?: number;
  delay?: number;
  stagger?: number;
  /** scrub ties the animation to scroll position instead of a one-shot */
  scrub?: boolean;
};

/**
 * Reveals children into place as they enter the viewport.
 * Uses GSAP + the shared ScrollTrigger (synced with Lenis smooth-scroll).
 */
export function Reveal({
  children,
  className,
  y = 40,
  delay = 0,
  stagger = 0,
  scrub = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      gsap.set(el, { autoAlpha: 1, y: 0 });
      return;
    }

    const items = el.children.length
      ? Array.from(el.children)
      : [el];

    const ctx = gsap.context(() => {
      gsap.set(items, {
        autoAlpha: 0,
        y,
        willChange: "transform",
      });
      gsap.to(items, {
        autoAlpha: 1,
        y: 0,
        duration: scrub ? 1.2 : 1.1,
        ease: "power3.out",
        stagger: scrub ? 0 : stagger,
        delay,
        scrollTrigger: scrub
          ? {
              trigger: el,
              start: "top 82%",
              end: "top 35%",
              scrub: true,
            }
          : {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
      });
    }, el);

    return () => ctx.revert();
  }, [y, delay, stagger, scrub]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}