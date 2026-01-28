"use client";

interface Props {
  brand: string;
  total: number;
  official: number;
  fake: number;
}

export default function InvestigationSummary({ brand, total, official, fake }: Props) {
  return (
    <div className="bg-[#0b0b1a]/80 border border-white/10 rounded-2xl p-6">
      <h2 className="text-gray-400 text-sm">Investigation Summary</h2>

      <div className="grid md:grid-cols-4 gap-4 mt-3 text-sm">
        <div>
          <p className="text-gray-500">Target Brand</p>
          <p className="text-cyan-300 font-semibold">{brand}</p>
        </div>

        <div>
          <p className="text-gray-500">Entities Found</p>
          <p className="font-semibold">{total}</p>
        </div>

        <div>
          <p className="text-gray-500">Official Accounts</p>
          <p className="font-semibold text-green-400">{official}</p>
        </div>

        <div>
          <p className="text-gray-500">Likely Fake</p>
          <p className="font-semibold text-red-400">{fake}</p>
        </div>
      </div>
    </div>
  );
}