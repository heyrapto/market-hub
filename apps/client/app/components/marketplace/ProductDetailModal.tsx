"use client";

import { useEffect, useRef } from "react";
import {
  FiX, FiShoppingCart, FiArrowUpRight, FiEye, FiZap, FiShield,
  FiShare2, FiHeart, FiCheck
} from "react-icons/fi";
import { motion, AnimatePresence } from "motion/react";

interface Product {
  id: string;
  title: string;
  description?: string;
  price: number | string;
  imageUrl?: string;
}

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [product]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const FEATURES = [
    { icon: FiZap, label: "Instant Download", desc: "Access immediately after purchase" },
    { icon: FiShield, label: "Verified Seller", desc: "Identity & quality confirmed" },
    { icon: FiCheck, label: "License Included", desc: "Commercial use license" },
  ];

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[300] bg-black/20 backdrop-blur-[2px]"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="fixed inset-0 z-[301] flex items-center justify-center p-4 pointer-events-none"
          >
            {/* Card shell — outer gray, inner white (reference pattern) */}
            <div className="pointer-events-auto w-full max-w-[860px] bg-gray-100/90 p-1.5 rounded-[26px] border border-gray-200/60 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.15)]">
              <div className="bg-white rounded-[20px] overflow-hidden flex flex-col md:flex-row">

                {/* Left: Image */}
                <div className="md:w-[380px] shrink-0 relative bg-gray-50">
                  <img
                    src={product.imageUrl || "/images/hero-bg.png"}
                    alt={product.title}
                    className="w-full h-full object-cover min-h-[260px] md:min-h-0"
                  />
                  {/* Floating badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                    <span className="text-[10px] font-bold text-gray-900 uppercase tracking-tight">Software</span>
                  </div>
                  {/* Action pills */}
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <button className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-100 shadow-sm hover:bg-white transition-colors text-xs font-semibold text-gray-600">
                      <FiHeart className="w-3.5 h-3.5" /> Save
                    </button>
                    <button className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-100 shadow-sm hover:bg-white transition-colors text-xs font-semibold text-gray-600">
                      <FiShare2 className="w-3.5 h-3.5" /> Share
                    </button>
                  </div>
                </div>

                {/* Right: Info */}
                <div className="flex-1 flex flex-col p-6 relative">
                  {/* Close */}
                  <button
                    onClick={onClose}
                    className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors border border-gray-200"
                  >
                    <FiX className="w-4 h-4 text-gray-600" />
                  </button>

                  {/* Title + views */}
                  <div className="pr-10">
                    <h2 className="font-bold text-2xl text-gray-900 leading-tight mb-2">
                      {product.title}
                    </h2>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                        <FiEye className="w-3.5 h-3.5" /> 124 views
                      </span>
                      <span className="flex items-center gap-1 text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                        Active
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                      {product.description || "A premium digital asset crafted for modern developers and creators. Everything you need to ship faster and look great doing it."}
                    </p>
                  </div>

                  {/* Feature tags — nested card row */}
                  <div className="bg-gray-50 rounded-[14px] p-1 mb-6">
                    <div className="flex gap-1">
                      {FEATURES.map(({ icon: Icon, label, desc }) => (
                        <div
                          key={label}
                          className="flex-1 bg-white rounded-[10px] border border-gray-200/60 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] px-3 py-3"
                        >
                          <Icon className="w-4 h-4 text-blue-500 mb-1.5" />
                          <p className="text-[11px] font-bold text-gray-800 mb-0.5">{label}</p>
                          <p className="text-[10px] text-gray-400 leading-tight">{desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price + CTA */}
                  <div className="mt-auto">
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Price</span>
                        <span className="text-[32px] font-extrabold text-gray-900 leading-none">
                          ₦{Number(product.price).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">One-time purchase</p>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 h-12 rounded-[12px] bg-gray-900 hover:bg-blue-600 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm">
                        <FiShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                      <button className="h-12 px-5 rounded-[12px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                        Buy Now
                        <FiArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom tags */}
              <div className="flex items-center gap-2 px-4 py-3">
                {["Instant Download", "Commercial License", "Free Updates"].map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/70 rounded-xl border border-gray-200/50 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]"
                  >
                    <FiCheck className="w-3 h-3 text-green-500" />
                    <span className="text-[11px] font-semibold text-gray-600">{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
