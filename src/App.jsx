import React from 'react'
import Header from './components/Header'
import MetricCard from './components/MetricCard'
import ChartCard from './components/ChartCard'
import ScenarioSection from './components/ScenarioSection'
import RecommendationCard from './components/RecommendationCard'
import { scenarios, env } from './data/performanceData'
import { Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, BarChart } from 'recharts'
import { motion } from 'framer-motion'

function AppOverview() {
  return (
    <section id="overview" className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-3 gap-4 items-start">
        <div className="md:col-span-2 glass p-6 rounded-lg border border-slate-800">
          <h1 className="text-3xl font-bold">Natrium Wallet Performance Analysis</h1>
          <p className="text-slate-400 mt-2">A technical profiling audit of rendering, memory, threading, and micro-performance behavior in an open-source Flutter mobile wallet.</p>
          <div className="mt-4 flex gap-3">
            <a href="#scenarios" className="px-4 py-2 bg-purple-600 rounded hover:opacity-90">View Scenarios</a>
            <a href="#metrics" className="px-4 py-2 border border-slate-700 rounded hover:bg-slate-800">Open Dashboard</a>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-xs text-slate-400">Course: ISIS-3510</div>
            <div className="text-xs text-slate-400">App: Natrium Wallet</div>
            <div className="text-xs text-slate-400">Platform: Flutter / Android</div>
            <div className="text-xs text-slate-400">Badge: Performance Profiling Report</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="glass p-4 rounded-lg border border-slate-800">
            <div className="text-sm font-semibold">App Overview</div>
            <p className="text-xs text-slate-300 mt-2">Natrium is an open-source mobile wallet for the Nano cryptocurrency, built with Flutter. It provides balance visualization, transaction history, QR flows, contacts, and security.</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-300">
              <div className="p-2 bg-slate-900 rounded">Framework: Flutter</div>
              <div className="p-2 bg-slate-900 rounded">Rendering: Skia / OpenGL</div>
              <div className="p-2 bg-slate-900 rounded">Storage: SQLite + SharedPreferences</div>
              <div className="p-2 bg-slate-900 rounded">Networking: WebSocket + HTTP</div>
              <div className="p-2 bg-slate-900 rounded">Security: Secure Storage + Biometrics</div>
            </div>
          </div>

          <div className="glass p-4 rounded-lg border border-slate-800 text-xs">
            <div className="font-semibold">Environment</div>
            <div className="text-slate-300 mt-2">Device: {env.device}</div>
            <div className="text-slate-300">Resolution: {env.resolution}</div>
            <div className="text-slate-300">Platform: {env.platform}</div>
            <div className="text-slate-300">Flutter: {env.flutterVersion}</div>
            <div className="text-slate-300">Dart: {env.dartVersion}</div>
            <div className="text-slate-300">Build mode: {env.buildMode}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Metrics() {
  const frameData = scenarios.map(s => ({ name: s.name, frameTime: s.frameTime }))
  const memData = scenarios.map(s => ({ name: s.name, PSS: s.pss, RSS: s.rss }))
  const threadData = scenarios.map(s => ({ name: s.name, threads: s.threads }))
  const heapData = scenarios.map(s => ({ name: s.name, native: s.nativeHeap, dalvik: s.dalvikHeap }))

  const highestFrame = Math.max(...scenarios.map(s => s.frameTime))
  const highestMemory = Math.max(...scenarios.map(s => s.pss))
  const highestThreads = Math.max(...scenarios.map(s => s.threads))

  return (
    <section id="metrics" className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <div className="grid md:grid-cols-2 gap-4">
            <ChartCard title="Frame time (ms)">
              <BarChart data={frameData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="frameTime" fill="#8B5CF6" />
              </BarChart>
            </ChartCard>

            <ChartCard title="Memory (PSS vs RSS)">
              <BarChart data={memData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Legend />
                <Bar dataKey="PSS" fill="#00E6FF" />
                <Bar dataKey="RSS" fill="#7c3aed" />
              </BarChart>
            </ChartCard>

            <ChartCard title="Threads">
              <BarChart data={threadData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="threads" fill="#06b6d4" />
              </BarChart>
            </ChartCard>

            <ChartCard title="Native vs Dalvik Heap (KB)">
              <BarChart data={heapData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="native" fill="#ef4444" />
                <Bar dataKey="dalvik" fill="#f59e0b" />
              </BarChart>
            </ChartCard>
          </div>
        </div>

        <aside className="space-y-3">
          <MetricCard title="Highest frame time" value={`${highestFrame} ms`} />
          <MetricCard title="Highest memory (PSS)" value={`${highestMemory} KB`} />
          <MetricCard title="Highest threads" value={highestThreads} />
          <MetricCard title="Most stable scenario" value={scenarios[0].name} hint="Based on janky frames" />
        </aside>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-navy text-slate-100">
      <Header />
      <main className="pt-6">
        <AppOverview />
        <section id="methodology" className="max-w-7xl mx-auto px-4 py-10">
          <div className="glass p-6 rounded-lg border border-slate-800">
            <h2 className="text-xl font-semibold">Profiling Methodology</h2>
            <p className="text-slate-300 mt-2">Evaluated using Android profiling tools and system diagnostics.</p>
            <ul className="list-disc pl-5 mt-3 text-slate-300">
              <li>Android Studio Profiler</li>
              <li>ADB dumpsys gfxinfo</li>
              <li>ADB dumpsys meminfo</li>
              <li>Thread inspection & GPU overdraw visualization</li>
            </ul>
          </div>
        </section>

        <Metrics />

        <section id="scenarios" className="max-w-7xl mx-auto px-4 py-10 space-y-4">
          <h2 className="text-2xl font-semibold">Scenario Analyses</h2>
          <div className="grid gap-4">
            {scenarios.map(s => (
              <ScenarioSection key={s.id} scenario={s} />
            ))}
          </div>
        </section>

        <section id="findings" className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-semibold mb-4">Detailed Findings</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="glass p-4 rounded border border-slate-800">
              <div className="font-semibold">GPU Rendering</div>
              <div className="text-sm text-slate-300 mt-2">Main issue: janky frames and missed frame deadlines. Highest cost: QR interaction at 200 ms.</div>
            </div>
            <div className="glass p-4 rounded border border-slate-800">
              <div className="font-semibold">Memory</div>
              <div className="text-sm text-slate-300 mt-2">Main issue: native heap dominates memory usage. Strength: no leaks observed.</div>
            </div>
            <div className="glass p-4 rounded border border-slate-800">
              <div className="font-semibold">Threading</div>
              <div className="text-sm text-slate-300 mt-2">Main issue: temporary UI-thread pressure during transitions; scenario 3 had highest threads.</div>
            </div>
          </div>
        </section>

        <section id="recommendations" className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-semibold mb-4">Optimization Recommendations</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <RecommendationCard title="Optimize QR Rendering" problem="QR interaction produced high rendering time." solution="Cache QR widget; use RepaintBoundary." impact="Lower redraw cost and smoother interaction." />
            <RecommendationCard title="Defer Startup Work" problem="Startup generated a janky frame." solution="Lazy-load non-critical data after first frame." impact="Faster first visual render." />
            <RecommendationCard title="Reduce Overlay Complexity" problem="Overlays increase overdraw." solution="Simplify overlay layers and opacity." impact="Lower GPU composition cost." />
            <RecommendationCard title="Monitor Memory Retention" problem="Controllers and callbacks risk retention." solution="Use leak_tracker & DevTools Memory View." impact="Better long-term stability." />
          </div>
        </section>

        <section id="conclusion" className="max-w-7xl mx-auto px-4 py-10">
          <div className="glass p-6 rounded border border-slate-800">
            <h2 className="text-xl font-semibold">Conclusion</h2>
            <p className="text-slate-300 mt-2">The performance profiling analysis shows that Natrium Wallet maintains a lightweight UI hierarchy, controlled memory behavior, and effective multithreaded execution. The main bottlenecks are temporary rendering spikes during startup, navigation transitions, and QR interactions. The QR/transaction scenario produced the highest rendering cost, while navigation produced the highest memory usage. Overall, the application is stable, but performance could be improved through QR rendering optimization, lazy initialization, overlay simplification, and continued leak monitoring.</p>
          </div>
        </section>

        <section id="gallery" className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-semibold mb-4">Screenshot Gallery</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* placeholder paths. Replace with real images in src/assets /*/}
            <div className="border border-slate-800 rounded p-3 text-xs text-slate-400">src/assets/scenario1-home.png</div>
            <div className="border border-slate-800 rounded p-3 text-xs text-slate-400">src/assets/scenario1-gpu1.png</div>
            <div className="border border-slate-800 rounded p-3 text-xs text-slate-400">src/assets/scenario2-menu.png</div>
            <div className="border border-slate-800 rounded p-3 text-xs text-slate-400">src/assets/scenario3-qr.png</div>
          </div>
        </section>
      </main>
    </div>
  )
}
