"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowLeft, FiMail, FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import { MotionHighlight, MotionHighlightItem } from "@/app/components/ui/motion-highlight";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#f5f5f5] font-sans flex flex-col">

      {/* ── Header ── */}
      <header className="sticky top-0 z-20 w-full bg-[#f5f5f5]/80 backdrop-blur-md border-b border-gray-200/60">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">

          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full border-[3px] border-blue-600" />
            <span className="text-xl font-bold text-gray-900 font-serif">Keriro</span>
          </Link>

          {/* Right: Back */}
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-semibold group"
          >
            <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </Link>

        </div>
      </header>

      {/* ── Page body ── */}
      <div className="flex-1 w-full flex flex-col items-center justify-center p-4">

        {/* Main Auth Card */}
        <div className="w-full max-w-[440px] bg-gray-100/80 p-1.5 rounded-[26px] border border-gray-200/50 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.1)]">
          <div className="bg-white rounded-[20px] p-6 sm:p-8 flex flex-col">

            <div className="text-center mb-6">
              <h1 className="font-serif text-2xl font-bold text-gray-900 leading-tight">
                Welcome to Keriro
              </h1>
              <p className="text-sm text-gray-500 mt-1.5">
                {activeTab === "Login" ? "Sign in to access your account" : "Create an account to start shopping"}
              </p>
            </div>

            {/* Tabs */}
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-1 mb-8">
              <MotionHighlight
                mode="parent"
                controlledItems={true}
                value={activeTab}
                onValueChange={(val) => val && setActiveTab(val)}
                className="bg-white rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.05)] border border-gray-100"
                containerClassName="flex items-center gap-1 w-full"
              >
                {["Login", "Register"].map((tab) => (
                  <MotionHighlightItem
                    key={tab}
                    value={tab}
                    className="flex-1 text-center py-2.5 rounded-xl font-bold text-sm transition-colors cursor-pointer relative z-10"
                  >
                    <span className={activeTab === tab ? "text-gray-900" : "text-gray-500 hover:text-gray-700"}>
                      {tab}
                    </span>
                  </MotionHighlightItem>
                ))}
              </MotionHighlight>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-4">
              {activeTab === "Register" && (
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5 ml-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full h-12 pl-11 pr-4 bg-gray-50 border border-gray-200 rounded-[14px] text-sm focus:bg-white focus:outline-none focus:border-blue-500 transition-all font-medium text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1.5 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="w-full h-12 pl-11 pr-4 bg-gray-50 border border-gray-200 rounded-[14px] text-sm focus:bg-white focus:outline-none focus:border-blue-500 transition-all font-medium text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5 ml-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full h-12 pl-11 pr-11 bg-gray-50 border border-gray-200 rounded-[14px] text-sm focus:bg-white focus:outline-none focus:border-blue-500 transition-all font-medium text-gray-900 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="w-full h-12 mt-2 rounded-[14px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-sm shadow-blue-600/20 active:scale-[0.98]"
              >
                {activeTab === "Login" ? "Sign In" : "Create Account"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-100"></div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Or continue with</span>
              <div className="flex-1 h-px bg-gray-100"></div>
            </div>

            {/* Google SSO */}
            <button
              type="button"
              className="w-full h-12 rounded-[14px] bg-white hover:bg-gray-50 text-gray-700 font-bold text-sm transition-all border border-gray-200 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Google
            </button>

          </div>
        </div>

        {/* Footer text */}
        <p className="mt-8 text-xs text-gray-400 font-medium text-center max-w-[300px]">
          By proceeding, you agree to Keriro's <Link href="#" className="text-gray-600 hover:text-gray-900 underline underline-offset-2">Terms of Service</Link> and <Link href="#" className="text-gray-600 hover:text-gray-900 underline underline-offset-2">Privacy Policy</Link>.
        </p>

      </div>
    </div>
  );
}