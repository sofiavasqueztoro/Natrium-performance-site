import React from 'react'
import Header from './components/Header'
import MetricCard from './components/MetricCard'
import ChartCard from './components/ChartCard'
import ScenarioSection from './components/ScenarioSection'
import RecommendationCard from './components/RecommendationCard'
import { scenarios, env } from './data/performanceData'
import { Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, BarChart } from 'recharts'
import { motion } from 'framer-motion'
import natriumLogo from './assets/Natrium logo.png'

function AppOverview() {
  return (
    <section id="overview" className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <img src={natriumLogo} alt="Natrium app logo" className="mb-6 h-16 w-auto object-contain" />
          <h1 className="text-5xl font-bold text-slate-900 mb-4">Fast, Robust & Secure</h1>
          <h2 className="text-4xl font-bold text-slate-800 mb-6">Natrium Wallet</h2>
          <p className="text-lg text-slate-700 mb-6">A technical profiling audit of rendering, memory, threading, and micro-performance behavior in an open-source Flutter mobile wallet.</p>
          <div className="flex gap-4 mb-6">
            <a href="#scenarios" className="px-6 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800">View Scenarios</a>
            <a href="#metrics" className="px-6 py-3 border-2 border-slate-900 text-slate-900 rounded-lg font-semibold hover:bg-slate-100">Open Dashboard</a>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="text-sm text-slate-700 font-medium">Course: ISIS-3510</div>
            <div className="text-sm text-slate-700 font-medium">App: Natrium Wallet</div>
            <div className="text-sm text-slate-700 font-medium">Platform: Flutter / Android</div>
            <div className="text-sm text-slate-700 font-medium">Badge: Performance Report</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white bg-opacity-80 backdrop-blur p-6 rounded-lg border border-slate-200">
            <div className="font-semibold text-slate-900 mb-3">App Overview</div>
            <p className="text-sm text-slate-700 mb-4">Natrium is an open-source mobile wallet for the Nano cryptocurrency, built with Flutter. It provides balance visualization, transaction history, QR flows, contacts, and security.</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
              <div className="p-2 bg-sky-100 rounded">Framework: Flutter</div>
              <div className="p-2 bg-sky-100 rounded">Rendering: Skia / OpenGL</div>
              <div className="p-2 bg-sky-100 rounded">Storage: SQLite + SharedPreferences</div>
              <div className="p-2 bg-sky-100 rounded">Networking: WebSocket + HTTP</div>
              <div className="p-2 bg-sky-100 rounded">Security: Secure Storage + Biometrics</div>
            </div>
          </div>

          <div className="bg-white bg-opacity-80 backdrop-blur p-4 rounded-lg border border-slate-200 text-xs">
            <div className="font-semibold text-slate-900 mb-2">Environment</div>
            <div className="text-slate-700 space-y-1">
              <div>Device: {env.device}</div>
              <div>Resolution: {env.resolution}</div>
              <div>Platform: {env.platform}</div>
            </div>
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
      <h2 className="text-2xl font-semibold text-slate-900 mb-6">Performance Metrics</h2>
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
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100 text-slate-900">
      <Header />
      <main className="pt-6">
        <AppOverview />
        <section id="methodology" className="max-w-7xl mx-auto px-4 py-10">
          <div className="bg-white bg-opacity-80 backdrop-blur p-6 rounded-lg border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">Profiling Methodology</h2>
            <p className="text-slate-700 mt-2">Evaluated using Android profiling tools and system diagnostics.</p>
            <ul className="list-disc pl-5 mt-3 text-slate-700">
              <li>Android Studio Profiler</li>
              <li>ADB dumpsys gfxinfo</li>
              <li>ADB dumpsys meminfo</li>
              <li>Thread inspection & GPU overdraw visualization</li>
            </ul>
          </div>
        </section>

        <Metrics />

        

        <section id="scenarios" className="max-w-7xl mx-auto px-4 py-10 space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Scenario Analyses</h2>
          <div className="grid gap-4">
            {scenarios.map(s => (
              <ScenarioSection key={s.id} scenario={s} />
            ))}
          </div>
        </section>

        <section id="findings" className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">Detailed Findings</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-80 backdrop-blur p-4 rounded-lg border border-slate-200">
              <div className="font-semibold text-slate-900">GPU Rendering</div>
              <div className="text-sm text-slate-700 mt-2">Main issue: janky frames and missed frame deadlines. Highest cost: QR interaction at 200 ms.</div>
            </div>
            <div className="bg-white bg-opacity-80 backdrop-blur p-4 rounded-lg border border-slate-200">
              <div className="font-semibold text-slate-900">Memory</div>
              <div className="text-sm text-slate-700 mt-2">Main issue: native heap dominates memory usage. Strength: no leaks observed.</div>
            </div>
            <div className="bg-white bg-opacity-80 backdrop-blur p-4 rounded-lg border border-slate-200">
              <div className="font-semibold text-slate-900">Threading</div>
              <div className="text-sm text-slate-700 mt-2">Main issue: temporary UI-thread pressure during transitions; scenario 3 had highest threads.</div>
            </div>
          </div>
        </section>

        <section id="recommendations" className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">Optimization Recommendations</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <RecommendationCard title="Optimize QR Rendering" problem="QR interaction produced high rendering time." solution="Cache QR widget; use RepaintBoundary." impact="Lower redraw cost and smoother interaction." />
            <RecommendationCard title="Defer Startup Work" problem="Startup generated a janky frame." solution="Lazy-load non-critical data after first frame." impact="Faster first visual render." />
            <RecommendationCard title="Reduce Overlay Complexity" problem="Overlays increase overdraw." solution="Simplify overlay layers and opacity." impact="Lower GPU composition cost." />
            <RecommendationCard title="Monitor Memory Retention" problem="Controllers and callbacks risk retention." solution="Use leak_tracker & DevTools Memory View." impact="Better long-term stability." />
          </div>
        </section>

        <section id="micro-optimizations" className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">Micro Optimizations</h2>
          <div className="bg-white bg-opacity-80 backdrop-blur p-6 rounded-lg border border-slate-200">
            <p className="text-slate-700 text-sm mb-4">Small, targeted changes can materially improve responsiveness and memory use. Consider the following practical optimizations to include in the implementation or code review:</p>
            <ul className="list-disc pl-6 grid gap-2">
              <li className="text-slate-700 text-sm"><strong>Use RepaintBoundary</strong>: Wrap widgets that change frequently to limit repaints to necessary subtrees.</li>
              <li className="text-slate-700 text-sm"><strong>Reduce overdraw</strong>: Avoid stacking opaque layers; prefer flattened layouts and use alpha where needed sparingly.</li>
              <li className="text-slate-700 text-sm"><strong>Minimize rebuilds</strong>: Use const constructors, extract smaller widgets, and avoid rebuilding large subtrees on state changes.</li>
              <li className="text-slate-700 text-sm"><strong>Cache images & assets</strong>: Resize large images and cache them to prevent repeated decoding on render.</li>
              <li className="text-slate-700 text-sm"><strong>Prefer efficient lists</strong>: Use lazy builders (e.g., ListView.builder) for long lists and avoid heavy item builders.</li>
              <li className="text-slate-700 text-sm"><strong>Avoid expensive layouts on main thread</strong>: Move heavy parsing, decoding, or synchronous work off the UI thread.</li>
              <li className="text-slate-700 text-sm"><strong>Use profiling-driven fixes</strong>: Prefer targeted fixes suggested by traces (e.g., GC hotspots, large allocations) rather than blind changes.</li>
              <li className="text-slate-700 text-sm"><strong>Debounce input work</strong>: Throttle rapid UI events (search, typing) to avoid CPU spikes and redraw churn.</li>
            </ul>
          </div>
        </section>

        <section id="conclusion" className="max-w-7xl mx-auto px-4 py-10">
          <div className="bg-white bg-opacity-80 backdrop-blur p-6 rounded-lg border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">Conclusion</h2>
            <p className="text-slate-700 mt-2">The performance profiling analysis shows that Natrium Wallet maintains a lightweight UI hierarchy, controlled memory behavior, and effective multithreaded execution. The main bottlenecks are temporary rendering spikes during startup, navigation transitions, and QR interactions. The QR/transaction scenario produced the highest rendering cost, while navigation produced the highest memory usage. Overall, the application is stable, but performance could be improved through QR rendering optimization, lazy initialization, overlay simplification, and continued leak monitoring.</p>
          </div>
        </section>
      </main>
    </div>
  )
}
