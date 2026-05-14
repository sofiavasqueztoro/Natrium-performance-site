import React from 'react'

export default function ScreenshotCard({ title, src, heightClass = '' }) {
  return (
    <div className="bg-white bg-opacity-80 backdrop-blur rounded-lg border border-slate-200 overflow-hidden shadow-lg">
      <div className={`w-full ${heightClass} flex items-start justify-center bg-slate-50`}>
        {src ? (
          <img src={src} alt={title} className="w-full h-auto object-contain block align-top" />
        ) : (
          <div className={`w-full ${heightClass} bg-gradient-to-br from-slate-100 to-slate-200 flex items-start justify-center text-slate-500`}>
            <div className="text-xs">{title} (placeholder)</div>
          </div>
        )}
      </div>
      <div className="p-2 text-xs text-slate-600 text-center font-medium">{title}</div>
    </div>
  )
}
