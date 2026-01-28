import { TelegramResult } from "@/types/telegram";
import { motion } from "framer-motion";

export default function OfficialAccountPanel({
  account
}: {
  account: TelegramResult | null;
}) {
  if (!account) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6 border border-green-400/40"
    >
      <p className="text-xs text-green-300 mb-2">
        Verified Official Telegram Account
      </p>

      <h2 className="text-lg font-semibold">{account.name}</h2>
      <p className="text-xs text-gray-400">{account.username}</p>

      <p className="text-xs text-gray-300 mt-3">
        This account matches verified brand indicators and is classified as the
        legitimate official presence.
      </p>

      <a
        href={account.tme}
        target="_blank"
        className="inline-block mt-4 text-xs text-cyan-300 hover:underline"
      >
        Open Official Account →
      </a>
    </motion.div>
  );
}