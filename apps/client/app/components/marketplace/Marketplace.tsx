"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiFilter, FiGrid, FiList, FiMenu,
  FiShoppingCart, FiArrowUpRight,
  FiShield, FiZap
} from "react-icons/fi";
import { MotionHighlight, MotionHighlightItem } from "@/app/components/ui/motion-highlight";
import SearchOverlay from "@/app/components/marketplace/SearchOverlay";
import AccountDropdown from "@/app/components/marketplace/AccountDropdown";
import HelpDropdown from "@/app/components/marketplace/HelpDropdown";

const DUMMY_PRODUCTS = [
  {
    id: "1", title: "Nike Air Max 270 Running Shoes", brand: "Nike", category: "Fashion",
    price: 85000, originalPrice: 110000,
    description: "Experience all-day comfort with the Nike Air Max 270. Large Air unit in the heel for superior cushioning.",
    image: "/images/hero-bg.png",
  },
  {
    id: "2", title: "Samsung 55\" QLED 4K Smart TV", brand: "Samsung", category: "Electronics",
    price: 420000, originalPrice: 480000,
    description: "Immerse yourself in breathtaking 4K QLED picture quality with Quantum Dot technology.",
    image: "/images/hero-bg.png",
  },
  {
    id: "3", title: "JBL Flip 6 Bluetooth Speaker", brand: "JBL", category: "Electronics",
    price: 32000, originalPrice: 32000,
    description: "Portable IP67 waterproof Bluetooth speaker with bold JBL Original Pro Sound and 12-hour battery.",
    image: "/images/hero-bg.png",
  },
  {
    id: "4", title: "Adidas Ultraboost 22 Sneakers", brand: "Adidas", category: "Fashion",
    price: 92000, originalPrice: 115000,
    description: "Responsive Boost midsole and a Primeknit+ upper for a snug, sock-like fit on every run.",
    image: "/images/hero-bg.png",
  },
  {
    id: "5", title: "Apple AirPods Pro 2nd Gen", brand: "Apple", category: "Electronics",
    price: 195000, originalPrice: 220000,
    description: "Active Noise Cancellation, Transparency mode, and Adaptive Audio — all in a redesigned case.",
    image: "/images/hero-bg.png",
  },
  {
    id: "6", title: "Philips Air Fryer 4.1L HD9252", brand: "Philips", category: "Home & Living",
    price: 48000, originalPrice: 55000,
    description: "Fry, bake, grill, and roast with up to 90% less fat using Rapid Air technology.",
    image: "/images/hero-bg.png",
  },
  {
    id: "7", title: "L'Oréal Paris Revitalift Serum", brand: "L'Oréal", category: "Beauty",
    price: 8500, originalPrice: 10000,
    description: "Pure vitamin C anti-aging serum that visibly brightens skin and reduces wrinkles in 4 weeks.",
    image: "/images/hero-bg.png",
  },
  {
    id: "8", title: "Hisense 43\" Full HD Smart TV", brand: "Hisense", category: "Electronics",
    price: 215000, originalPrice: 250000,
    description: "Enjoy stunning Full HD visuals and built-in smart TV features with the Hisense A4 Series.",
    image: "/images/hero-bg.png",
  },
];

const CATEGORIES = ["All Categories", "Electronics", "Fashion", "Home & Living", "Beauty", "Sports", "Groceries"];

