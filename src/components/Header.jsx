import React from 'react'
import { Menu } from 'lucide-react'
import { motion } from 'framer-motion'
import natriumLogo from '../assets/Natrium logo.png'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white bg-opacity-90 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-3">
          <img src={natriumLogo} alt="Natrium Logo" className="w-12 h-12 object-contain" />
          <div>
            <div className="font-semibold text-slate-900">Natrium Wallet Performance</div>
            <div className="text-xs text-slate-600">Performance Profiling Report</div>
          </div>
        </motion.div>

        <nav className="hidden md:flex gap-6 items-center">
          <a href="#overview" className="text-slate-700 hover:text-slate-900">Overview</a>
          <a href="#methodology" className="text-slate-700 hover:text-slate-900">Methodology</a>
          <a href="#metrics" className="text-slate-700 hover:text-slate-900">Metrics</a>
          <a href="#scenarios" className="text-slate-700 hover:text-slate-900">Scenarios</a>
          <a href="#findings" className="text-slate-700 hover:text-slate-900">Findings</a>
          <a href="#recommendations" className="text-slate-700 hover:text-slate-900">Recommendations</a>
        </nav>

        <div className="md:hidden">
          <button className="p-2 rounded hover:bg-slate-200"><Menu className="text-slate-900" /></button>
        </div>
      </div>
    </header>
  )
}
