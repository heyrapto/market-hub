"use client";

import { motion } from "motion/react";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#fdfaf5]">
      <div className="relative w-12 h-12">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-0 w-1.5 h-3.5 bg-gray-900 rounded-full origin-[center_24px]"
            style={{
              rotate: i * 45,
              opacity: 0.15,
            }}
            animate={{
              opacity: [0.15, 1, 0.15],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  );
}
