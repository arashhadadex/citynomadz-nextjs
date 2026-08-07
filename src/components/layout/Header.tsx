"use client";

import { useEffect, useState, type MouseEventHandler } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { nav } from "@/lib/site";
import { Wordmark } from "@/components/ui/Wordmark";

export function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 120);
    setScrolled(latest > 24);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Tapping the wordmark on the home page should pull you back to the top.
  // A same-route Link is a no-op in Next, so we catch the click and scroll.
  const handleWordmark: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } })
        .__lenis;
      if (lenis) lenis.scrollTo(0, { duration: 1.2 });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (open) setOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: hidden && !open ? -110 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
          scrolled && !open
            ? "border-b border-line bg-paper/85 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 md:px-10">
          <Wordmark onClick={handleWordmark} />

          <nav className="hidden items-center gap-10 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="eyebrow link-underline text-muted transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 grid h-11 w-11 place-items-center rounded-full border border-ink/20 md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 h-px w-full bg-ink transition-transform duration-300 ${
                  open ? "top-1/2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 bottom-0 h-px w-full bg-ink transition-transform duration-300 ${
                  open ? "bottom-auto top-1/2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-cream md:hidden"
          >
            <div className="mt-24 flex flex-1 flex-col justify-between px-7 pb-10">
              <nav className="flex flex-col gap-2">
                {[{ label: "Home", href: "/" }, ...nav].map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.12 + i * 0.07, duration: 0.5 }}
                    className="display border-b border-line py-4 text-4xl text-ink"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>
              <p className="eyebrow text-muted">City Nomadz · {new Date().getFullYear()}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}