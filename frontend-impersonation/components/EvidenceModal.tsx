"use client";
import { TelegramResult } from "@/types/telegram";
import { motion } from "framer-motion";

interface Props {
  channel: TelegramResult | null;
  onClose: () => void;
}

export default function EvidenceModal({ channel, onClose }: Props) {
  if (!channel) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="bg-[#0b0f1a] border border-cyan-400/40 rounded-xl p-6 w-[560px]"
      >
        {/* Header */}
        <div className="border-b border-white/10 pb-3 mb-4">
          <h2 className="text-lg font-semibold text-white">
            {channel.name}
          </h2>
          <p className="text-xs text-gray-400">
            {channel.username}
          </p>
        </div>

        {/* Verdict */}
        <div className="mb-4">
          <p className="text-xs text-gray-400">Final Assessment</p>
          <p className="text-sm font-semibold text-cyan-300">
            {channel.verdict}
          </p>
        </div>

        {/* Official Indicators */}
        {channel.officialReasons?.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-green-300 mb-2">
              Official Verification Indicators
            </p>
            <ul className="list-disc ml-4 text-xs text-gray-300 space-y-1">
              {channel.officialReasons.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Risk Indicators */}
        {channel.riskReasons?.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-red-300 mb-2">
              Impersonation Risk Indicators
            </p>
            <ul className="list-disc ml-4 text-xs text-gray-300 space-y-1">
              {channel.riskReasons.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Sample Message */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-cyan-200 mb-2">
            Observed Channel Message Sample
          </p>
          <div className="text-xs text-gray-300 bg-black/40 border border-white/10 rounded-md p-3 leading-relaxed">
            {channel.sampleMessage || "No recent messages were available for analysis."}
          </div>
        </div>

        {/* Detected Links */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-cyan-200 mb-2">
            External Links Detected
          </p>
          {channel.links.length === 0 ? (
            <p className="text-xs text-gray-500">
              No external links detected in recent messages.
            </p>
          ) : (
            <ul className="text-xs text-red-300 space-y-1">
              {channel.links.map((l, i) => (
                <li key={i} className="break-all">
                  {l}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center pt-3 border-t border-white/10">
          <a
            href={channel.tme}
            target="_blank"
            className="text-xs text-cyan-300 hover:underline"
          >
            Open Channel on Telegram →
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs rounded-md border border-white/20 hover:border-cyan-300 hover:text-cyan-200 transition"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}