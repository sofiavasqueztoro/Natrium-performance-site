import React from 'react'
import { motion } from 'framer-motion'

export default function MetricCard({ title, value, hint }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="bg-white bg-opacity-80 backdrop-blur p-4 rounded-lg border border-slate-200 shadow-sm">
      <div className="text-xs text-slate-600 font-medium">{title}</div>
      <div className="text-2xl font-semibold mt-2 text-slate-900">{value}</div>
      {hint && <div className="text-xs text-slate-600 mt-1">{hint}</div>}
    </motion.div>
  )
}
