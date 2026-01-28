"use client";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="
        fixed top-0 left-0 right-0 z-40
        bg-[#050505]/90 backdrop-blur
        border-b border-white/10
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo / Title */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse" />
          <h1 className="text-sm font-semibold tracking-wide text-cyan-200">
            TELEGRAM FRAUD DETECTION SYSTEM
          </h1>
        </div>

        {/* Navigation */}
        <nav className="text-xs text-gray-400 flex gap-6">
          <a href="/" className="hover:text-cyan-300 transition">
            Dashboard
          </a>
          <a href="/reports" className="hover:text-cyan-300 transition">
            Reports
          </a>
        </nav>
      </div>
    </motion.header>
  );
}