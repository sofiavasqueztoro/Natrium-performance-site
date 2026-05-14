import React from 'react'
import { motion } from 'framer-motion'
import ScreenshotCard from './ScreenshotCard'
import scenario1Home from '../assets/screnario 1 - home.png'
import scenario2Contacts from '../assets/scenario 2 - contacts.png'
import scenario2Menu from '../assets/scenario 2 - menu.png'
import scenario2Security from '../assets/scenario 2 - security.png'
import scenario2Share from '../assets/scenario 2 - share.png'
import scenario3Qr from '../assets/scenario 3 - qr.png'

export default function ScenarioSection({ scenario }) {
  // map scenario -> one or more assets
  const assetMap = {
    Startup: scenario1Home,
    Navigation: [
      scenario2Contacts,
      scenario2Menu,
      scenario2Security,
      scenario2Share
    ],
    'QR / Transaction': scenario3Qr
  }

  const flowMap = {
    Startup: [
      'Launch the app',
      'Initialize the Flutter engine',
      'Load wallet state and balances',
      'Render the home screen'
    ],
    Navigation: [
      'Open the app menu',
      'Move into contacts or security sections',
      'Switch between navigation targets',
      'Return to the main wallet view'
    ],
    'QR / Transaction': [
      'Open the QR or transaction screen',
      'Prepare a receive or send action',
      'Show or scan the QR code',
      'Complete the transaction flow'
    ]
  }

  const analysisMap = {
    Startup: {
      gpu: 'Frame time stays around 150 ms, so startup is acceptable but still shows an initial render cost that should be kept off the critical path.',
      overdraw: 'The home view mixes panels, gradients, and cards, so overdraw is likely low to moderate rather than severe.',
      memory: 'PSS is moderate for the scenario, and the current data does not show an obvious leak; a heap dump would be needed to confirm retention issues.',
      threading: '38 threads suggests normal engine and background activity; startup work should remain async so the main thread can paint sooner.'
    },
    Navigation: {
      gpu: 'Frame time remains at 150 ms, but this scenario carries the highest memory values, so navigation is the main place to check UI churn and redraw cost.',
      overdraw: 'Switching between stacked views, overlays, and repeated rows can increase overdraw, especially if multiple layers are composited at once.',
      memory: 'This is the highest-PSS scenario, so it is the strongest candidate for RAM growth, controller retention, or cached widget buildup.',
      threading: '43 threads show more background work than startup, so navigation should be checked for unnecessary async churn or locks on the UI thread.'
    },
    'QR / Transaction': {
      gpu: 'This scenario has the highest frame time at 200 ms, making it the clearest GPU rendering bottleneck in the current data.',
      overdraw: 'The QR and action controls are likely the heaviest composed view, so this is the best place to inspect overdraw and repaint boundaries.',
      memory: 'PSS is lower than navigation, which is a strength, but the screen still needs heap verification to rule out temporary allocations during QR work.',
      threading: '47 threads is the highest count, which suggests the strongest async activity; that can help responsiveness, but it should not block the main thread.'
    }
  }

  const imgs = assetMap[scenario.name]
  const flowSteps = flowMap[scenario.name] || []
  const analysis = analysisMap[scenario.name] || {}
  const [index, setIndex] = React.useState(0)

  function next() {
    if (!Array.isArray(imgs)) return
    setIndex(i => (i + 1) % imgs.length)
  }

  function prev() {
    if (!Array.isArray(imgs)) return
    setIndex(i => (i - 1 + imgs.length) % imgs.length)
  }

  return (
    <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white bg-opacity-80 backdrop-blur p-6 rounded-lg border border-slate-200">
      <h3 className="text-lg font-semibold mb-2 text-slate-900">{scenario.name}</h3>
      <p className="text-sm text-slate-700 mb-4">Scenario description and key findings are below.</p>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="text-sm font-semibold text-slate-900">User flow</div>
          <ol className="list-decimal pl-5 text-slate-700">
            {flowSteps.map(step => (
              <li key={step}>{step}</li>
            ))}
          </ol>

          <div className="mt-4 text-sm font-semibold text-slate-900">Key findings</div>
          <ul className="list-disc pl-5 text-slate-700">
            <li>Frame time: {scenario.frameTime} ms</li>
            <li>PSS memory: {scenario.pss} KB</li>
            <li>Threads: {scenario.threads}</li>
            <li>Janky frames: {scenario.jankyFrames}</li>
          </ul>

          <div className="mt-4 grid gap-3 text-sm text-slate-700">
            <div>
              <div className="font-semibold text-slate-900">GPU rendering analysis</div>
              <p>{analysis.gpu}</p>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Overdrawing analysis</div>
              <p>{analysis.overdraw}</p>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Memory management</div>
              <p>{analysis.memory}</p>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Threading</div>
              <p>{analysis.threading}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {/* Single large screenshot or carousel controls when multiple images exist */}
          {Array.isArray(imgs) ? (
            <div>
              <ScreenshotCard title={`${scenario.name} screenshot`} src={imgs[index]} />
              <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
                <div className="flex gap-2">
                  <button onClick={prev} className="px-3 py-1 bg-slate-100 border border-slate-300 rounded hover:bg-slate-200 text-slate-900 font-medium">Prev</button>
                  <button onClick={next} className="px-3 py-1 bg-slate-100 border border-slate-300 rounded hover:bg-slate-200 text-slate-900 font-medium">Next</button>
                </div>
                <div className="opacity-80">{index + 1} / {imgs.length}</div>
              </div>
            </div>
          ) : (
            <ScreenshotCard title={`${scenario.name} screenshot`} src={imgs} />
          )}
        </div>
      </div>
    </motion.section>
  )
}
