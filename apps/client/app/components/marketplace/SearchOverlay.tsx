"use client";

import { useState, useRef, useEffect } from "react";
import { FiSearch, FiTrendingUp, FiClock, FiArrowUpRight, FiX } from "react-icons/fi";

const TRENDING = ["UI Kit Pro", "Next.js Templates", "Icon Pack", "Framer Components", "Tailwind Dashboard"];
const CATEGORIES = ["Software", "UI Kits", "Templates", "Icons", "Mockups", "Themes"];
const RECENT = ["React dashboard", "Logo pack", "Figma mockups"];

interface SearchOverlayProps {
  onSearch?: (query: string) => void;
}

export default function SearchOverlay({ onSearch }: SearchOverlayProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleFocus = () => setOpen(true);
  const handleSearch = (val?: string) => {
    const q = val ?? query;
    onSearch?.(q);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative flex-1 flex">
      {/* Search Input */}
      <div className="relative w-full flex items-center">
        <FiSearch className="absolute left-4 text-gray-400 w-5 h-5 z-10" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search products, brands and categories"
          className="w-full h-12 pl-12 pr-4 border border-gray-200 border-r-0 rounded-l-[10px] focus:outline-none focus:border-blue-400 text-gray-900 placeholder-gray-400 text-sm bg-[#f9f9f9] transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>
      <button
        onClick={() => handleSearch()}
        className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-r-[10px] transition-colors shadow-sm text-sm shrink-0"
      >
        Search
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white rounded-[16px] border border-gray-200/80 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.12)] z-[200] overflow-hidden">
          {/* Inner wrapper — mirrors the reference's nested card feel */}
          <div className="p-1">
            <div className="bg-[#f9f9f9] rounded-[12px] p-4">

              {!query ? (
                <div className="flex gap-6">
                  {/* Trending */}
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      <FiTrendingUp className="w-3 h-3" /> Trending
                    </p>
                    <div className="flex flex-col gap-1">
                      {TRENDING.map((item) => (
                        <button
                          key={item}
                          onClick={() => { setQuery(item); handleSearch(item); }}
                          className="flex items-center justify-between group px-3 py-2 rounded-[8px] hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-sm transition-all text-left"
                        >
                          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{item}</span>
                          <FiArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-px bg-gray-200" />

                  {/* Right column */}
                  <div className="w-[200px] flex flex-col gap-5">
                    {/* Recent */}
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                        <FiClock className="w-3 h-3" /> Recent
                      </p>
                      <div className="flex flex-col gap-1">
                        {RECENT.map((item) => (
                          <button
                            key={item}
                            onClick={() => { setQuery(item); handleSearch(item); }}
                            className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-[8px] hover:bg-white text-left transition-colors"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Categories */}
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Browse</p>
                      <div className="flex flex-wrap gap-1.5">
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => handleSearch(cat)}
                            className="px-2.5 py-1 bg-white rounded-[8px] border border-gray-200 text-xs font-semibold text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-colors shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]"
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Suggestions</p>
                  <div className="flex flex-col gap-1">
                    {TRENDING.filter(t => t.toLowerCase().includes(query.toLowerCase())).length > 0
                      ? TRENDING.filter(t => t.toLowerCase().includes(query.toLowerCase())).map((item) => (
                        <button
                          key={item}
                          onClick={() => { setQuery(item); handleSearch(item); }}
                          className="flex items-center justify-between group px-3 py-2 rounded-[8px] hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-sm transition-all text-left"
                        >
                          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                            {item}
                          </span>
                          <FiArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                        </button>
                      ))
                      : (
                        <p className="text-sm text-gray-500 px-3 py-2">Press Enter to search for &ldquo;{query}&rdquo;</p>
                      )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