export default function Marketplace() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeCategory, setActiveCategory] = useState("All Categories");

  const filtered = activeCategory === "All Categories"
    ? DUMMY_PRODUCTS
    : DUMMY_PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div className="w-full min-h-screen bg-[#f5f5f5] font-sans">

      {/* ── Navbar ── */}
      <header className="bg-white shadow-sm sticky top-0 z-50 w-full">
        <div className="w-full px-4 md:px-6 lg:px-8 h-20 flex items-center gap-4 md:gap-8">
          <div className="flex items-center gap-3 shrink-0">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700">
              <FiMenu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border-[4px] border-blue-600" />
              <span className="text-2xl font-bold text-gray-900 tracking-tight font-serif hidden sm:block">Keriro</span>
            </div>
          </div>

          <SearchOverlay />

          <div className="flex items-center gap-2 shrink-0">
            <AccountDropdown />
            <HelpDropdown />
            <Link
              href="/cart"
              className="relative flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-[10px] transition-colors text-gray-700 font-medium border border-transparent hover:border-gray-200 text-sm"
            >
              <FiShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                2
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Content ── */}
      <div className="w-full px-4 md:px-6 lg:px-8 pt-6 space-y-6 pb-20">

        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 font-medium">
          Home &gt; <span className="text-gray-900">Marketplace</span>
        </div>

        {/* Hero Banner */}
        <div
          className="w-full rounded-2xl overflow-hidden relative flex items-center min-h-[320px] shadow-sm"
          style={{ backgroundImage: "url('/images/hero-bg.png')", backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/70 to-transparent" />
          <div className="relative z-10 p-8 md:p-12 max-w-2xl">
            <h1 className="font-serif text-[40px] md:text-[56px] leading-[1.1] text-gray-900 mb-4 font-bold">
              Millions of products,<br />delivered to your door
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-lg">
              Shop electronics, fashion, groceries and more. Fast delivery, buyer protection, and unbeatable prices across Nigeria.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all">
              Shop Now
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2 overflow-hidden">
          <MotionHighlight
            mode="parent"
            controlledItems={true}
            value={activeCategory}
            onValueChange={(val) => val && setActiveCategory(val)}
            className="bg-blue-50/80 rounded-xl"
            containerClassName="flex items-center gap-2 overflow-x-auto scrollbar-hide p-1"
          >
            {CATEGORIES.map((cat) => (
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
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-gray-900">Top Deals Near You</h2>
            <div className="flex items-center gap-3">
              <button className="h-10 px-4 rounded-[10px] border border-gray-200 bg-white hover:bg-gray-50 flex items-center gap-2 text-gray-600 text-sm font-medium transition-colors shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]">
                <FiFilter className="w-4 h-4" /> Filter
              </button>
              <div className="flex items-center gap-1 h-10 rounded-[10px] bg-gray-100 p-1">
                {(["grid", "list"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`w-9 h-full flex justify-center items-center rounded-[6px] transition-colors ${viewMode === mode ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    {mode === "grid" ? <FiGrid className="w-4 h-4" /> : <FiList className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className={viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
              : "flex flex-col gap-4"
            }>
              {filtered.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className={`group bg-gray-100/80 p-1.5 rounded-[26px] border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex ${viewMode === "list" ? "flex-row" : "flex-col"}`}
                >
                  <div className={`bg-white rounded-[20px] overflow-hidden flex ${viewMode === "list" ? "flex-row w-full" : "flex-col w-full"} shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]`}>
                    {/* Image */}
                    <div className={`bg-gray-50 shrink-0 relative overflow-hidden ${viewMode === "list" ? "w-52 h-auto" : "w-full aspect-[4/3]"}`}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.originalPrice > product.price && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full border border-gray-100 shadow-sm">
                        <span className="text-[10px] font-bold text-gray-700 uppercase tracking-tight">{product.category}</span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4 flex-1 flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{product.brand}</span>
                      <div className="flex items-start justify-between mb-1 gap-1">
                        <h3 className="text-gray-900 font-bold text-base leading-tight line-clamp-2 flex-1">{product.title}</h3>
                        <FiArrowUpRight className="text-gray-300 group-hover:text-blue-500 transition-colors w-4 h-4 shrink-0 mt-0.5" />
                      </div>
                      <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-auto">{product.description}</p>

                      <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                        <div>
                          <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest block mb-0.5">Price</span>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-gray-900 font-extrabold text-xl">₦{product.price.toLocaleString()}</span>
                            {product.originalPrice > product.price && (
                              <span className="text-gray-400 text-xs line-through">₦{product.originalPrice.toLocaleString()}</span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={(e) => e.preventDefault()}
                          className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bottom tags (grid only) */}
                  {viewMode === "grid" && (
                    <div className="flex items-center gap-2 p-3 pt-2">
                      {[
                        { icon: <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />, label: "In Stock" },
                        { icon: <FiZap className="w-3 h-3 text-blue-500" />, label: "Fast Delivery" },
                        { icon: <FiShield className="w-3 h-3 text-gray-400" />, label: "Verified" },
                      ].map(({ icon, label }) => (
                        <div key={label} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/60 rounded-xl border border-gray-200/50 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] group-hover:bg-white transition-colors">
                          {icon}
                          <span className="text-[11px] font-semibold text-gray-600">{label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
