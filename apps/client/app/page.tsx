"use client";

import { useState, useEffect } from "react";
import { FiMenu, FiArrowUpRight } from "react-icons/fi";
import Marketplace from "@/app/components/marketplace/Marketplace";

const HERO_SEEN_KEY = "keriro_hero_seen";

export default function Home() {
  // null = loading (avoid flash), true = show marketplace, false = show hero
  const [showMarketplace, setShowMarketplace] = useState<boolean | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // On every mount check localStorage — if user has visited before, go straight to marketplace
    const alreadySeen = localStorage.getItem(HERO_SEEN_KEY) === "true";
    setShowMarketplace(alreadySeen);
  }, []);

  const handleExplore = () => {
    // Mark as seen and trigger slide-up animation before switching
    localStorage.setItem(HERO_SEEN_KEY, "true");
    setIsAnimating(true);
    setTimeout(() => setShowMarketplace(true), 1100);
  };

  // Avoid flash of wrong content while localStorage is read
  if (showMarketplace === null) return null;

  // Once seen, render the marketplace directly (no hero wrapper overhead)
  if (showMarketplace) return <Marketplace />;

  // ── Hero (first visit only) ─────────────────────────────────────────────
  return (
    <main
      className={`relative w-full min-h-screen overflow-hidden flex flex-col items-center bg-cover bg-center bg-no-repeat transition-transform duration-[1100ms] ease-[cubic-bezier(0.65,0,0.05,1)] ${isAnimating ? "-translate-y-full" : "translate-y-0"}`}
      style={{ backgroundImage: "url('/images/hero-bg.png')", backgroundColor: "#dbeafe" }}
    >
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-6 py-6 md:px-10 lg:px-16">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border-[4px] border-[#3b82f6]" />
          <span className="text-3xl font-semibold text-[#1d1d1f] tracking-normal font-serif">Keriro</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden sm:block font-serif bg-white text-[#1d1d1f] px-5 py-2.5 rounded-full font-semibold text-sm shadow-sm hover:shadow transition-shadow">
            Get started
          </button>
          <button className="bg-white p-2.5 rounded-full shadow-sm hover:shadow transition-shadow flex items-center justify-center text-[#1d1d1f]">
            <FiMenu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 w-full -mt-20">
        <h1 className="font-serif text-[3.5rem] md:text-[7.5rem] leading-[1.05] text-[#1d1d1f] mb-8 font-medium tracking-tight not-italic">
          Turn your shopping dreams <br /> into a global{" "}
          <span className="relative inline-block px-2 italic">hub.</span>
        </h1>
        <p className="text-[1.25rem] md:text-[1.5rem] text-[#4b5563] mb-12 max-w-3xl mx-auto font-normal leading-relaxed tracking-tight">
          Discover millions of products across electronics, fashion, beauty and more, fast delivery, unbeatable prices, all in one place.
        </p>

        <div className="flex items-center justify-center gap-0">
          <button
            onClick={handleExplore}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] font-serif text-white px-8 py-4 rounded-full font-medium transition-all text-xl active:translate-y-0 cursor-pointer"
          >
            Explore marketplace
          </button>
          <button
            onClick={handleExplore}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white w-[56px] h-[56px] flex items-center justify-center rounded-full transition-all group active:translate-y-0 cursor-pointer"
          >
            <FiArrowUpRight className="w-6 h-6 transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </main>
  );
}