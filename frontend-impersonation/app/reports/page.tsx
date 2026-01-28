"use client";

import { useEffect, useState } from "react";
import { loadHistory, ScanHistory } from "@/lib/history";
import { generatePDF } from "@/lib/report";
import Header from "../../components/Header";

export default function ReportsPage() {
  const [history, setHistory] = useState<ScanHistory[]>([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  function downloadReport(scan: ScanHistory) {
    generatePDF(scan);
}

  return (
    <div className="min-h-screen bg-[#050510] text-gray-200 px-6 py-10">
      <Header />
      <br></br>
      <br></br>
      <h1 className="text-3xl font-bold Welcome-text mb-6">
        Investigation Reports
      </h1>

      {history.length === 0 && (
        <p className="text-gray-400 text-sm">No scans recorded yet.</p>
      )}

      <div className="space-y-4">
        {history.map((h, i) => (
          <div key={i} className="bg-[#0b0b1a]/80 border border-white/10 rounded-xl p-5 flex justify-between items-center">
            <div>
              <p className="font-semibold">{h.brand}</p>
              <p className="text-xs text-gray-400">
                {new Date(h.timestamp).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">
                Entities Found: {h.results.length}
              </p>
            </div>

            <button
              onClick={() => downloadReport(h)}
              className="button-primary px-4 py-2 rounded text-xs"
            >
              Download Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}