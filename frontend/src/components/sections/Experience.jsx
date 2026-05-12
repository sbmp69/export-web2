import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nProvider";

const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1770816306485-862b40ecc402?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
    span: "lg:col-span-7 lg:row-span-2",
    h: "h-[420px] lg:h-[680px]",
  },
  {
    src: "https://images.pexels.com/photos/13722891/pexels-photo-13722891.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200",
    span: "lg:col-span-5",
    h: "h-[330px]",
  },
  {
    src: "https://images.pexels.com/photos/7605492/pexels-photo-7605492.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200",
    span: "lg:col-span-5",
    h: "h-[330px]",
  },
];

export default function Experience() {
  const { t } = useI18n();
  const e = t.experience;

  return (
    <section
      id="experience"
      className="relative py-24 lg:py-36 bg-[#0A0A0A] border-t border-white/10 overflow-hidden"
      data-testid="experience-section"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 items-end">
          <div className="lg:col-span-7">
            <div className="overline mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-[#D4AF37]" /> {e.overline}
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-white font-light">
              {e.title_a}<span className="italic">{e.title_b}</span>{e.title_c}
              <br />
              <span className="brass-text">{e.title_d}</span>
            </h2>
          </div>
          <p className="lg:col-span-5 text-white/60 leading-relaxed">{e.body}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {GALLERY.map((g, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              className={`relative overflow-hidden border border-white/10 group ${g.span}`}
              data-testid={`experience-image-${i}`}
            >
              <img
                src={g.src}
                alt={e.captions[i]}
                className={`w-full ${g.h} object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <figcaption className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.3em] text-white/70">
                  {e.captions[i]}
                </span>
                <span className="text-[10px] tracking-[0.3em] text-[#D4AF37]">
                  ALUX · 0{i + 1}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mt-20 max-w-4xl mx-auto text-center px-4"
          data-testid="experience-quote"
        >
          <div className="text-[#D4AF37] text-3xl mb-4">“</div>
          <p className="font-display text-2xl md:text-3xl lg:text-4xl text-white/85 italic leading-relaxed font-light">
            {e.quote}
          </p>
          <div className="mt-6 text-[10px] uppercase tracking-[0.3em] text-white/40">
            {e.quote_by}
          </div>
        </motion.blockquote>
      </div>
    </section>
  );
}
