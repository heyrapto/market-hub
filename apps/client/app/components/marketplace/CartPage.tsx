"use client";

import { useState } from "react";
import {
  FiArrowLeft, FiTrash2, FiPlus, FiMinus, FiTag,
  FiTruck, FiShield, FiRefreshCw, FiMapPin, FiChevronRight,
  FiArrowUpRight, FiCheck
} from "react-icons/fi";

/* ── Dummy cart items for UI purposes ── */
const DUMMY_ITEMS = [
  {
    id: "1",
    title: "Nike Air Max 270",
    brand: "Nike",
    variant: "Black / Size 42",
    price: 85000,
    originalPrice: 110000,
    quantity: 1,
    image: "/images/hero-bg.png",
    inStock: true,
  },
  {
    id: "2",
    title: "Samsung 55″ QLED Smart TV",
    brand: "Samsung",
    variant: "55 inch / 4K",
    price: 420000,
    originalPrice: 480000,
    quantity: 1,
    image: "/images/hero-bg.png",
    inStock: true,
  },
  {
    id: "3",
    title: "Portable Bluetooth Speaker",
    brand: "JBL",
    variant: "Blue",
    price: 32000,
    originalPrice: 32000,
    quantity: 2,
    image: "/images/hero-bg.png",
    inStock: false,
  },
];

const GUARANTEES = [
  { icon: FiTruck, label: "Free Delivery", desc: "On orders over ₦50,000" },
  { icon: FiShield, label: "Buyer Protection", desc: "100% secure checkout" },
  { icon: FiRefreshCw, label: "Easy Returns", desc: "30-day return policy" },
];

