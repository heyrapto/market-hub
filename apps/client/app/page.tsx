"use client";

import { useState } from "react";
import { FiMenu, FiArrowUpRight } from "react-icons/fi";

export default function Home() {
  const [isExploring, setIsExploring] = useState(false);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Hero Overlay */}
      <div
        className={`absolute inset-0 z-10 w-full h-full flex flex-col items-center bg-cover bg-center bg-no-repeat transition-transform duration-[1200ms] ease-[cubic-bezier(0.65,0,0.05,1)] ${isExploring ? "-translate-y-full pointer-events-none" : "translate-y-0"
          }`}
        style={{
          backgroundImage: "url('/images/hero-bg.png')",
          backgroundColor: "#dbeafe"
        }}
      >
        {/* Navbar */}
        <nav className="w-full flex items-center justify-between px-6 py-6 md:px-10 lg:px-16">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border-[4px] border-[#3b82f6]"></div>
            <span className="text-xl font-semibold text-[#1d1d1f] tracking-tight">Market Hub</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden sm:block bg-white text-[#1d1d1f] px-5 py-2.5 rounded-full font-medium text-sm shadow-sm hover:shadow transition-shadow">
              Get started
            </button>
            <button className="bg-white p-2.5 rounded-full shadow-sm hover:shadow transition-shadow flex items-center justify-center text-[#1d1d1f]">
              <FiMenu className="w-5 h-5" />
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 w-full -mt-20">
          <h1 className="font-serif text-[3.5rem] md:text-[7.5rem] leading-[1.05] text-[#1d1d1f] mb-8 font-medium tracking-tight italic">
            Turn your shopping dreams <br /> into a global{" "}
            <span className="relative inline-block px-2 not-italic">
              Hub
              {/* Hand-drawn circle SVG */}
              <svg className="absolute -inset-x-4 -inset-y-2 w-[calc(100%+32px)] h-[calc(100%+16px)] text-[#2563eb] pointer-events-none -rotate-2" viewBox="0 0 200 100" preserveAspectRatio="none">
                <path d="M 20,50 C 20,10 180,10 180,50 C 180,90 20,90 20,50 C 20,30 60,15 100,15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="text-[1.25rem] md:text-[1.5rem] text-[#4b5563] mb-12 max-w-3xl mx-auto font-normal leading-relaxed tracking-tight">
            Discover a curated collection of world-class products. From unique finds to daily essentials, your ultimate marketplace experience is now in one place.
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setIsExploring(true)}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-4 rounded-full text-[1.1rem] font-medium shadow-md hover:shadow-lg transition-all active:translate-y-0"
            >
              Explore marketplace
            </button>
            <button
              onClick={() => setIsExploring(true)}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white w-[56px] h-[56px] flex items-center justify-center rounded-full shadow-md hover:shadow-lg transition-all group active:translate-y-0"
            >
              <FiArrowUpRight className="w-6 h-6 transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Hidden Content (Revealed after slide) */}
      <div className="absolute inset-0 z-0 w-full h-full flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="font-serif text-4xl text-gray-900 mb-4 italic">Welcome to the Marketplace</h2>
          <p className="text-gray-500 max-w-md mx-auto">Explore our premium selection of curated products and find exactly what you need.</p>
        </div>
      </div>
    </main>
  );
}
