"use client";

import { useState } from "react";
import Link from "next/link";
import { use } from "react";
import {
  FiArrowLeft, FiShoppingCart, FiArrowUpRight, FiHeart,
  FiShare2, FiStar, FiTruck, FiShield, FiRefreshCw,
  FiCheck, FiChevronRight, FiZap, FiMapPin, FiPackage
} from "react-icons/fi";

const DUMMY_PRODUCTS: Record<string, {
  id: string; title: string; brand: string; category: string;
  price: number; originalPrice: number; rating: number; reviews: number;
  sold: number; description: string; images: string[];
  variants: { label: string; options: string[] }[];
  features: string[];
}> = {
  "1": {
    id: "1", title: "Nike Air Max 270 Running Shoes", brand: "Nike", category: "Fashion",
    price: 85000, originalPrice: 110000, rating: 4.8, reviews: 1240, sold: 3200,
    description: "Experience all-day comfort with the Nike Air Max 270. Featuring a large Air unit in the heel for superior cushioning, a breathable mesh upper, and a sleek modern silhouette. Perfect for everyday wear and light workouts.",
    images: ["/images/hero-bg.png", "/images/hero-bg.png", "/images/hero-bg.png"],
    variants: [
      { label: "Color", options: ["Black/White", "Blue/Red", "All White", "Triple Black"] },
      { label: "Size", options: ["39", "40", "41", "42", "43", "44", "45"] },
    ],
    features: ["Max Air cushioning", "Breathable mesh upper", "Rubber outsole", "Foam midsole"],
  },
  "2": {
    id: "2", title: "Samsung 55\" QLED 4K Smart TV", brand: "Samsung", category: "Electronics",
    price: 420000, originalPrice: 480000, rating: 4.6, reviews: 892, sold: 1540,
    description: "Immerse yourself in breathtaking 4K QLED picture quality. With Quantum Dot technology, this Samsung TV delivers over a billion colors with exceptional brightness and clarity, even in well-lit rooms.",
    images: ["/images/hero-bg.png", "/images/hero-bg.png", "/images/hero-bg.png"],
    variants: [
      { label: "Screen Size", options: ["43\"", "50\"", "55\"", "65\"", "75\""] },
    ],
    features: ["4K QLED Display", "Quantum HDR", "Smart TV (Tizen OS)", "4 HDMI ports", "Built-in Alexa"],
  },
  "3": {
    id: "3", title: "JBL Flip 6 Portable Bluetooth Speaker", brand: "JBL", category: "Electronics",
    price: 32000, originalPrice: 32000, rating: 4.7, reviews: 2100, sold: 5800,
    description: "The JBL Flip 6 is a portable Bluetooth speaker with bold JBL Original Pro Sound, featuring a racetrack-shaped woofer and separate tweeter for deeper bass and crystal-clear highs. IP67 waterproof rated.",
    images: ["/images/hero-bg.png", "/images/hero-bg.png", "/images/hero-bg.png"],
    variants: [
      { label: "Color", options: ["Blue", "Red", "Black", "White", "Teal", "Squad"] },
    ],
    features: ["IP67 waterproof", "12-hour battery", "PartyBoost compatible", "USB-C charging", "JBL Deep Bass"],
  },
};