export default function CartPage() {
  const [items, setItems] = useState(DUMMY_ITEMS);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((item) => item.id !== id));

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const savings = items.reduce(
    (acc, item) => acc + (item.originalPrice - item.price) * item.quantity, 0
  );
  const delivery = subtotal >= 50000 ? 0 : 3000;
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + delivery - discount;

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans">

      {/* ── Sticky mini header ── */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="w-full px-4 md:px-8 lg:px-12 h-16 flex items-center gap-4">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium group">
            <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Continue Shopping
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <div className="w-5 h-5 rounded-full border-[3px] border-blue-600"></div>
            <span className="text-xl font-bold text-gray-900 font-serif">Keriro</span>
          </div>
        </div>
      </div>

      <div className="w-full px-4 md:px-8 lg:px-12 py-8">

        {/* Page title */}
        <div className="mb-6">
          <h1 className="font-serif text-3xl font-bold text-gray-900">
            My Cart
          </h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} items in your cart</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* ── Left: Cart Items ── */}
          <div className="flex-1 flex flex-col gap-4">

            {/* Out of stock warning */}
            {items.some((i) => !i.inStock) && (
              <div className="bg-amber-50 border border-amber-200 rounded-[16px] p-4 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white text-[10px] font-bold">!</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-amber-800">Some items are out of stock</p>
                  <p className="text-xs text-amber-600 mt-0.5">Remove them or save for later before placing your order.</p>
                </div>
              </div>
            )}

            {items.map((item) => (
              <div
                key={item.id}
                className={`bg-gray-100/80 p-1.5 rounded-[24px] border shadow-sm transition-all ${
                  item.inStock ? "border-gray-200/50" : "border-amber-200/60"
                }`}
              >
                <div className="bg-white rounded-[18px] overflow-hidden shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
                  <div className="flex gap-0">
                    {/* Image */}
                    <div className="w-36 h-36 shrink-0 bg-gray-50 relative overflow-hidden rounded-l-[18px]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                          <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">Out of Stock</span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 p-4 flex flex-col">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.brand}</span>
                          <h3 className="text-gray-900 font-bold text-base leading-tight line-clamp-1">{item.title}</h3>
                          <p className="text-xs text-gray-500 mt-0.5">{item.variant}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-8 h-8 rounded-full hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shrink-0 border border-transparent hover:border-red-100"
                        >
                          <FiTrash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        {/* Price */}
                        <div className="flex items-baseline gap-2">
                          <span className="text-gray-900 font-extrabold text-lg">
                            ₦{(item.price * item.quantity).toLocaleString()}
                          </span>
                          {item.originalPrice > item.price && (
                            <span className="text-gray-400 text-sm line-through">
                              ₦{item.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-1 bg-gray-100 rounded-[10px] p-1">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-7 h-7 rounded-[8px] hover:bg-white hover:shadow-sm flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all border border-transparent hover:border-gray-200"
                          >
                            <FiMinus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-sm font-bold text-gray-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-7 h-7 rounded-[8px] hover:bg-white hover:shadow-sm flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all border border-transparent hover:border-gray-200"
                          >
                            <FiPlus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Savings badge */}
                {item.originalPrice > item.price && (
                  <div className="flex items-center gap-2 px-4 py-2.5">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 rounded-lg border border-green-100">
                      <FiTag className="w-3 h-3 text-green-600" />
                      <span className="text-[11px] font-bold text-green-700">
                        You save ₦{((item.originalPrice - item.price) * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Guarantees row */}
            <div className="bg-gray-100/80 p-1.5 rounded-[24px] border border-gray-200/50 shadow-sm">
              <div className="bg-white rounded-[18px] p-4">
                <div className="flex items-center gap-4">
                  {GUARANTEES.map(({ icon: Icon, label, desc }) => (
                    <div key={label} className="flex-1 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-[10px] bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-800">{label}</p>
                        <p className="text-[10px] text-gray-400">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Order Summary ── */}
          <div className="w-full lg:w-[380px] shrink-0 flex flex-col gap-4">

            {/* Delivery address */}
            <div className="bg-gray-100/80 p-1.5 rounded-[24px] border border-gray-200/50 shadow-sm">
              <div className="bg-white rounded-[18px] p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-bold text-gray-900">Delivery Address</p>
                  <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">Change</button>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-[8px] bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                    <FiMapPin className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Keriro User</p>
                    <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
                      12 Marina Road, Victoria Island,<br />Lagos State, Nigeria
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary card */}
            <div className="bg-gray-100/80 p-1.5 rounded-[24px] border border-gray-200/50 shadow-sm">
              <div className="bg-white rounded-[18px] p-4">
                <p className="text-sm font-bold text-gray-900 mb-4">Order Summary</p>

                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Subtotal ({items.length} items)</span>
                    <span className="text-sm font-semibold text-gray-900">₦{subtotal.toLocaleString()}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-600">Savings</span>
                      <span className="text-sm font-semibold text-green-600">- ₦{savings.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Delivery</span>
                    <span className={`text-sm font-semibold ${delivery === 0 ? "text-green-600" : "text-gray-900"}`}>
                      {delivery === 0 ? "Free" : `₦${delivery.toLocaleString()}`}
                    </span>
                  </div>
                  {couponApplied && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-600">Coupon (10%)</span>
                      <span className="text-sm font-semibold text-blue-600">- ₦{discount.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="my-4 border-t border-dashed border-gray-100" />

                <div className="flex items-center justify-between mb-5">
                  <span className="text-base font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-extrabold text-gray-900">₦{total.toLocaleString()}</span>
                </div>

                {/* Coupon input */}
                <div className="bg-gray-50 rounded-[12px] p-1 mb-4">
                  <div className="flex gap-1">
                    <div className="relative flex-1">
                      <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Coupon code"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        disabled={couponApplied}
                        className="w-full h-9 pl-8 pr-3 bg-white rounded-[10px] border border-gray-200 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-blue-300 transition-colors disabled:opacity-50"
                      />
                    </div>
                    <button
                      onClick={() => coupon.trim() && setCouponApplied(!couponApplied)}
                      className={`h-9 px-3 rounded-[10px] text-xs font-bold transition-colors shrink-0 flex items-center gap-1 ${
                        couponApplied
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-gray-900 text-white hover:bg-blue-600"
                      }`}
                    >
                      {couponApplied ? <><FiCheck className="w-3 h-3" /> Applied</> : "Apply"}
                    </button>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button className="w-full h-12 rounded-[12px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm">
                  Proceed to Checkout
                  <FiArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Related / You may also like */}
            <div className="bg-gray-100/80 p-1.5 rounded-[24px] border border-gray-200/50 shadow-sm">
              <div className="bg-white rounded-[18px] p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-bold text-gray-900">You may also like</p>
                  <button className="text-xs text-blue-600 font-semibold flex items-center gap-1 hover:text-blue-700">
                    See all <FiChevronRight className="w-3 h-3" />
                  </button>
                </div>
                {[
                  { title: "Apple AirPods Pro", price: 195000, brand: "Apple" },
                  { title: "Hisense 43″ LED TV", price: 215000, brand: "Hisense" },
                ].map((rec) => (
                  <div key={rec.title} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0 cursor-pointer group">
                    <div className="w-12 h-12 rounded-[10px] bg-gray-100 shrink-0 overflow-hidden">
                      <img src="/images/hero-bg.png" alt={rec.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{rec.brand}</p>
                      <p className="text-xs font-semibold text-gray-800 truncate">{rec.title}</p>
                    </div>
                    <span className="text-sm font-extrabold text-gray-900 shrink-0">₦{rec.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
