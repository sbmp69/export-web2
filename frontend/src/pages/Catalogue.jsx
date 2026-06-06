import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import WhatsAppFloat from "@/components/sections/WhatsAppFloat";
import catalogueData from "@/data/catalogue.json";

const CATEGORIES = ["All", "Lever Handle", "Mortise Handle", "Pull Handle", "Cabinet Knob", "Hinge", "Brass Rod"];

export default function Catalogue() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [hovered, setHovered] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const filteredProducts = catalogueData.filter(
    (product) => activeCategory === "All" || product.category === activeCategory
  );

  return (
    <main className="bg-[#FFFFFF] text-[#0A0A0A] font-body min-h-screen flex flex-col" data-testid="catalogue-page">
      <Navbar />

      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 px-6 lg:px-12 flex-grow">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight font-light mb-6">
              Our <span className="italic brass-text">Catalogue</span>
            </h1>
            <p className="text-[#0A0A0A] max-w-2xl leading-relaxed">
              Explore our premium collection of solid brass door handles and cabinet knobs, designed to elevate luxury interiors with unmatched craftsmanship.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-12 border-b border-[#0A0A0A]/10 pb-8">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm tracking-wide transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-[#9CB4A9] text-black font-medium"
                    : "bg-[#0A0A0A]/5 text-[#0A0A0A] hover:bg-[#0A0A0A]/10 hover:text-[#0A0A0A]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={product.id}
                  className="group flex flex-col bg-[#F5F5F5] border border-[#0A0A0A]/10 overflow-hidden hover:border-[#9CB4A9]/50 transition-colors"
                  onMouseEnter={() => setHovered(product.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="relative aspect-square overflow-hidden bg-[#FFFFFF]/40">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#F5F5F5] via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute top-4 left-4 bg-[#FFFFFF]/60 backdrop-blur-sm px-3 py-1 rounded-full border border-[#0A0A0A]/10">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[#9CB4A9]">
                        {product.id < 10 ? `0${product.id}` : product.id}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col relative">
                    <h3 className="font-display text-xl text-[#0A0A0A] mb-2 group-hover:text-[#9CB4A9] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    
                    <p className="text-sm text-[#0A0A0A] mb-6 line-clamp-2 leading-relaxed flex-grow">
                      {product.description}
                    </p>

                    <div className="space-y-2 mt-auto text-xs text-[#0A0A0A]">
                      <div className="flex justify-between border-b border-[#0A0A0A]/5 pb-2">
                        <span>Material</span>
                        <span className="text-[#0A0A0A]">{product.material}</span>
                      </div>
                      <div className="flex justify-between border-b border-[#0A0A0A]/5 pb-2">
                        <span>Finish</span>
                        <span className="text-[#0A0A0A] truncate max-w-[60%] text-right">{product.finish}</span>
                      </div>
                      <div className="flex justify-between pt-1">
                        <span>Application</span>
                        <span className="text-[#0A0A0A] truncate max-w-[60%] text-right">{product.application}</span>
                      </div>
                    </div>
                    
                    {product.technicalDetails && (
                      <div className="mt-4 pt-4 border-t border-[#0A0A0A]/5">
                        <button
                          onClick={() => setExpandedId(expandedId === product.id ? null : product.id)}
                          className="text-[#9CB4A9] text-[11px] uppercase tracking-wider font-medium hover:text-[#0A0A0A] transition-colors flex items-center gap-2"
                        >
                          {expandedId === product.id ? "Hide Specs" : "View Technical Specs"}
                        </button>
                        <AnimatePresence>
                          {expandedId === product.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 space-y-2 overflow-hidden"
                            >
                              {product.technicalDetails.map((detail, idx) => (
                                <div key={idx} className="text-xs text-[#0A0A0A] leading-relaxed border-l border-[#9CB4A9]/30 pl-3">
                                  {detail}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                    
                    <div className="mt-5 pt-4 border-t border-[#0A0A0A]/5">
                      <button
                        onClick={() => {
                          navigate("/");
                          setTimeout(() => {
                            const el = document.getElementById("contact");
                            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                          }, 100);
                        }}
                        className="w-full bg-[#9CB4A9] hover:bg-[#8CA499] text-black py-3 text-xs uppercase tracking-[0.2em] font-medium transition-colors"
                      >
                        Inquire / Quote
                      </button>
                    </div>
                    
                    {hovered === product.id && (
                      <motion.div
                        layoutId="active-catalogue-line"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#9CB4A9]"
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-[#0A0A0A]">
              No products found in this category.
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
