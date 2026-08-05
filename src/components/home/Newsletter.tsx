"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { site } from "@/lib/site";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
  };

  return (
    <section className="border-t border-line bg-cream">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-terra">04 · Letters from the road</p>
            <h2 className="display mt-6 text-[clamp(2rem,4.5vw,3.5rem)]">
              Dispatches, sent <span className="italic">rarely</span>, kept
              worth reading.
            </h2>
          </div>

          <div className="flex flex-col justify-center">
            <p className="max-w-md text-pretty text-muted">
              A short letter every few weeks — a field note, an honest cost
              breakdown, a city we learned to love. No noise, no weekly spam.
            </p>

            <div className="mt-8 h-20">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 border-b border-terra pb-3 text-terra"
                  >
                    <Check className="h-5 w-5" />
                    <span className="eyebrow">You are on the road. See you soon.</span>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={submit}
                    className="group flex items-center gap-4 border-b border-line pb-3 focus-within:border-terra"
                  >
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@somewhere-traveling.com"
                      className="flex-1 bg-transparent font-mono text-lg text-ink placeholder:text-faint focus:outline-none"
                      aria-label="Email address"
                    />
                    <button
                      type="submit"
                      aria-label="Subscribe"
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/20 transition-colors hover:border-terra hover:text-terra"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
            <p className="eyebrow mt-4 text-muted">
              {site.email} · unsubscribe whenever, no guilt
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}