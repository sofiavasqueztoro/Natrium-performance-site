import React from 'react'
import { motion } from 'framer-motion'
import ScreenshotCard from './ScreenshotCard'

export default function ScenarioSection({ scenario }) {
  return (
    <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass p-6 rounded-lg border border-slate-800">
      <h3 className="text-lg font-semibold mb-2">{scenario.name}</h3>
      <p className="text-sm text-slate-300 mb-4">Scenario description and key findings are below.</p>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="text-sm font-semibold">User flow</div>
          <ol className="list-decimal pl-5 text-slate-300">
            <li>Launch app</li>
            <li>Initialize Flutter engine</li>
            <li>Load wallet data</li>
            <li>Render home screen</li>
          </ol>

          <div className="mt-4 text-sm font-semibold">Key findings</div>
          <ul className="list-disc pl-5 text-slate-300">
            <li>Frame time: {scenario.frameTime} ms</li>
            <li>PSS memory: {scenario.pss} KB</li>
            <li>Threads: {scenario.threads}</li>
            <li>Janky frames: {scenario.jankyFrames}</li>
          </ul>
        </div>

        <div className="space-y-3">
          {/* Screenshot placeholders - replace images at src/assets/... */}
          <ScreenshotCard title="Home screen" src="/src/assets/scenario1-home.png" />
          <ScreenshotCard title="GPU Rendering" src="/src/assets/scenario1-gpu1.png" />
        </div>
      </div>
    </motion.section>
  )
}
