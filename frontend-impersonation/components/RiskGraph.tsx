"use client";
import { motion } from "framer-motion";

export default function RiskGraph({
  official,
  suspicious,
  fake
}: {
  official: number;
  suspicious: number;
  fake: number;
}) {
  const total = official + suspicious + fake || 1;

  const officialPct = (official / total) * 100;
  const suspiciousPct = (suspicious / total) * 100;
  const fakePct = (fake / total) * 100;

  return (
    <div className="card p-6">
      <h3 className="text-sm text-gray-300 mb-4">
        Risk Distribution Overview
      </h3>

      <div className="space-y-4 text-xs">

        {/* Official */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-green-400">Official</span>
            <span className="text-gray-400">{official}</span>
          </div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${officialPct}%` }}
            transition={{ duration: 0.6 }}
            className="h-2 rounded bg-green-500/60"
          />
        </div>

        {/* Suspicious */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-yellow-300">Suspicious</span>
            <span className="text-gray-400">{suspicious}</span>
          </div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${suspiciousPct}%` }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="h-2 rounded bg-yellow-400/60"
          />
        </div>

        {/* Fake */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-red-400">Impersonation</span>
            <span className="text-gray-400">{fake}</span>
          </div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${fakePct}%` }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-2 rounded bg-red-500/70"
          />
        </div>

      </div>
    </div>
  );
}