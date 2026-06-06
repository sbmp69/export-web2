import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

const HERO_IMG =
  "https://images.pexels.com/photos/13722886/pexels-photo-13722886.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1100&w=1700";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Hero() {
  const { t, isRTL } = useI18n();
  const h = t.hero;

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden vignette grain"
      data-testid="hero-section"
    >
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Luxury architectural interior"
          className="w-full h-full object-cover ken-burns"
          loading="eager"
        />
        <div
          className={`absolute inset-0 ${
            isRTL
              ? "bg-gradient-to-l from-black/90 via-black/55 to-black/20"
              : "bg-gradient-to-r from-black/90 via-black/55 to-black/20"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      </div>

      <div className="absolute top-20 left-0 right-0 h-px bg-white/5" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-40 pb-24 lg:pt-48 lg:pb-32 min-h-screen flex flex-col">
        {!isRTL && (
          <div className="hidden lg:flex absolute left-12 top-1/2 -translate-y-1/2 -rotate-90 origin-left items-center gap-4 text-white text-[10px] tracking-[0.4em] uppercase">
            <div className="w-10 h-px bg-white/30" />
            <span>{h.side}</span>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="overline mb-6 flex items-center gap-3"
        >
          <span className="w-8 h-px bg-[#9CB4A9]" />
          <span>{h.overline}</span>
        </motion.div>

        <div className="max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[0.95] tracking-tight text-white font-light"
          >
            {h.title_a}
            <br />
            <span className="italic font-normal">{h.title_b}</span>
            <span className="brass-text">{h.title_c}</span>
            <span className="text-[#9CB4A9]">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="mt-8 max-w-xl text-white text-base sm:text-lg leading-relaxed font-light"
          >
            {h.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              data-testid="hero-explore-button"
              onClick={() => scrollTo("products")}
              className="group inline-flex items-center gap-3 bg-[#9CB4A9] hover:bg-[#8CA499] text-black px-7 py-4 text-sm font-medium tracking-wide transition-colors"
            >
              {h.explore}
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-[-90deg]"
              />
            </button>
            <button
              data-testid="hero-contact-button"
              onClick={() => scrollTo("contact")}
              className="group inline-flex items-center gap-3 border border-white/25 hover:border-white/60 text-white px-7 py-4 text-sm font-medium tracking-wide transition-colors"
            >
              <Phone size={16} className="text-[#9CB4A9]" />
              {h.contact}
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-auto pt-16 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12 border-t border-white/10"
          data-testid="hero-stats"
        >
          {h.stats.map((s, i) => (
            <div key={i} className="pt-6">
              <div className="font-display text-3xl md:text-4xl text-white tabular">
                {s.v}
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.25em] text-white">
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-6 right-6 lg:right-12 z-10 hidden md:flex items-center gap-3 text-white text-[10px] tracking-[0.3em] uppercase rtl:right-auto rtl:left-6 lg:rtl:left-12">
        <span>{h.scroll}</span>
        <div className="w-8 h-px bg-white/30 relative overflow-hidden">
          <span className="absolute inset-0 bg-[#9CB4A9] animate-[marquee_2s_linear_infinite]" />
        </div>
      </div>
    </section>
  );
}
