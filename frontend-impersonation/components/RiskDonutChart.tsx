export default function RiskDonutChart({ official, suspicious, fake }:{
 official:number; suspicious:number; fake:number;
}) {
  const total = official + suspicious + fake || 1;
  const o = (official/total)*100;
  const s = (suspicious/total)*100;

  return (
    <div className="card p-6 flex gap-6 items-center">
      <div
        className="w-28 h-28 rounded-full"
        style={{
          background:`conic-gradient(#22c55e 0 ${o}%, #facc15 ${o}% ${o+s}%, #ef4444 ${o+s}% 100%)`
        }}
      />
      <div className="text-sm">
        <p className="text-green-400">Official: {official}</p>
        <p className="text-yellow-300">Suspicious: {suspicious}</p>
        <p className="text-red-400">Fake: {fake}</p>
      </div>
    </div>
  );
}