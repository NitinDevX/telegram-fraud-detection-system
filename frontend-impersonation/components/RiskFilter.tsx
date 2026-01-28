"use client";

interface Props {
  onChange: (level: string) => void;
}

export default function RiskFilter({ onChange }: Props) {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      className="bg-[#050512] border border-white/10 text-white px-4 py-3 rounded-xl outline-none focus:border-cyan-400 transition"
    >
      <option value="all">All Risk Levels</option>
      <option value="high">High Risk (70+)</option>
      <option value="medium">Medium Risk (40–69)</option>
      <option value="low">Low Risk (&lt;40)</option>
    </select>
  );
}