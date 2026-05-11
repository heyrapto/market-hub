"use client";

import { useEffect, useRef } from "react";
import { FiX, FiImage, FiTag, FiDollarSign, FiBox, FiCheck } from "react-icons/fi";
import { motion, AnimatePresence } from "motion/react";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: any) => void;
}

export default function AddProductModal({ isOpen, onClose, onAdd }: AddProductModalProps) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy submission
    onAdd({
      id: "PROD-" + Math.floor(Math.random() * 10000),
      title: "New Product",
      price: 5000,
      quantity: 10,
      category: "Electronics",
      image: "/images/hero-bg.png",
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[300] bg-black/20 backdrop-blur-[2px]"
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="fixed inset-0 z-[301] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-[600px] bg-gray-100/90 p-1.5 rounded-[26px] border border-gray-200/60 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.15)] max-h-[90vh] overflow-y-auto">
              <div className="bg-white rounded-[20px] p-6 relative flex flex-col">
                
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors border border-gray-200"
                >
                  <FiX className="w-4 h-4 text-gray-600" />
                </button>

                <div className="mb-6">
                  <h2 className="font-bold text-2xl text-gray-900 leading-tight">List a Product</h2>
                  <p className="text-gray-500 text-sm mt-1">Add a new item to your marketplace storefront.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Image Upload placeholder */}
                  <div className="bg-gray-50 p-6 rounded-[16px] border border-dashed border-gray-300 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 transition-colors">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                      <FiImage className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-sm font-bold text-gray-700">Click to upload product image</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                  </div>

                  {/* Basic Info */}
                  <div className="bg-gray-50 p-4 rounded-[16px] border border-gray-100">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 mb-4">
                      <FiTag className="w-3.5 h-3.5" /> Basic Details
                    </p>
                    <div className="flex flex-col gap-3">
                      <div>
                        <label className="text-xs font-semibold text-gray-700 block mb-1.5 ml-1">Product Title</label>
                        <input required type="text" placeholder="e.g. Nike Air Max 270" className="w-full h-11 px-4 bg-white border border-gray-200 rounded-[12px] text-sm focus:outline-none focus:border-blue-400 transition-colors" />
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-1">
                          <label className="text-xs font-semibold text-gray-700 block mb-1.5 ml-1">Category</label>
                          <select className="w-full h-11 px-4 bg-white border border-gray-200 rounded-[12px] text-sm focus:outline-none focus:border-blue-400 transition-colors appearance-none">
                            <option>Electronics</option>
                            <option>Fashion</option>
                            <option>Home & Living</option>
                            <option>Beauty</option>
                          </select>
                        </div>
                        <div className="flex-1">
                          <label className="text-xs font-semibold text-gray-700 block mb-1.5 ml-1">Condition</label>
                          <select className="w-full h-11 px-4 bg-white border border-gray-200 rounded-[12px] text-sm focus:outline-none focus:border-blue-400 transition-colors appearance-none">
                            <option>New</option>
                            <option>Used - Like New</option>
                            <option>Used - Good</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Inventory */}
                  <div className="bg-gray-50 p-4 rounded-[16px] border border-gray-100">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 mb-4">
                      <FiDollarSign className="w-3.5 h-3.5" /> Pricing & Inventory
                    </p>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="text-xs font-semibold text-gray-700 block mb-1.5 ml-1">Price (₦)</label>
                        <input required type="number" placeholder="0.00" min={0} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-[12px] text-sm focus:outline-none focus:border-blue-400 transition-colors" />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs font-semibold text-gray-700 block mb-1.5 ml-1">Quantity</label>
                        <input required type="number" defaultValue={1} min={1} className="w-full h-11 px-4 bg-white border border-gray-200 rounded-[12px] text-sm focus:outline-none focus:border-blue-400 transition-colors" />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1.5 ml-1">Description</label>
                    <textarea rows={3} placeholder="Describe your product..." className="w-full p-4 bg-gray-50 border border-gray-200 rounded-[12px] text-sm focus:outline-none focus:border-blue-400 transition-colors focus:bg-white resize-none" />
                  </div>

                  <div className="flex gap-3 mt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 h-12 rounded-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm transition-colors border border-gray-200 flex items-center justify-center"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 h-12 rounded-[12px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
                    >
                      <FiCheck className="w-4 h-4" />
                      Publish Listing
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
