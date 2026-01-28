"use client";

import { TelegramResult } from "@/types/telegram";

interface Props {
  results: TelegramResult[];
}

export default function OsintIndicators({ results }: Props) {
  const telegramFindings = results.length;

  // Placeholder for future integrations
  const twitterCheck = "Not Checked";
  const instagramCheck = "Not Checked";
  const websiteCheck = results.some(r => r.links.length > 0)
    ? "Suspicious External Links Found"
    : "No External Links";

  return (
    <div className="bg-[#0b0b1a]/80 border border-white/10 rounded-2xl p-6 mt-6">
      <h2 className="text-lg text-gray-400 mb-4">OSINT Correlation Indicators</h2>

      <table className="w-full text-sm">
        <tbody className="space-y-3">

          <tr>
            <td className="text-gray-400">Telegram Entities Discovered</td>
            <td className="text-cyan-300 font-semibold">{telegramFindings}</td>
          </tr>

          <tr>
            <td className="text-gray-400">External Links Presence</td>
            <td className="text-yellow-300 font-semibold">{websiteCheck}</td>
          </tr>

          <tr>
            <td className="text-gray-400">Twitter Account Match</td>
            <td className="text-gray-500">{twitterCheck}</td>
          </tr>

          <tr>
            <td className="text-gray-400">Instagram Account Match</td>
            <td className="text-gray-500">{instagramCheck}</td>
          </tr>

          <tr>
            <td className="text-gray-400">Official Domain Verified</td>
            <td className="text-gray-500">Not Checked</td>
          </tr>

        </tbody>
      </table>
    </div>
  );
}