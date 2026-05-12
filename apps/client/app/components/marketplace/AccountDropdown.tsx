"use client";

import { useState, useRef, useEffect } from "react";
import {
  FiUser, FiChevronDown, FiPackage, FiHeart, FiSettings,
  FiLogOut, FiShield, FiChevronRight, FiBriefcase, FiLogIn
} from "react-icons/fi";
import Link from "next/link";
import { useAuthStore } from "@/app/store/authStore";

const MENU_ITEMS = [
  { icon: FiPackage, label: "My Orders", badge: "3", href: "/orders" },
  { icon: FiHeart, label: "Wishlist", badge: null, href: null },
  { icon: FiBriefcase, label: "Seller Dashboard", badge: "New", href: "/dashboard" },
  { icon: FiSettings, label: "Account Settings", badge: null, href: null },
];

export default function AccountDropdown() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, user, logout } = useAuthStore();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={containerRef} className="relative hidden md:block">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-2 rounded-[10px] hover:bg-gray-100 transition-colors text-gray-700 font-medium border border-transparent hover:border-gray-200"
      >
        <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">
          {isAuthenticated ? (user?.firstName?.[0] || "U") : <FiUser className="w-3.5 h-3.5" />}
        </div>
        <span className="text-sm font-semibold text-gray-800">{isAuthenticated ? (user?.firstName || "Account") : "Account"}</span>
        <FiChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-[calc(100%+8px)] right-0 w-[280px] bg-white rounded-[16px] border border-gray-200/80 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.12)] z-[200] overflow-hidden">
          <div className="p-1">
            
            {/* Profile Header (Only if Authenticated) */}
            {isAuthenticated && (
              <div className="bg-[#f9f9f9] rounded-[12px] p-4 mb-1">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-lg font-bold shrink-0">
                    {user?.firstName?.[0] || "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{user?.firstName} {user?.lastName}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Menu Items */}
            <div className="py-1">
              {MENU_ITEMS.map(({ icon: Icon, label, badge, href }) => {
                const Component = href ? Link : "button";
                return (
                  <Component
                    key={label}
                    href={href as any}
                    onClick={() => setOpen(false)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] hover:bg-[#f9f9f9] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-[8px] bg-gray-100 group-hover:bg-white border border-transparent group-hover:border-gray-200 flex items-center justify-center transition-all shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]">
                      <Icon className="w-4 h-4 text-gray-500 group-hover:text-gray-800" />
                    </div>
                    <span className="flex-1 text-sm font-medium text-gray-700 group-hover:text-gray-900 text-left">{label}</span>
                    {badge ? (
                      <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{badge}</span>
                    ) : (
                      <FiChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                    )}
                  </Component>
                );
              })}
            </div>

            {/* Footer Action: Sign In or Sign Out */}
            <div className="border-t border-gray-100 mt-1 pt-1">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] hover:bg-red-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-[8px] bg-gray-100 group-hover:bg-red-100 border border-transparent flex items-center justify-center transition-all">
                    <FiLogOut className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                  </div>
                  <span className="text-sm font-medium text-gray-600 group-hover:text-red-600">Sign out</span>
                </button>
              ) : (
                <Link
                  href="/auth"
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] hover:bg-blue-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-[8px] bg-gray-100 group-hover:bg-blue-100 border border-transparent flex items-center justify-center transition-all">
                    <FiLogIn className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600">Sign in</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
