"use client";
import { TelegramResult } from "@/types/telegram";
import { motion } from "framer-motion";

export default function ChannelCard({ channel, onInspect }:{
  channel: TelegramResult;
  onInspect:(c:TelegramResult)=>void;
}) {

  const badge =
    channel.verdict === "Official Legitimate Account"
      ? "badge-official"
      : channel.verdict === "Likely Impersonation"
      ? "badge-fake"
      : "badge-suspicious";

  return (
    <motion.div
      whileHover={{ y:-4 }}
      transition={{ type:"spring", stiffness:300, damping:20 }}
      className="card p-5"
    >
      <h3 className="font-semibold">{channel.name}</h3>
      <p className="text-xs text-gray-400">{channel.username}</p>

      <div className={`mt-3 inline-block px-3 py-1 text-xs rounded-full ${badge}`}>
        {channel.verdict}
      </div>

      <p className="text-xs text-gray-500 mt-2">Risk: {channel.risk}%</p>

      <button
        onClick={()=>onInspect(channel)}
        className="text-cyan-300 text-xs mt-3"
      >
        View Evidence →
      </button>
    </motion.div>
  );
}