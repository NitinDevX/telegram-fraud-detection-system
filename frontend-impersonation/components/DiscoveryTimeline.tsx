export default function DiscoveryTimeline({ total }:{total:number}) {
  return (
    <div className="card p-6">
      <h3 className="text-cyan-300 text-sm mb-3">Discovery Activity</h3>
      <div className="flex gap-2">
        {Array.from({length:10}).map((_,i)=>(
          <div key={i} className="bg-cyan-400/60 w-3 rounded"
            style={{height:`${Math.random()*50+10}px`}}/>
        ))}
      </div>
    </div>
  );
}