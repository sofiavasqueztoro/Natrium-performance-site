import React from 'react'

export default function RecommendationCard({ title, problem, solution, impact }) {
  return (
    <div className="bg-white bg-opacity-80 backdrop-blur p-4 rounded-lg border border-slate-200">
      <div className="text-sm font-semibold mb-1 text-slate-900">{title}</div>
      <div className="text-xs text-slate-700 mb-2">Problem: {problem}</div>
      <div className="text-xs text-slate-700 mb-2">Solution: {solution}</div>
      <div className="text-xs text-slate-700">Expected impact: {impact}</div>
    </div>
  )
}
