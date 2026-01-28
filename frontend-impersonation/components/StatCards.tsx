import { motion } from "framer-motion";

export default function StatCards({ total, official, suspicious, fake }:{
 total:number; official:number; suspicious:number; fake:number;
}) {

  const Card = ({title,value,color,index}:any)=>(
    <motion.div
      initial={{ opacity:0, y:15 }}
      animate={{ opacity:1, y:0 }}
      transition={{ delay:index*0.1 }}
      className="card p-4"
    >
      <p className="text-xs text-gray-400">{title}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </motion.div>
  );

  return (
    <div className="grid md:grid-cols-4 gap-4 mt-6">
      <Card title="Total" value={total} color="text-cyan-300" index={0}/>
      <Card title="Official" value={official} color="text-green-400" index={1}/>
      <Card title="Suspicious" value={suspicious} color="text-yellow-300" index={2}/>
      <Card title="Fake" value={fake} color="text-red-400" index={3}/>
    </div>
  );
}