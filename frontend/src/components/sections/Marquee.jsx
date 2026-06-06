import React from "react";
import { useI18n } from "@/i18n/I18nProvider";

export default function Marquee() {
  const { t } = useI18n();
  const list = [...t.marquee, ...t.marquee];
  return (
    <div
      className="relative border-y border-[#0A0A0A]/10 bg-[#FFFFFF] py-6 overflow-hidden"
      data-testid="marquee-strip"
    >
      <div className="flex marquee whitespace-nowrap gap-12">
        {list.map((label, i) => (
          <div key={i} className="flex items-center gap-12 shrink-0">
            <span className="font-display italic text-2xl md:text-3xl text-[#0A0A0A]">
              {label}
            </span>
            <span className="text-[#9CB4A9] text-xl">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
