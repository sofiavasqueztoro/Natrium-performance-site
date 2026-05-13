import React from 'react'
import { Menu } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-transparent backdrop-blur glass border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-gradient-to-br from-purple-600 to-cyan-400 flex items-center justify-center text-black font-semibold">N</div>
          <div>
            <div className="font-semibold">Natrium Wallet Performance</div>
            <div className="text-xs text-slate-400">Performance Profiling Report</div>
          </div>
        </motion.div>

        <nav className="hidden md:flex gap-4 items-center">
          <a href="#overview" className="hover:text-accent">Overview</a>
          <a href="#methodology" className="hover:text-accent">Methodology</a>
          <a href="#metrics" className="hover:text-accent">Metrics</a>
          <a href="#scenarios" className="hover:text-accent">Scenarios</a>
          <a href="#findings" className="hover:text-accent">Findings</a>
          <a href="#recommendations" className="hover:text-accent">Recommendations</a>
        </nav>

        <div className="md:hidden">
          <button className="p-2 rounded hover:bg-slate-700"><Menu /></button>
        </div>
      </div>
    </header>
  )
}
