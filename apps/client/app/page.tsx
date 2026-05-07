"use client";

import { useState, useEffect } from "react";
import { useProductStore } from "@/app/store/productStore";
import {
  FiSearch, FiFilter, FiGrid, FiList, FiEye, FiMenu,
  FiShoppingCart, FiUser, FiChevronDown, FiInfo, FiPlus, FiArrowUpRight
} from "react-icons/fi";
import { MotionHighlight, MotionHighlightItem } from "@/app/components/ui/motion-highlight";

export default function Home() {
  const [isExploring, setIsExploring] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const { products, loading, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#f5f5f5] font-sans">

      {/* Marketplace Content (Revealed after slide) */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-y-auto pb-20">
        {/* Top Navbar (Jumia Style) */}
        <header className="bg-white shadow-sm sticky top-0 z-50 w-full">
          <div className="w-full px-4 md:px-6 lg:px-8 h-20 flex items-center gap-4 md:gap-8">
            {/* Menu & Logo */}
            <div className="flex items-center gap-3 shrink-0">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700">
                <FiMenu className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full border-[4px] border-blue-600"></div>
                <span className="text-2xl font-bold text-gray-900 tracking-tight font-serif hidden sm:block">Keriro</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 flex">
              <div className="relative w-full flex items-center">
                <FiSearch className="absolute left-4 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products, brands and categories"
                  className="w-full h-12 pl-12 pr-4 border border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500 text-gray-900 placeholder-gray-500 text-base"
                />
              </div>
              <button className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-r-lg transition-colors shadow-sm">
                Search
              </button>
            </div>

            {/* Actions (Account, Help, Cart) */}
            <div className="flex items-center gap-2 shrink-0">
              <button className="hidden md:flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700 font-medium">
                <FiUser className="w-5 h-5" />
                Account
                <FiChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              <button className="hidden lg:flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700 font-medium">
                <FiInfo className="w-5 h-5" />
                Help
                <FiChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700 font-medium">
                <FiShoppingCart className="w-5 h-5" />
                Cart
              </button>
            </div>
          </div>
        </header>

        <div className="w-full px-4 md:px-6 lg:px-8 pt-6 space-y-6">
          {/* Breadcrumbs */}
          <div className="text-sm text-gray-500 font-medium">
            Home &gt; <span className="text-gray-900">Marketplace</span>
          </div>

          {/* Hero Banner inside marketplace */}
          <div
            className="w-full rounded-2xl overflow-hidden relative flex items-center min-h-[320px] shadow-sm bg-blue-50"
            style={{
              backgroundImage: "url('/images/hero-bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent"></div>
            <div className="relative z-10 p-8 md:p-12 max-w-2xl">
              <h1 className="font-serif text-[40px] md:text-[56px] leading-[1.1] text-gray-900 mb-4 font-bold">
                Turn your shopping dreams into a global Hub
              </h1>
              <p className="text-lg text-gray-700 mb-8 max-w-lg">
                Discover a curated collection of world-class products. Your ultimate marketplace experience is now in one place.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all">
                Shop Collections
              </button>
            </div>
          </div>

          {/* Categories Quick Links */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2 overflow-hidden">
            <MotionHighlight
              mode="parent"
              controlledItems={true}
              value={activeCategory}
              onValueChange={(val) => val && setActiveCategory(val)}
              className="bg-blue-50/80 rounded-xl"
              containerClassName="flex items-center gap-2 overflow-x-auto scrollbar-hide p-1"
            >
              {["All Categories", "Software", "UI Kits", "Templates", "Icons", "Mockups", "Themes"].map((cat) => (
                <MotionHighlightItem
                  key={cat}
                  value={cat}
                  className="whitespace-nowrap px-6 py-2.5 rounded-xl font-medium text-sm transition-colors cursor-pointer relative z-10"
                  activeClassName="text-blue-600"
                >
                  <span className={activeCategory === cat ? "text-blue-600" : "text-gray-600"}>
                    {cat}
                  </span>
                </MotionHighlightItem>
              ))}
            </MotionHighlight>
          </div>

          {/* Products Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Section Header & Toolbar */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
              <h2 className="font-serif text-2xl font-bold text-gray-900">Top Deals for You</h2>

              <div className="flex items-center gap-3">
                <button className="h-10 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center gap-2 text-gray-600 text-sm font-medium transition-colors">
                  <FiFilter className="w-4 h-4" />
                  Filter
                </button>

                <div className="flex items-center gap-1 h-10 rounded-lg bg-gray-100 p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`w-9 h-full flex justify-center items-center rounded-md transition-colors ${viewMode === "grid" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    <FiGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`w-9 h-full flex justify-center items-center rounded-md transition-colors ${viewMode === "list" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    <FiList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="p-6">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl h-[340px] animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "flex flex-col gap-4"}>
                  {products.length > 0 ? products.map((product) => (
                    <div
                      key={product.id}
                      className={`group bg-white p-2 rounded-2xl border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer flex ${viewMode === "list" ? "flex-row gap-6" : "flex-col"}`}
                    >
                      {/* Product Image */}
                      <div className={`p-2 bg-gray-50 rounded-xl shrink-0 ${viewMode === "list" ? "w-64 h-48" : "w-full aspect-[4/3] mb-2"}`}>
                        <img
                          src={product.imageUrl || "/images/hero-bg.png"}
                          alt={product.title}
                          className="w-full h-full object-cover rounded-lg group-hover:scale-[1.02] transition-transform duration-300"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="px-3 py-2 flex-1 flex flex-col">
                        <div className="w-full mb-3">
                          <h3 className="text-gray-900 font-semibold text-base mb-1.5 line-clamp-1">
                            {product.title}
                          </h3>
                          <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">
                            {product.description || "No description available for this amazing product."}
                          </p>
                        </div>

                        <div className="mt-auto">
                          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">
                                Price
                              </span>
                              <span className="text-gray-900 font-bold text-lg">
                                ₦ {Number(product.price).toLocaleString()}
                              </span>
                            </div>
                            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                              View details
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex flex-col items-start gap-1">
                              <span className="bg-gray-100 text-gray-600 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md">
                                Software
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-400 text-xs bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                              <FiEye className="w-3.5 h-3.5" />
                              <span className="font-medium text-gray-600">
                                124
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="col-span-full py-16 flex flex-col items-center justify-center text-gray-500">
                      <p className="text-lg font-medium mb-2">No deals found right now</p>
                      <p className="text-sm">Check back later for amazing offers.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Overlay (Slides up to reveal marketplace) */}
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
            <span className="text-3xl font-semibold text-[#1d1d1f] tracking-normal font-serif font-serif">Keriro</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden sm:block font-serif bg-white text-[#1d1d1f] px-5 py-2.5 rounded-full font-semibold text-xl text-sm shadow-sm hover:shadow transition-shadow">
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
            <span className="relative inline-block px-2 italic">
              hub.
              {/* Hand-drawn circle SVG */}
              {/* <svg className="absolute -inset-x-10 -inset-y-5 w-[calc(100%+60px)] h-[calc(100%+60px)] text-[#2563eb] pointer-events-none -rotate-2" viewBox="0 0 200 100" preserveAspectRatio="none">
                <path d="M 20,50 C 20,10 180,10 180,50 C 180,90 20,90 20,50 C 20,30 60,15 100,15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg> */}
            </span>
          </h1>
          <p className="text-[1.25rem] md:text-[1.5rem] text-[#4b5563] mb-12 max-w-3xl mx-auto font-normal leading-relaxed tracking-tight">
            Discover a curated collection of world-class products. From unique finds to daily essentials, your ultimate marketplace experience is now in one place.
          </p>

          <div className="flex items-center justify-center gap-0">
            <button
              onClick={() => setIsExploring(true)}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] font-serif text-white px-8 py-4 rounded-full font-medium transition-all text-xl active:translate-y-0 cursor-pointer"
            >
              Explore marketplace
            </button>
            <button
              onClick={() => setIsExploring(true)}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white w-[56px] h-[56px] flex items-center justify-center rounded-full transition-all group active:translate-y-0 cursor-pointer"
            >
              <FiArrowUpRight className="w-6 h-6 transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

    </main>
  );
}
