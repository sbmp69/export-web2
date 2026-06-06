import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_IDS = ["about", "products", "rods", "why", "experience", "contact"];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

function LangToggle({ compact = false }) {
  const { lang, setLang } = useI18n();
  return (
    <div
      className={`inline-flex items-center border border-[#0A0A0A]/15 ${compact ? "" : "hover:border-[#9CB4A9]/60"} transition-colors`}
      data-testid="lang-toggle"
    >
      <button
        onClick={() => setLang("en")}
        data-testid="lang-en"
        className={`px-3 py-1.5 text-[11px] tracking-[0.2em] uppercase transition-colors ${
          lang === "en" ? "bg-[#9CB4A9] text-black" : "text-[#0A0A0A] hover:text-[#0A0A0A]"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("ar")}
        data-testid="lang-ar"
        className={`px-3 py-1.5 text-[11px] tracking-[0.2em] uppercase transition-colors ${
          lang === "ar" ? "bg-[#9CB4A9] text-black" : "text-[#0A0A0A] hover:text-[#0A0A0A]"
        }`}
      >
        AR
      </button>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollTo = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollTo(id), 100);
    } else {
      scrollTo(id);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#FFFFFF] ${
          scrolled
            ? "border-b border-[#0A0A0A]/10 shadow-sm"
            : ""
        }`}
        data-testid="main-navbar"
      >
        <nav className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <button
            onClick={() => handleScrollTo("hero")}
            data-testid="nav-logo"
            className="flex items-center gap-3 group"
          >
            <img src="/omera_logo.jpg" alt="Omera Exports" className="w-14 h-14 object-contain shrink-0 mix-blend-multiply scale-[1.35]" />
            <div className="text-start leading-tight">
              <div className="font-display text-base tracking-wide text-[#0A0A0A]">
                Omera<span className="text-[#9CB4A9]"> Exports</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#0A0A0A]">
                Aadesh Enterprise
              </div>
            </div>
          </button>

          <ul className="hidden lg:flex items-center gap-10">
            {NAV_IDS.map((id) => (
              <li key={id}>
                <button
                  data-testid={`nav-link-${id}`}
                  onClick={() => handleScrollTo(id)}
                  className="text-sm tracking-wide text-[#0A0A0A] hover:text-[#0A0A0A] link-underline transition"
                >
                  {t.nav[id]}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => navigate("/catalogue")}
                className="text-sm tracking-wide text-[#9CB4A9] hover:text-[#8CA499] link-underline transition font-medium"
              >
                {t.nav.catalogue}
              </button>
            </li>
          </ul>

          <div className="hidden lg:flex items-center gap-4">
            <LangToggle />
            <button
              data-testid="nav-cta-inquire"
              onClick={() => handleScrollTo("contact")}
              className="px-5 py-2.5 bg-[#9CB4A9] hover:bg-[#8CA499] text-black text-sm font-medium tracking-wide transition-colors"
            >
              {t.nav.cta}
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <LangToggle compact />
            <button
              data-testid="nav-mobile-toggle"
              onClick={() => setOpen((s) => !s)}
              className="text-[#0A0A0A] p-2"
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 left-0 right-0 z-40 lg:hidden backdrop-blur-xl bg-[#FFFFFF]/90 border-b border-[#0A0A0A]/10"
            data-testid="mobile-menu"
          >
            <ul className="px-6 py-6 flex flex-col gap-5">
              {NAV_IDS.map((id) => (
                <li key={id}>
                  <button
                    data-testid={`mobile-nav-${id}`}
                    onClick={() => {
                      setOpen(false);
                      handleScrollTo(id);
                    }}
                    className="text-base text-[#0A0A0A]"
                  >
                    {t.nav[id]}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/catalogue");
                  }}
                  className="text-base text-[#9CB4A9] font-medium"
                >
                  {t.nav.catalogue}
                </button>
              </li>
              <li>
                <button
                  data-testid="mobile-cta"
                  onClick={() => {
                    setOpen(false);
                    handleScrollTo("contact");
                  }}
                  className="mt-2 px-5 py-3 bg-[#9CB4A9] text-black text-sm font-medium"
                >
                  {t.nav.cta}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