const RELATED = [
  { id: "4", title: "Adidas Ultra Boost 22", brand: "Adidas", price: 92000, category: "Fashion" },
  { id: "5", title: "Apple AirPods Pro 2nd Gen", brand: "Apple", price: 195000, category: "Electronics" },
  { id: "6", title: "Sony WH-1000XM5 Headphones", brand: "Sony", price: 145000, category: "Electronics" },
  { id: "7", title: "Puma RS-X Running Shoes", brand: "Puma", price: 65000, category: "Fashion" },
];

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = DUMMY_PRODUCTS[id] ?? DUMMY_PRODUCTS["1"];

  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans">

      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-[#f5f5f5]/80 backdrop-blur-md border-b border-gray-200/60">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-5 h-5 rounded-full border-[3px] border-blue-600" />
              <span className="text-xl font-bold text-gray-900 font-serif">Keriro</span>
            </Link>

            {/* Breadcrumb - hidden on tiny screens */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-gray-400">
              <FiChevronRight className="w-3 h-3" />
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <FiChevronRight className="w-3 h-3" />
              <span className="hover:text-blue-600 cursor-pointer transition-colors">{product.category}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/cart" className="relative flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-[10px] text-xs font-bold transition-colors shadow-sm">
              <FiShoppingCart className="w-3.5 h-3.5" />
              Cart
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">2</span>
            </Link>
            <div className="w-px h-4 bg-gray-200" />
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-semibold group"
            >
              <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back
            </Link>
          </div>

        </div>
      </header>

      <div className="w-full px-4 md:px-8 lg:px-12 py-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* ── Left: Images ── */}
          <div className="w-full lg:w-[500px] shrink-0 flex flex-col gap-3">
            {/* Main image */}
            <div className="bg-gray-100/80 p-1.5 rounded-[24px] border border-gray-200/50 shadow-sm">
              <div className="bg-white rounded-[18px] overflow-hidden relative aspect-square">
                <img
                  src={product.images[activeImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                {discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    -{discount}%
                  </div>
                )}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button
                    onClick={() => setWishlisted(!wishlisted)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center border shadow-sm transition-all ${wishlisted
                        ? "bg-red-50 border-red-200 text-red-500"
                        : "bg-white border-gray-200 text-gray-400 hover:text-red-500"
                      }`}
                  >
                    <FiHeart className={`w-4 h-4 ${wishlisted ? "fill-current" : ""}`} />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-gray-700 flex items-center justify-center shadow-sm transition-colors">
                    <FiShare2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`flex-1 aspect-square rounded-[14px] overflow-hidden border-2 transition-all ${activeImage === i ? "border-blue-500" : "border-gray-200/50 hover:border-gray-300"
                    }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: Info ── */}
          <div className="flex-1 flex flex-col gap-4">

            {/* Title & Rating */}
            <div className="bg-gray-100/80 p-1.5 rounded-[24px] border border-gray-200/50 shadow-sm">
              <div className="bg-white rounded-[18px] p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.brand}</span>
                    <h1 className="font-bold text-2xl text-gray-900 leading-tight mt-0.5">{product.title}</h1>
                  </div>
                  <div className="px-2.5 py-1 bg-blue-50 border border-blue-100 rounded-full shrink-0">
                    <span className="text-xs font-bold text-blue-700 uppercase">{product.category}</span>
                  </div>
                </div>

                {/* Rating row */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <FiStar key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? "text-amber-400 fill-current" : "text-gray-200"}`} />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-gray-800">{product.rating}</span>
                  <span className="text-sm text-gray-400">({product.reviews.toLocaleString()} reviews)</span>
                  <span className="text-sm text-gray-400">·</span>
                  <span className="text-sm text-gray-400">{product.sold.toLocaleString()} sold</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-3xl font-extrabold text-gray-900">₦{product.price.toLocaleString()}</span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-lg text-gray-400 line-through">₦{product.originalPrice.toLocaleString()}</span>
                      <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                        Save ₦{(product.originalPrice - product.price).toLocaleString()}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-xs text-gray-400">Price includes VAT. Free delivery on orders over ₦50,000</p>
              </div>
            </div>

            {/* Variants */}
            {product.variants.map((v) => (
              <div key={v.label} className="bg-gray-100/80 p-1.5 rounded-[24px] border border-gray-200/50 shadow-sm">
                <div className="bg-white rounded-[18px] p-5">
                  <p className="text-sm font-bold text-gray-900 mb-3">{v.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {v.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedVariants((prev) => ({ ...prev, [v.label]: opt }))}
                        className={`px-3.5 py-2 rounded-[10px] text-sm font-semibold border transition-all ${selectedVariants[v.label] === opt
                            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                            : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                          }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Qty & CTA */}
            <div className="bg-gray-100/80 p-1.5 rounded-[24px] border border-gray-200/50 shadow-sm">
              <div className="bg-white rounded-[18px] p-5">
                <div className="flex items-center gap-4 mb-4">
                  <p className="text-sm font-bold text-gray-900">Quantity</p>
                  <div className="flex items-center gap-1 bg-gray-100 rounded-[10px] p-1">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 rounded-[8px] hover:bg-white hover:shadow-sm flex items-center justify-center text-gray-600 transition-all border border-transparent hover:border-gray-200">
                      <span className="text-lg leading-none">−</span>
                    </button>
                    <span className="w-9 text-center text-sm font-bold text-gray-900">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="w-8 h-8 rounded-[8px] hover:bg-white hover:shadow-sm flex items-center justify-center text-gray-600 transition-all border border-transparent hover:border-gray-200">
                      <span className="text-lg leading-none">+</span>
                    </button>
                  </div>
                  <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                    In Stock
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 h-12 rounded-[12px] font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm ${cartAdded
                        ? "bg-green-500 text-white"
                        : "bg-gray-900 hover:bg-gray-800 text-white"
                      }`}
                  >
                    {cartAdded ? <><FiCheck className="w-4 h-4" /> Added to Cart!</> : <><FiShoppingCart className="w-4 h-4" /> Add to Cart</>}
                  </button>
                  <Link
                    href="/cart"
                    className="flex-1 h-12 rounded-[12px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    Buy Now <FiArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Bottom guarantee tags */}
              <div className="flex items-center gap-2 px-4 py-3">
                {[
                  { icon: FiTruck, text: "Free Delivery" },
                  { icon: FiShield, text: "Buyer Protection" },
                  { icon: FiRefreshCw, text: "30-day Returns" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/60 rounded-xl border border-gray-200/50 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]">
                    <Icon className="w-3 h-3 text-blue-500" />
                    <span className="text-[11px] font-semibold text-gray-600">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery info */}
            <div className="bg-gray-100/80 p-1.5 rounded-[24px] border border-gray-200/50 shadow-sm">
              <div className="bg-white rounded-[18px] p-5 flex flex-col gap-3">
                {[
                  { icon: FiMapPin, label: "Deliver to", value: "Lagos — Victoria Island" },
                  { icon: FiTruck, label: "Standard Delivery", value: "3–5 business days · Free on orders ≥₦50k" },
                  { icon: FiZap, label: "Express Delivery", value: "Next day delivery available · ₦1,500" },
                  { icon: FiPackage, label: "Sold by", value: `${product.brand} Official Store` },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-[8px] bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
                      <p className="text-xs font-semibold text-gray-700 mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Description & Features ── */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100/80 p-1.5 rounded-[24px] border border-gray-200/50 shadow-sm">
            <div className="bg-white rounded-[18px] p-6 h-full">
              <h2 className="font-bold text-lg text-gray-900 mb-3">Product Description</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          </div>
          <div className="bg-gray-100/80 p-1.5 rounded-[24px] border border-gray-200/50 shadow-sm">
            <div className="bg-white rounded-[18px] p-6">
              <h2 className="font-bold text-lg text-gray-900 mb-3">Key Features</h2>
              <div className="flex flex-col gap-2">
                {product.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                      <FiCheck className="w-3 h-3 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Related Products ── */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-2xl font-bold text-gray-900">Related Products</h2>
            <Link href="/" className="text-sm font-semibold text-blue-600 flex items-center gap-1 hover:text-blue-700">
              See all <FiChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {RELATED.map((rel) => (
              <Link
                key={rel.id}
                href={`/product/${rel.id}`}
                className="group bg-gray-100/80 p-1.5 rounded-[22px] border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <div className="bg-white rounded-[16px] overflow-hidden w-full aspect-square mb-0">
                  <img src="/images/hero-bg.png" alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3 pt-2.5">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{rel.brand}</p>
                  <p className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">{rel.title}</p>
                  <p className="text-base font-extrabold text-gray-900 mt-1">₦{rel.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
