"use client";

import { useEffect, useRef } from "react";
import { FiX, FiPackage, FiMapPin, FiCreditCard } from "react-icons/fi";
import { motion, AnimatePresence } from "motion/react";

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateOrderModal({ isOpen, onClose }: CreateOrderModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
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

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="fixed inset-0 z-[301] flex items-center justify-center p-4 pointer-events-none"
          >
            {/* Outer double-layered card */}
            <div className="pointer-events-auto w-full max-w-[600px] bg-gray-100/90 p-1.5 rounded-[26px] border border-gray-200/60 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.15)]">
              <div className="bg-white rounded-[20px] p-6 relative flex flex-col">
                
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors border border-gray-200"
                >
                  <FiX className="w-4 h-4 text-gray-600" />
                </button>

                <div className="mb-6">
                  <h2 className="font-bold text-2xl text-gray-900 leading-tight">Create Order</h2>
                  <p className="text-gray-500 text-sm mt-1">Fill in the details to manually place a new order.</p>
                </div>

                <form className="flex flex-col gap-5">
                  {/* Item Details */}
                  <div className="bg-gray-50 p-4 rounded-[16px] border border-gray-100">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 mb-4">
                      <FiPackage className="w-3.5 h-3.5" /> Item Details
                    </p>
                    <div className="flex flex-col gap-3">
                      <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-1.5">Product Link or ID</label>
                        <input type="text" placeholder="e.g. KER-9382 or URL" className="w-full h-11 px-4 bg-white border border-gray-200 rounded-[12px] text-sm focus:outline-none focus:border-blue-400 transition-colors" />
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-1">
                          <label className="text-sm font-semibold text-gray-700 block mb-1.5">Quantity</label>
                          <input type="number" defaultValue={1} min={1} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-[12px] text-sm focus:outline-none focus:border-blue-400 transition-colors" />
                        </div>
                        <div className="flex-1">
                          <label className="text-sm font-semibold text-gray-700 block mb-1.5">Price Target (₦)</label>
                          <input type="number" placeholder="Optional" className="w-full h-11 px-4 bg-white border border-gray-200 rounded-[12px] text-sm focus:outline-none focus:border-blue-400 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="bg-gray-50 p-4 rounded-[16px] border border-gray-100">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 mb-4">
                      <FiMapPin className="w-3.5 h-3.5" /> Shipping Address
                    </p>
                    <div className="flex flex-col gap-3">
                      <input type="text" placeholder="Full Name" className="w-full h-11 px-4 bg-white border border-gray-200 rounded-[12px] text-sm focus:outline-none focus:border-blue-400 transition-colors" />
                      <input type="text" placeholder="Street Address" className="w-full h-11 px-4 bg-white border border-gray-200 rounded-[12px] text-sm focus:outline-none focus:border-blue-400 transition-colors" />
                      <div className="flex gap-3">
                        <input type="text" placeholder="City" className="w-full h-11 px-4 bg-white border border-gray-200 rounded-[12px] text-sm focus:outline-none focus:border-blue-400 transition-colors flex-1" />
                        <input type="text" placeholder="State" className="w-full h-11 px-4 bg-white border border-gray-200 rounded-[12px] text-sm focus:outline-none focus:border-blue-400 transition-colors flex-1" />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 h-12 rounded-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm transition-colors border border-gray-200 flex items-center justify-center"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 h-12 rounded-[12px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
                    >
                      <FiCreditCard className="w-4 h-4" />
                      Proceed to Pay
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
