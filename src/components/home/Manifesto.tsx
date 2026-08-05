"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const text =
  "We are not tourists and we are not expats. We are wanderers with wifi, people who stay somewhere just long enough to stop being strangers — then leave before it becomes routine. Nomads value the fresh eyes almost as much as we value a home. City Nomadz exists to pass those fresh eyes on to you.";

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const t = textRef.current;
    if (!el || !t) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // word-by-word scrub: each word is hidden and "fills in" as you scroll
    const words = t.textContent?.trim().split(/\s+/) ?? [];
    t.textContent = "";

    const spans: HTMLElement[] = words.map((w) => {
      const s = document.createElement("span");
      s.textContent = w + "\u00A0";
      s.style.backgroundImage =
        "linear-gradient(currentColor,currentColor)";
      s.style.backgroundRepeat = "no-repeat";
      s.style.backgroundSize = "0% 100%";
      s.style.willChange = "background-size";
      t.appendChild(s);
      return s;
    });

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 72%",
        end: "bottom 55%",
        scrub: true,
      });
      gsap.set(spans, { backgroundSize: "0% 100%" });
      gsap.to(spans, {
        backgroundSize: "100% 100%",
        duration: 1,
        ease: "none",
        stagger: 0.35,
        scrollTrigger: st,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-night text-mist">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-40">
        <div ref={ref}>
          <p className="eyebrow text-terra">02 · A small creed</p>
          <p
            ref={textRef}
            className="display mt-10 max-w-4xl text-pretty text-[clamp(1.6rem,3.6vw,3rem)] leading-[1.15] text-mist"
          >
            {text}
          </p>
        </div>

        <div className="mt-20 grid gap-10 border-t border-mist/15 pt-12 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="display text-6xl text-terra">{s.value}</p>
              <p className="eyebrow mt-3 text-mist/60">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}