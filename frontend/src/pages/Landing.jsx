import React from "react";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Products from "@/components/sections/Products";
import BrassRodsExport from "@/components/sections/BrassRodsExport";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import WhatsAppFloat from "@/components/sections/WhatsAppFloat";

export default function Landing() {
  return (
    <main className="bg-[#FFFFFF] text-[#0A0A0A] font-body" data-testid="landing-page">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Products />
      <BrassRodsExport />
      <WhyChooseUs />
      <Experience />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
