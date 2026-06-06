import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Sparkles,
  Layers3,
  Truck,
  Package,
  Gem,
} from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

const ICONS = [Gem, Sparkles, Layers3, ShieldCheck, Package, Truck];
const NUMS = ["01", "02", "03", "04", "05", "06"];

export default function WhyChooseUs() {
  const { t } = useI18n();
  const w = t.why;

  return (
    <section
      id="why"
      className="relative py-24 lg:py-36 bg-[#FFFFFF] border-t border-[#0A0A0A]/10"
      data-testid="why-section"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-5">
            <div className="overline mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-[#9CB4A9]" /> {w.overline}
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-[#0A0A0A] font-light">
              {w.title_a}
              <br />
              <span className="italic">{w.title_b}</span>{" "}
              <span className="brass-text">{w.title_c}</span>
            </h2>
          </div>
          <p className="lg:col-span-7 lg:pt-4 text-[#0A0A0A] text-base lg:text-lg leading-relaxed max-w-2xl">
            {w.body}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[#0A0A0A]/10">
          {w.items.map((item, i) => {
            const Icon = ICONS[i];
            const isLastRow = i >= w.items.length - (w.items.length % 3 || 3);
            const isLastCol = (i + 1) % 3 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                className={`group relative p-8 lg:p-10 transition-colors hover:bg-[#F5F5F5]
                  ${!isLastRow ? "border-b border-[#0A0A0A]/10" : ""}
                  ${!isLastCol ? "md:border-e md:border-[#0A0A0A]/10" : ""}`}
                data-testid={`why-card-${NUMS[i]}`}
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-14 h-14 border border-[#0A0A0A]/15 group-hover:border-[#9CB4A9]/60 flex items-center justify-center transition-colors">
                    <Icon size={22} className="text-[#9CB4A9]" />
                  </div>
                  <span className="font-display italic text-2xl text-[#0A0A0A] group-hover:text-[#9CB4A9] transition-colors">
                    {NUMS[i]}
                  </span>
                </div>
                <h3 className="font-display text-2xl text-[#0A0A0A] leading-snug">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-[#0A0A0A] leading-relaxed">
                  {item.desc}
                </p>

                <div className="mt-8 flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A] group-hover:text-[#9CB4A9] transition-colors">
                  <span className="w-6 h-px bg-current" />
                  <span>{w.standard}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
