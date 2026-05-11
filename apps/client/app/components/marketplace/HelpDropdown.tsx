"use client";

import { useState, useRef, useEffect } from "react";
import {
  FiInfo, FiChevronDown, FiShoppingBag, FiXCircle,
  FiMapPin, FiChevronRight, FiMessageCircle
} from "react-icons/fi";
import Link from "next/link";

const HELP_ITEMS = [
  {
    icon: FiShoppingBag,
    label: "Place an Order",
    desc: "Learn how to buy on Keriro",
    href: "/cart",
  },
  {
    icon: FiMapPin,
    label: "Track an Order",
    desc: "Check your delivery status",
    href: "/orders",
  },
  {
    icon: FiXCircle,
    label: "Cancel an Order",
    desc: "Request a cancellation",
    href: "/orders",
  },
];

export default function HelpDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative hidden lg:block">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-2 rounded-[10px] hover:bg-gray-100 transition-colors text-gray-700 font-medium border border-transparent hover:border-gray-200 text-sm"
      >
        <FiInfo className="w-5 h-5" />
        Help
        <FiChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-[calc(100%+8px)] right-0 w-[260px] bg-white rounded-[16px] border border-gray-200/80 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.12)] z-[200] overflow-hidden">
          <div className="p-1">
            {/* Header card */}
            <div className="bg-[#f9f9f9] rounded-[12px] px-4 py-3 mb-1">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Help Centre</p>
              <p className="text-sm text-gray-700 mt-0.5 font-medium">How can we help you today?</p>
            </div>

            {/* Menu items */}
            <div className="py-1">
              {HELP_ITEMS.map(({ icon: Icon, label, desc, href }) => {
                const Component = href ? Link : "button";
                return (
                  <Component
                    key={label}
                    href={href as any}
                    onClick={() => setOpen(false)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] hover:bg-[#f9f9f9] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-[8px] bg-gray-100 group-hover:bg-white border border-transparent group-hover:border-gray-200 flex items-center justify-center transition-all shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] shrink-0">
                      <Icon className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-gray-900">{label}</p>
                      <p className="text-[11px] text-gray-400 truncate">{desc}</p>
                    </div>
                    <FiChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" />
                  </Component>
                );
              })}
            </div>

            {/* Footer — live chat CTA */}
            <div className="border-t border-gray-100 mt-1 pt-1">
              <button
                onClick={() => setOpen(false)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] hover:bg-blue-50 transition-colors group"
              >
                <div className="w-8 h-8 rounded-[8px] bg-blue-50 group-hover:bg-blue-100 border border-blue-100 flex items-center justify-center transition-all shrink-0">
                  <FiMessageCircle className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                  Chat with Support
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
