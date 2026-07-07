import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { useNavigate } from "react-router-dom";

const STATIC = [
  {
    code: "01",
    img: "/catalogue/fancy_door_handle_1.png",
    span: "lg:col-span-7 lg:row-span-2",
    height: "h-[480px] lg:h-[760px]",
    category: "Fancy Door Handle",
  },
  {
    code: "02",
    img: "/catalogue/hinge_39.png",
    span: "lg:col-span-5",
    height: "h-[360px]",
    category: "Hinge",
  },
  {
    code: "03",
    img: "/catalogue/cabinet_knob_57.png",
    span: "lg:col-span-5",
    height: "h-[380px]",
    category: "Cabinet Knob",
  },
  {
    code: "04",
    img: "/catalogue/pull_handle_79.png",
    span: "lg:col-span-4",
    height: "h-[360px]",
    category: "Pull Handle",
  },
  {
    code: "05",
    img: "/catalogue/brass_rod_92.png",
    span: "lg:col-span-4",
    height: "h-[360px]",
    category: "Brass Rod",
  },
  {
    code: "06",
    img: "/catalogue/tower_bolt_100.png",
    span: "lg:col-span-4",
    height: "h-[360px]",
    category: "Tower Bolt",
  },
];

const goTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Products() {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();
  const { t } = useI18n();
  const p = t.products;

  return (
    <section
      id="products"
      className="relative py-24 lg:py-36 bg-[#FFFFFF]"
      data-testid="products-section"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div>
            <div className="overline mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-[#9CB4A9]" /> {p.overline}
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-[#0A0A0A] font-light max-w-3xl">
              {p.title_a}<span>{p.title_b}</span> —
              <br />
              <span className="brass-text">{p.title_c}</span>
            </h2>
          </div>
          <p className="max-w-md text-[#0A0A0A] leading-relaxed">{p.body}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {STATIC.map((s, i) => {
            const item = p.items[i];
            return (
              <motion.article
                key={s.code}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.06 }}
                onMouseEnter={() => setHovered(s.code)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => navigate("/catalogue", { state: { category: s.category } })}
                className={`relative group overflow-hidden border border-[#0A0A0A]/10 hover:border-[#9CB4A9]/50 transition-all duration-500 bg-[#F5F5F5] cursor-pointer ${s.span}`}
                data-testid={`product-card-${s.code}`}
              >
                <div className="flex flex-col h-full w-full">
                  {/* Top Image Section */}
                  <div className={`relative ${s.height} w-full flex items-center justify-center bg-[#F5F5F5] overflow-hidden`}>
                    <img
                      src={s.img}
                      alt={item.title}
                      className="w-full h-full object-contain mix-blend-multiply transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06] p-8"
                      loading="lazy"
                    />
                    
                    <div className="absolute top-5 start-5 flex items-center gap-3">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-[#0A0A0A]/50 font-medium">
                        {p.series} · {s.code}
                      </span>
                    </div>

                    <div className="absolute top-5 end-5 w-10 h-10 border border-[#0A0A0A]/10 flex items-center justify-center text-[#0A0A0A] group-hover:border-[#9CB4A9] group-hover:bg-[#9CB4A9] group-hover:text-white transition">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>

                  {/* Bottom Text Section */}
                  <div className="relative bg-[#1A1A1A] p-6 lg:p-8 flex flex-col justify-end flex-grow">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-[#9CB4A9] mb-2">
                      {item.tagline}
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl text-white leading-tight">
                      {item.title}
                    </h3>
                    <div className="overflow-hidden">
                      <p className="mt-3 text-sm text-white/70 max-w-md leading-relaxed hidden group-hover:block transition-all duration-500">
                        {item.desc}
                      </p>
                    </div>

                    {hovered === s.code && (
                      <motion.div
                        layoutId="active-line"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-[#9CB4A9]"
                      />
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-[#0A0A0A]/10">
          <p className="text-[#0A0A0A] text-sm max-w-xl">{p.foot}</p>
          <button
            data-testid="products-cta-catalogue"
            onClick={() => navigate("/catalogue")}
            className="inline-flex items-center gap-2 text-sm tracking-wide text-[#9CB4A9] hover:text-[#8CA499] link-underline"
          >
            {p.cta}
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
