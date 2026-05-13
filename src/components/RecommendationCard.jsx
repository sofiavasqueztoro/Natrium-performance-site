import React from 'react'

export default function RecommendationCard({ title, problem, solution, impact }) {
  return (
    <div className="glass p-4 rounded-lg border border-slate-800">
      <div className="text-sm font-semibold mb-1">{title}</div>
      <div className="text-xs text-slate-400 mb-2">Problem: {problem}</div>
      <div className="text-xs text-slate-300 mb-2">Solution: {solution}</div>
      <div className="text-xs text-slate-400">Expected impact: {impact}</div>
    </div>
  )
}
