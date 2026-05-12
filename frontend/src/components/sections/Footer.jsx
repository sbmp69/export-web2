import React from "react";
import {
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  ArrowUp,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

const PHONE = "9099369442";
const EMAIL = "purnatpedhadiya2016@gmail.com";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function Footer() {
  const { t, lang } = useI18n();
  const f = t.footer;

  const waText =
    lang === "ar"
      ? "مرحباً Alux Architectural، أرغب في الاستفسار عن مجموعتكم من الأجهزة."
      : "Hi Alux Architectural, I'd like to enquire about your hardware collection.";
  const WHATSAPP = `https://wa.me/91${PHONE}?text=${encodeURIComponent(waText)}`;

  return (
    <footer
      className="relative bg-[#070707] border-t border-white/10 text-white overflow-hidden"
      data-testid="footer"
    >
      {/* Subtle metallic glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 80% 0%, rgba(212,175,55,0.55), transparent 50%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 pt-20 pb-10">
        {/* CTA strip */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-14 border-b border-white/10"
          data-testid="footer-cta"
        >
          <div className="lg:col-span-7">
            <div className="overline mb-5 flex items-center gap-3">
              <span className="w-8 h-px bg-[#D4AF37]" /> {f.cta_overline}
            </div>
            <h3 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight font-light text-white">
              {f.cta_title_a}
              <br />
              <span className="brass-text italic">{f.cta_title_b}</span>
            </h3>
            <p className="mt-6 max-w-xl text-white/60 leading-relaxed">
              {f.cta_body}
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-end gap-3">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              data-testid="footer-cta-whatsapp"
              className="group inline-flex items-center justify-between gap-3 bg-[#25D366] hover:bg-[#1FBE5C] text-white px-6 py-4 text-sm font-medium tracking-wide transition-colors"
            >
              <span className="flex items-center gap-3">
                <MessageCircle size={18} />
                {f.cta_whatsapp}
              </span>
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              data-testid="footer-cta-email"
              className="group inline-flex items-center justify-between gap-3 border border-white/20 hover:border-[#D4AF37] text-white px-6 py-4 text-sm font-medium tracking-wide transition-colors"
            >
              <span className="flex items-center gap-3">
                <Mail size={18} className="text-[#D4AF37]" />
                {f.cta_email}
              </span>
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>

        {/* Giant brand */}
        <div className="py-14 border-b border-white/10">
          <div className="overline mb-6">{f.place}</div>
          <h4 className="font-display text-5xl md:text-7xl lg:text-[120px] leading-[0.9] tracking-tight font-light">
            <span className="text-white">Alux</span>{" "}
            <span className="brass-text italic">Architectural.</span>
          </h4>
          <p className="mt-6 max-w-xl text-white/55 leading-relaxed">
            {f.desc}
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-14">
          {/* Atelier */}
          <div className="md:col-span-4">
            <div className="overline mb-5">{f.atelier_overline}</div>
            <p className="text-white/70 leading-relaxed text-sm whitespace-pre-line mb-6">
              {f.atelier_addr}
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`tel:+91${PHONE}`}
                  data-testid="footer-phone"
                  className="group flex items-center gap-3 text-white/70 hover:text-[#D4AF37] transition w-fit"
                >
                  <Phone size={14} className="text-[#D4AF37]" />
                  <span className="link-underline">+91 {PHONE}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  data-testid="footer-email"
                  className="group flex items-center gap-3 text-white/70 hover:text-[#D4AF37] transition w-fit"
                >
                  <Mail size={14} className="text-[#D4AF37]" />
                  <span className="link-underline break-all">{EMAIL}</span>
                </a>
              </li>
              <li>
                <span
                  className="flex items-center gap-3 text-white/70"
                  data-testid="footer-location"
                >
                  <MapPin size={14} className="text-[#D4AF37]" />
                  Mumbai · India
                </span>
              </li>
            </ul>
          </div>

          {/* Navigate */}
          <div className="md:col-span-3">
            <div className="overline mb-5">{f.navigate}</div>
            <ul className="space-y-3">
              {f.nav_items.map((q) => (
                <li key={q.id}>
                  <button
                    data-testid={`footer-link-${q.id}`}
                    onClick={() => scrollTo(q.id)}
                    className="text-sm text-white/70 hover:text-white link-underline"
                  >
                    {q.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Collection */}
          <div className="md:col-span-3">
            <div className="overline mb-5">{f.collection}</div>
            <ul className="space-y-3">
              {f.collection_items.map((c, i) => (
                <li key={i} className="text-sm text-white/70">
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Follow */}
          <div className="md:col-span-2">
            <div className="overline mb-5">{f.follow}</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { Icon: Instagram, label: "instagram" },
                { Icon: Facebook, label: "facebook" },
                { Icon: Linkedin, label: "linkedin" },
                { Icon: Youtube, label: "youtube" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  data-testid={`footer-social-${label}`}
                  className="aspect-square border border-white/15 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 flex items-center justify-center text-white/70 hover:text-[#D4AF37] transition-all"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            {/* WhatsApp social tile */}
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              data-testid="footer-whatsapp"
              className="mt-3 flex items-center gap-2 border border-white/15 hover:border-[#25D366] hover:text-[#25D366] text-white/70 px-3 py-2 text-xs tracking-[0.2em] uppercase transition-colors"
            >
              <MessageCircle size={14} />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Legal strip */}
        <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="text-xs text-white/40 tracking-wide">
              {f.rights.replace("{year}", new Date().getFullYear())}
            </p>
            <span className="hidden md:inline text-white/20">·</span>
            <ul className="flex items-center gap-4">
              {f.legal.map((label, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-xs text-white/40 hover:text-[#D4AF37] transition link-underline"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/35 hidden sm:inline">
              {f.designed_in}
            </span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              data-testid="footer-back-to-top"
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50 hover:text-[#D4AF37] transition-colors"
            >
              {f.back_to_top}
              <ArrowUp
                size={14}
                className="transition-transform group-hover:-translate-y-1"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
