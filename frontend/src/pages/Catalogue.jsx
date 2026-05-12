import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import WhatsAppFloat from "@/components/sections/WhatsAppFloat";
import catalogueData from "@/data/catalogue.json";

const CATEGORIES = ["All", "Lever Handle", "Mortise Handle", "Pull Handle", "Cabinet Knob", "Hinge"];

export default function Catalogue() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hovered, setHovered] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const filteredProducts = catalogueData.filter(
    (product) => activeCategory === "All" || product.category === activeCategory
  );

  return (
    <main className="bg-[#0A0A0A] text-[#FDFBF7] font-body min-h-screen flex flex-col" data-testid="catalogue-page">
      <Navbar />

      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 px-6 lg:px-12 flex-grow">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight font-light mb-6">
              Our <span className="italic brass-text">Catalogue</span>
            </h1>
            <p className="text-white/60 max-w-2xl leading-relaxed">
              Explore our premium collection of solid brass door handles and cabinet knobs, designed to elevate luxury interiors with unmatched craftsmanship.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-12 border-b border-white/10 pb-8">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm tracking-wide transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-[#D4AF37] text-black font-medium"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
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
                  className="group flex flex-col bg-[#141414] border border-white/10 overflow-hidden hover:border-[#D4AF37]/50 transition-colors"
                  onMouseEnter={() => setHovered(product.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="relative aspect-square overflow-hidden bg-black/40">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37]">
                        {product.id < 10 ? `0${product.id}` : product.id}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col relative">
                    <h3 className="font-display text-xl text-white mb-2 group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    
                    <p className="text-sm text-white/50 mb-6 line-clamp-2 leading-relaxed flex-grow">
                      {product.description}
                    </p>

                    <div className="space-y-2 mt-auto text-xs text-white/60">
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span>Material</span>
                        <span className="text-white/90">{product.material}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span>Finish</span>
                        <span className="text-white/90 truncate max-w-[60%] text-right">{product.finish}</span>
                      </div>
                      <div className="flex justify-between pt-1">
                        <span>Application</span>
                        <span className="text-white/90 truncate max-w-[60%] text-right">{product.application}</span>
                      </div>
                    </div>
                    
                    {product.technicalDetails && (
                      <div className="mt-4 pt-4 border-t border-white/5">
                        <button
                          onClick={() => setExpandedId(expandedId === product.id ? null : product.id)}
                          className="text-[#D4AF37] text-[11px] uppercase tracking-wider font-medium hover:text-white transition-colors flex items-center gap-2"
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
                                <div key={idx} className="text-xs text-white/50 leading-relaxed border-l border-[#D4AF37]/30 pl-3">
                                  {detail}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                    
                    {hovered === product.id && (
                      <motion.div
                        layoutId="active-catalogue-line"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]"
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-white/50">
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
