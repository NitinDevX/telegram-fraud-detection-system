"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function BrandSearch({ onScan }: { onScan: (b: string)=>void }) {
  const [brand, setBrand] = useState("");

  return (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center gap-5"
  >
    {/* Search Input */}
    <input
      value={brand}
      onChange={(e)=>setBrand(e.target.value)}
      placeholder="Enter brand name..."
      onKeyDown={(e)=> e.key==="Enter" && onScan(brand)}
      className="
        bg-[#070b14]
        border border-white/10
        text-gray-200
        placeholder:text-gray-500
        px-5 py-3 rounded-xl
        text-sm w-80 outline-none
        focus:border-cyan-400/60
        focus:shadow-[0_0_12px_rgba(34,211,238,0.3)]
      "
    />

    {/* Centered Button */}
    <div className="flex justify-center w-full">
      <button
        onClick={()=>onScan(brand)}
        className="
          px-6 py-3 rounded-xl text-sm font-semibold
          bg-[#101826]
          border border-cyan-400/40
          text-cyan-200
          transition
          hover:bg-cyan-400/10
          hover:border-cyan-300
          hover:text-cyan-100
          hover:shadow-[0_0_14px_rgba(34,211,238,0.25)]
        "
      >
        Run Intelligence Scan
      </button>
    </div>
  </motion.div>
);
}