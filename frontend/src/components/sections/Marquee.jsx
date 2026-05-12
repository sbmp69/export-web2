import React from "react";
import { useI18n } from "@/i18n/I18nProvider";

export default function Marquee() {
  const { t } = useI18n();
  const list = [...t.marquee, ...t.marquee];
  return (
    <div
      className="relative border-y border-white/10 bg-[#0A0A0A] py-6 overflow-hidden"
      data-testid="marquee-strip"
    >
      <div className="flex marquee whitespace-nowrap gap-12">
        {list.map((label, i) => (
          <div key={i} className="flex items-center gap-12 shrink-0">
            <span className="font-display italic text-2xl md:text-3xl text-white/80">
              {label}
            </span>
            <span className="text-[#D4AF37] text-xl">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
