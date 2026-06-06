import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";

const PHONE = "9099369442";

export default function WhatsAppFloat() {
  const { t, lang } = useI18n();
  const text =
    lang === "ar"
      ? "مرحباً Alux Architectural، أرغب في الاستفسار عن مجموعتكم من الأجهزة."
      : "Hi Alux Architectural, I'd like to enquire about your hardware collection.";
  const LINK = `https://wa.me/91${PHONE}?text=${encodeURIComponent(text)}`;

  return (
    <motion.a
      href={LINK}
      target="_blank"
      rel="noreferrer"
      data-testid="whatsapp-float"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="fixed bottom-6 end-6 z-40 group"
      aria-label="Chat on WhatsApp"
    >
      <span className="absolute inset-0 rounded-full pulse-glow" />
      <span className="relative flex items-center gap-3 bg-[#25D366] hover:bg-[#1FBE5C] text-[#0A0A0A] ps-3 pe-5 py-3 rounded-full shadow-2xl transition-colors">
        <span className="w-9 h-9 rounded-full bg-[#0A0A0A]/15 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
            aria-hidden
          >
            <path d="M19.05 4.91A10 10 0 0 0 4.1 17.34L3 21l3.74-1.07A10 10 0 1 0 19.05 4.91Zm-7.06 15.36h-.01a8.36 8.36 0 0 1-4.27-1.17l-.31-.18-2.22.64.66-2.16-.2-.32a8.37 8.37 0 1 1 6.35 3.19Zm4.6-6.27c-.25-.13-1.49-.74-1.72-.82s-.4-.13-.57.13-.65.82-.8.99-.29.19-.55.06a6.86 6.86 0 0 1-2-1.24 7.6 7.6 0 0 1-1.4-1.74c-.15-.25 0-.39.11-.51.11-.11.25-.29.37-.43a1.66 1.66 0 0 0 .25-.42.46.46 0 0 0 0-.43c-.06-.13-.57-1.36-.78-1.86s-.41-.42-.57-.43h-.49a.95.95 0 0 0-.69.32 2.86 2.86 0 0 0-.9 2.13 5 5 0 0 0 1.05 2.66 11.4 11.4 0 0 0 4.36 3.86 14.79 14.79 0 0 0 1.46.54 3.5 3.5 0 0 0 1.61.1 2.62 2.62 0 0 0 1.71-1.21 2.13 2.13 0 0 0 .15-1.21c-.06-.11-.23-.17-.48-.3Z" />
          </svg>
        </span>
        <span className="hidden sm:flex flex-col items-start leading-tight">
          <span className="text-[10px] uppercase tracking-[0.25em] opacity-90">
            {t.whatsapp.kicker}
          </span>
          <span className="text-sm font-medium">{t.whatsapp.label}</span>
        </span>
      </span>
    </motion.a>
  );
}
