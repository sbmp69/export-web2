import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe, Ship, Box, ShieldCheck } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

const PHONE = "9099369442";

const ROD_IMAGES = [
  "/generated/brass-rods-round.jpg",
  "/generated/brass-rods-hex.jpg",
  "/generated/brass-rods-square.jpg",
  "/generated/brass-rods-custom.jpg",
];

const ROD_CODES = ["R-01", "R-02", "R-03", "R-04"];
const BADGE_ICONS = [Globe, Ship, Box, ShieldCheck];

const goTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function BrassRodsExport() {
  const { t, lang } = useI18n();
  const r = t.rods;
  const whatsappText =
    lang === "ar"
      ? "مرحباً Alux Architectural، أرغب في طلب عرض سعر تصدير لقضبان النحاس (المقاسات والكميات والتشطيبات ومدة التسليم)."
      : "Hi Alux Architectural, I'd like to request an export quotation for Brass Rods (please share MOQ, sizes, finishes, lead time).";
  const WHATSAPP = `https://wa.me/91${PHONE}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <section
      id="rods"
      className="relative py-24 lg:py-36 bg-[#FFFFFF] border-t border-[#0A0A0A]/10 overflow-hidden"
      data-testid="rods-section"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 10%, rgba(212,175,55,0.5), transparent 50%), radial-gradient(ellipse at 85% 90%, rgba(205,127,50,0.35), transparent 55%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-14">
          <div className="lg:col-span-7">
            <div className="overline mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-[#9CB4A9]" /> {r.overline}
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-[#0A0A0A] font-light">
              {r.title_a}
              <br />
              <span className="italic">{r.title_b}</span>{" "}
              <span className="brass-text">{r.title_c}</span>
            </h2>
            <p className="mt-6 max-w-xl text-[#0A0A0A] leading-relaxed">
              {r.body}
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {r.badges.map((label, i) => {
              const Icon = BADGE_ICONS[i];
              return (
                <div
                  key={i}
                  className="p-5 border border-[#0A0A0A]/10 hover:border-[#9CB4A9]/50 transition-colors"
                  data-testid={`export-badge-${i}`}
                >
                  <Icon size={20} className="text-[#9CB4A9]" />
                  <div className="mt-3 text-sm text-[#0A0A0A]">{label}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-14 border-y border-[#0A0A0A]/10 py-4 overflow-hidden">
          <div className="flex items-center gap-8 marquee whitespace-nowrap">
            {[...r.destinations, ...r.destinations].map((d, i) => (
              <span
                key={i}
                className="text-[11px] tracking-[0.3em] uppercase text-[#0A0A0A] flex items-center gap-8 shrink-0"
              >
                {d}
                <span className="text-[#9CB4A9]">◆</span>
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {r.types.map((rod, i) => (
            <motion.article
              key={ROD_CODES[i]}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="group relative overflow-hidden border border-[#0A0A0A]/10 hover:border-[#9CB4A9]/50 bg-[#FAFAFA] transition-colors"
              data-testid={`rod-type-${ROD_CODES[i]}`}
            >
              <div className="relative h-[300px] overflow-hidden">
                <img
                  src={ROD_IMAGES[i]}
                  alt={rod.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] via-[#FFFFFF]/30 to-transparent" />
                <span className="absolute top-4 start-4 text-[10px] tracking-[0.3em] uppercase text-[#9CB4A9]">
                  {ROD_CODES[i]}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-[#0A0A0A] leading-snug">
                  {rod.title}
                </h3>
                <dl className="mt-4 space-y-3 text-xs">
                  <div className="flex items-start justify-between gap-4">
                    <dt className="uppercase tracking-[0.2em] text-[#0A0A0A]">
                      {r.size}
                    </dt>
                    <dd className="text-[#0A0A0A] text-end">{rod.dims}</dd>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <dt className="uppercase tracking-[0.2em] text-[#0A0A0A]">
                      {r.grades}
                    </dt>
                    <dd className="text-[#0A0A0A] text-end">{rod.grades}</dd>
                  </div>
                </dl>
                <button
                  onClick={() => goTo("contact")}
                  data-testid={`rod-inquire-${ROD_CODES[i]}`}
                  className="mt-6 w-full inline-flex items-center justify-between text-xs tracking-[0.2em] uppercase text-[#9CB4A9] hover:text-[#8CA499] transition"
                >
                  {r.inquire}
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10"
        >
          <div className="lg:col-span-8 border border-[#0A0A0A]/10 bg-[#FFFFFF]">
            <div className="flex items-center justify-between px-6 lg:px-8 py-5 border-b border-[#0A0A0A]/10">
              <div>
                <div className="overline">{r.table_overline}</div>
                <div className="font-display text-xl text-[#0A0A0A] mt-1">
                  {r.table_title}
                </div>
              </div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A] hidden md:block">
                {r.table_spec}
              </span>
            </div>
            <div className="overflow-x-auto" data-testid="spec-table">
              <table className="w-full text-sm">
                <tbody>
                  {r.rows.map(([k, v], i) => (
                    <tr
                      key={i}
                      className={`${
                        i !== r.rows.length - 1
                          ? "border-b border-[#0A0A0A]/5"
                          : ""
                      } hover:bg-[#0A0A0A]/[0.02] transition-colors`}
                    >
                      <th
                        scope="row"
                        className="text-start align-top px-6 lg:px-8 py-4 text-[11px] tracking-[0.25em] uppercase text-[#0A0A0A] font-medium w-[42%]"
                      >
                        {k}
                      </th>
                      <td className="px-6 lg:px-8 py-4 text-[#0A0A0A] leading-relaxed">
                        {v}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-4 border border-[#9CB4A9]/25 bg-gradient-to-b from-[#F0F5F2] to-[#FFFFFF] p-8 flex flex-col">
            <div className="overline mb-3">{r.bulk_overline}</div>
            <h3 className="font-display text-3xl text-[#0A0A0A] leading-tight">
              {r.bulk_title_a}
              <br />
              <span className="brass-text italic">{r.bulk_title_b}</span>
            </h3>
            <p className="mt-4 text-sm text-[#0A0A0A] leading-relaxed">
              {r.bulk_body}
            </p>

            <div className="mt-auto pt-8 space-y-3">
              <button
                onClick={() => goTo("contact")}
                data-testid="rods-cta-quote"
                className="group w-full inline-flex items-center justify-between gap-3 bg-[#9CB4A9] hover:bg-[#8CA499] text-black px-5 py-4 text-sm font-medium tracking-wide transition-colors"
              >
                {r.cta_quote}
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                data-testid="rods-cta-whatsapp"
                className="group w-full inline-flex items-center justify-between gap-3 border border-[#0A0A0A]/20 hover:border-[#25D366] text-[#0A0A0A] px-5 py-4 text-sm font-medium tracking-wide transition-colors"
              >
                {r.cta_whatsapp}
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-[#25D366]"
                  aria-hidden
                >
                  <path d="M19.05 4.91A10 10 0 0 0 4.1 17.34L3 21l3.74-1.07A10 10 0 1 0 19.05 4.91ZM12 20.27a8.36 8.36 0 0 1-4.27-1.17l-.31-.18-2.22.64.66-2.16-.2-.32a8.37 8.37 0 1 1 6.35 3.19Z" />
                </svg>
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-[#0A0A0A]/10 grid grid-cols-2 gap-4 text-xs">
              {r.foot_keys.map((k, i) => (
                <div key={i}>
                  <div className="text-[#0A0A0A] uppercase tracking-[0.2em] text-[10px]">
                    {k}
                  </div>
                  <div className="mt-1 text-[#0A0A0A]">{r.foot_vals[i]}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
