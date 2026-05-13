import React from 'react'
import { motion } from 'framer-motion'

export default function MetricCard({ title, value, hint }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="glass p-4 rounded-lg border border-slate-800 shadow-sm">
      <div className="text-xs text-slate-400">{title}</div>
      <div className="text-2xl font-semibold mt-2">{value}</div>
      {hint && <div className="text-xs text-slate-500 mt-1">{hint}</div>}
    </motion.div>
  )
}
