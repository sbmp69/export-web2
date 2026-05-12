import React from "react";
import { motion } from "framer-motion";
import { Compass, Building2, PenTool, Hammer } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

const ICONS = [Building2, PenTool, Compass, Hammer];

import IMG from "@/assets/factory.jpeg";

export default function About() {
  const { t } = useI18n();
  const a = t.about;

  return (
    <section
      id="about"
      className="relative py-24 lg:py-36 bg-[#0A0A0A]"
      data-testid="about-section"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative overflow-hidden border border-white/10">
            <img
              src={IMG}
              alt="Crafted brass architectural detail"
              className="w-full h-[420px] lg:h-[600px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/60 to-transparent">
              <div className="overline mb-1">{a.legacy_overline}</div>
              <div className="font-display text-2xl text-white">
                {a.legacy_brand}
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -right-6 hidden md:block w-40 h-40 border border-[#D4AF37]/40 bg-[#0A0A0A] p-5">
            <div className="overline mb-2">{a.atelier}</div>
            <div className="font-display text-2xl text-white leading-tight">
              {a.city_a}
              <br />
              <span className="text-[#D4AF37]">{a.city_b}</span>
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-7 lg:ps-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="overline mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-[#D4AF37]" /> {a.overline}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-white font-light"
          >
            {a.title_a}
            <span className="italic">{a.title_b}</span> —
            <br />
            <span className="brass-text">{a.title_c}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mt-8 max-w-2xl text-white/65 text-base lg:text-lg leading-relaxed font-light"
          >
            {a.body}
          </motion.p>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {a.audiences.map((label, i) => {
              const Icon = ICONS[i] || Building2;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="group p-5 border border-white/10 hover:border-[#D4AF37]/50 transition-colors"
                  data-testid={`audience-${i}`}
                >
                  <Icon size={22} className="text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  <div className="mt-4 text-sm text-white/80">{label}</div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 lg:gap-10 pt-8 border-t border-white/10">
            {a.pillars.map((s, i) => (
              <div key={i}>
                <div className="font-display italic text-xl text-[#D4AF37]">
                  {s.v}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-white/50">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
