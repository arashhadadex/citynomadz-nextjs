"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { destinations } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const lines: { text: string; className?: string }[] = [
  { text: "The slow road" },
  { text: "between cities", className: "italic text-terra" },
];

const ease = [0.16, 1, 0.3, 1] as const;

/** Splits a word into masked lines that slide up one by one. */
function SplitLine({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={`block overflow-hidden ${className}`}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-transform"
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          transition={{ delay: 0.25 + i * 0.09, duration: 0.9, ease }}
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const [which, setWhich] = useState(0);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // rotate through the destinations we know
  useEffect(() => {
    const id = setInterval(
      () => setWhich((w) => (w + 1) % destinations.length),
      3200
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={section}
      className="relative flex min-h-[100svh] flex-col overflow-hidden px-5 pt-32 md:px-10 md:pt-40"
    >
      {/* drifting aura */}
      <div
        aria-hidden
        className="noise pointer-events-none absolute -right-40 top-24 h-[34rem] w-[34rem] animate-drift rounded-full border border-terra/30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-48 h-[24rem] w-[24rem] rounded-full border border-olive/25"
      />

      <motion.div style={{ y: yText, opacity }} className="relative flex-1">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease }}
          className="flex items-center gap-4"
        >
          <span className="eyebrow text-terra">EST. {new Date().getFullYear()}</span>
          <span className="h-px w-10 bg-line" />
          <span className="eyebrow text-muted">
            FIELD NOTES · SLOW TRAVEL · QUOTED COSTS
          </span>
        </motion.div>

        {/* big statement */}
        <h1 className="display mt-8 max-w-[16ch] text-[clamp(3rem,9vw,8.5rem)]">
          <SplitLine text={lines[0].text} />
          <SplitLine text={lines[1].text} className={lines[1].className} />
        </h1>

        <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-pretty text-lg leading-relaxed text-muted">
            City Nomadz is an independent field journal on the nomadic life.
            We go slow, stay long, and write only about places we have
            actually lived.
          </p>

          {/* rotating destination */}
          <div className="relative h-16 w-full max-w-xs overflow-hidden border-y border-line md:w-72">
            <AnimatePresence mode="wait">
              <motion.div
                key={which}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.6, ease }}
                className="flex h-full items-center justify-between py-3"
              >
                <span className="eyebrow text-muted">
                  {destinations[which].index}
                </span>
                <span className="display text-3xl text-ink">
                  {destinations[which].name}
                </span>
                <span className="eyebrow text-muted">
                  {destinations[which].capital}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="flex items-center gap-3 py-8"
      >
        <span className="block h-10 w-px bg-terra" />
        <span className="eyebrow text-muted">Scroll to set out</span>
      </motion.div>
    </section>
  );
}