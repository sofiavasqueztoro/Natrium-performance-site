import React from 'react'

export default function ScreenshotCard({ title, src }) {
  return (
    <div className="border border-slate-800 rounded overflow-hidden bg-slate-900">
      <div className="w-full h-28 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-slate-500">
        {/* Replace this div with an <img src={src} /> to show real screenshots */}
        <div className="text-xs">{title} (placeholder)</div>
      </div>
      <div className="p-2 text-xs text-slate-400">{src}</div>
    </div>
  )
}
