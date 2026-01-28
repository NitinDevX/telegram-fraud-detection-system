"use client";
import { useState } from "react";
import { motion } from "framer-motion";

import BrandSearch from "@/components/BrandSearch";
import ChannelCard from "@/components/ChannelCard";
import EvidenceModal from "@/components/EvidenceModal";
import StatCards from "@/components/StatCards";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import RiskGraph from "@/components/RiskGraph";
import OfficialAccountPanel from "@/components/OfficialAccountCard";

import { scanBrand } from "@/lib/api";
import { saveScan } from "@/lib/history";
import { TelegramResult } from "@/types/telegram";

export default function Dashboard() {
  const [results, setResults] = useState<TelegramResult[]>([]);
  const [inspect, setInspect] = useState<TelegramResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleScan(brand: string) {
    if (!brand) return;
    setLoading(true);
    const data = await scanBrand(brand);
    setResults(data);
    saveScan(brand, data);
    setLoading(false);
  }

  const official = results.filter(
    r => r.verdict === "Official Legitimate Account"
  );
  const suspicious = results.filter(
    r => r.verdict === "Suspicious / Needs Review"
  );
  const fake = results.filter(
    r => r.verdict === "Likely Impersonation"
  );

  return (
    <>
      <Header />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 py-10 pt-24"
      >
        {/* Search */}
        <BrandSearch onScan={handleScan} />

        {/* Loading */}
        {loading && (
          <p className="text-cyan-300 text-sm mt-4">
            Running OSINT scan...
          </p>
        )}

        {results.length > 0 && (
          <>
            {/* Top Stat Cards */}
            <div className="mt-8">
              <StatCards
                total={results.length}
                official={official.length}
                suspicious={suspicious.length}
                fake={fake.length}
              />
            </div>

            {/* Risk Distribution Graph */}
            <div className="mt-6">
              <RiskGraph
                official={official.length}
                suspicious={suspicious.length}
                fake={fake.length}
              />
            </div>

            {/* Official Account Highlight */}
            <div className="mt-6">
              <OfficialAccountPanel account={official[0] || null} />
            </div>

            {/* All Other Channels */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {results
                .filter(r => r.verdict !== "Official Legitimate Account")
                .map((c, i) => (
                  <ChannelCard
                    key={i}
                    channel={c}
                    onInspect={setInspect}
                  />
                ))}
            </div>
          </>
        )}

        {/* Evidence Modal */}
        <EvidenceModal
          channel={inspect}
          onClose={() => setInspect(null)}
        />
      </motion.main>

      <Footer />
    </>
  );
}