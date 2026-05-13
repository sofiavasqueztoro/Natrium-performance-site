import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function ChartCard({ title, children }) {
  return (
    <div className="glass p-4 rounded-lg border border-slate-800 shadow-sm">
      <div className="text-sm font-semibold mb-2">{title}</div>
      <div style={{ width: '100%', height: 240 }}>
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </div>
  )
}
