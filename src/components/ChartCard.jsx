import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function ChartCard({ title, children }) {
  return (
    <div className="bg-white bg-opacity-80 backdrop-blur p-4 rounded-lg border border-slate-200 shadow-sm">
      <div className="text-sm font-semibold mb-2 text-slate-900">{title}</div>
      <div style={{ width: '100%', height: 240 }}>
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </div>
  )
}
