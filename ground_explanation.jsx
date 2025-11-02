import React, { useState } from 'react';

const GroundExplanation = () => {
  const [transistorOn, setTransistorOn] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Understanding Ground & Current Flow
        </h1>
        <p className="text-xl text-gray-300 text-center mb-8">
          What happens when a transistor conducts current?
        </p>

        {/* Interactive Control */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setTransistorOn(!transistorOn)}
            className={`px-8 py-4 rounded-xl font-bold text-xl transition-all transform hover:scale-105 shadow-lg ${
              transistorOn
                ? 'bg-gradient-to-r from-green-600 to-green-700'
                : 'bg-gradient-to-r from-gray-700 to-gray-800'
            }`}
          >
            Transistor: {transistorOn ? '✓ CONDUCTING (ON)' : '✗ BLOCKED (OFF)'}
          </button>
        </div>

        {/* Main Visualization */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Circuit Diagram */}
          <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-center text-cyan-400">Circuit Diagram</h3>
            <svg width="400" height="500" className="mx-auto">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#fbbf24" />
                </marker>
              </defs>

              {/* Power Source */}
              <rect x="150" y="20" width="100" height="60" fill="#fbbf24" stroke="#f59e0b" strokeWidth="3" rx="8"/>
              <text x="165" y="48" fill="#000" className="text-lg font-bold">+5V</text>
              <text x="160" y="65" fill="#000" className="text-xs font-bold">POWER</text>
              
              {/* Vertical wire from power */}
              <line x1="200" y1="80" x2="200" y2="140" 
                    stroke={!transistorOn ? "#10b981" : "#4b5563"} strokeWidth="6"/>
              
              {/* Junction */}
              <circle cx="200" cy="140" r="8" fill="#3b82f6"/>
              
              {/* Output branch */}
              <line x1="200" y1="140" x2="320" y2="140" 
                    stroke={!transistorOn ? "#10b981" : "#4b5563"} strokeWidth="6"/>
              <circle cx="320" cy="140" r="16" 
                      fill={!transistorOn ? "#10b981" : "#6b7280"} 
                      stroke={!transistorOn ? "#059669" : "#4b5563"} strokeWidth="3"/>
              <text x="340" y="135" fill="white" className="text-sm font-bold">OUTPUT</text>
              <text x="340" y="150" fill="white" className="text-xs font-bold">
                {!transistorOn ? "5V (ON)" : "0V (OFF)"}
              </text>
              
              {/* Wire to transistor */}
              <line x1="200" y1="140" x2="200" y2="200" 
                    stroke={transistorOn ? "#10b981" : "#4b5563"} strokeWidth="6"/>
              
              {/* Transistor */}
              <rect x="140" y="200" width="120" height="100" 
                    fill={transistorOn ? "#1e40af" : "#1e293b"} 
                    stroke={transistorOn ? "#3b82f6" : "#475569"} 
                    strokeWidth="3" rx="8"/>
              <text x="160" y="255" fill="white" className="font-bold">TRANSISTOR</text>
              
              {/* Control wire */}
              <line x1="50" y1="250" x2="140" y2="250" 
                    stroke={transistorOn ? "#10b981" : "#4b5563"} strokeWidth="5"/>
              <circle cx="50" cy="250" r="14" 
                      fill={transistorOn ? "#10b981" : "#6b7280"}
                      stroke={transistorOn ? "#059669" : "#4b5563"} strokeWidth="3"/>
              <text x="20" y="235" fill="white" className="text-xs font-bold">INPUT</text>
              <text x="15" y="250" fill="white" className="text-xs font-bold">
                (Control)
              </text>
              <text x="20" y="280" fill="white" className="text-xs font-bold">
                {transistorOn ? "ON" : "OFF"}
              </text>
              
              {/* Wire to ground */}
              <line x1="200" y1="300" x2="200" y2="400" 
                    stroke={transistorOn ? "#10b981" : "#4b5563"} strokeWidth="6"/>
              
              {/* Ground symbol */}
              <line x1="180" y1="400" x2="220" y2="400" stroke="#fff" strokeWidth="4"/>
              <line x1="185" y1="410" x2="215" y2="410" stroke="#fff" strokeWidth="4"/>
              <line x1="190" y1="420" x2="210" y2="420" stroke="#fff" strokeWidth="4"/>
              <rect x="170" y="430" width="60" height="30" fill="#4b5563" rx="4"/>
              <text x="175" y="450" fill="white" className="text-xs font-bold">GROUND</text>
              <text x="180" y="463" fill="white" className="text-xs">(0V)</text>
              
              {/* Current flow arrows - to output when OFF */}
              {!transistorOn && (
                <>
                  <line x1="200" y1="100" x2="200" y2="120" 
                        stroke="#fbbf24" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                  <line x1="220" y1="140" x2="280" y2="140" 
                        stroke="#fbbf24" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                  <text x="220" y="120" fill="#fbbf24" className="text-xs font-bold">
                    Current flows to OUTPUT
                  </text>
                </>
              )}
              
              {/* Current flow arrows - to ground when ON */}
              {transistorOn && (
                <>
                  <line x1="200" y1="100" x2="200" y2="120" 
                        stroke="#fbbf24" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                  <line x1="200" y1="160" x2="200" y2="180" 
                        stroke="#fbbf24" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                  <line x1="200" y1="320" x2="200" y2="360" 
                        stroke="#fbbf24" strokeWidth="3" markerEnd="url(#arrowhead)"/>
                  <text x="210" y="240" fill="#fbbf24" className="text-xs font-bold">
                    Current flows to GROUND
                  </text>
                </>
              )}
              
              {/* Voltage labels */}
              <text x="210" y="100" fill="#fbbf24" className="text-xs">+5V</text>
              <text x="210" y="180" fill={transistorOn ? "#10b981" : "#6b7280"} className="text-xs">
                {transistorOn ? "+5V" : ""}
              </text>
              <text x="210" y="360" fill={transistorOn ? "#10b981" : "#6b7280"} className="text-xs">
                {transistorOn ? "→ 0V" : ""}
              </text>
            </svg>
          </div>

          {/* Water Analogy */}
          <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-center text-blue-400">Water Analogy</h3>
            <svg width="400" height="500" className="mx-auto">
              {/* Water Tower (Power) */}
              <rect x="150" y="20" width="100" height="80" fill="#3b82f6" stroke="#2563eb" strokeWidth="3" rx="8"/>
              <rect x="160" y="30" width="80" height="50" fill="#60a5fa" stroke="#3b82f6" strokeWidth="2" rx="4"/>
              <text x="165" y="60" fill="white" className="text-sm font-bold">Water</text>
              <text x="165" y="75" fill="white" className="text-sm font-bold">Tower</text>
              <text x="155" y="15" fill="#3b82f6" className="text-xs font-bold">HIGH PRESSURE</text>
              
              {/* Pipe down */}
              <rect x="190" y="100" width="20" height="60" 
                    fill={!transistorOn ? "#3b82f6" : "#1e293b"}/>
              
              {/* Junction */}
              <circle cx="200" cy="160" r="8" fill="#94a3b8"/>
              
              {/* Pipe to shower (output) */}
              <rect x="200" y="150" width="100" height="20" 
                    fill={!transistorOn ? "#3b82f6" : "#1e293b"}/>
              
              {/* Shower head */}
              <rect x="300" y="140" width="50" height="40" fill="#6b7280" stroke="#475569" strokeWidth="2" rx="4"/>
              {!transistorOn && (
                <>
                  <line x1="310" y1="180" x2="310" y2="200" stroke="#60a5fa" strokeWidth="2"/>
                  <line x1="320" y1="180" x2="320" y2="200" stroke="#60a5fa" strokeWidth="2"/>
                  <line x1="330" y1="180" x2="330" y2="200" stroke="#60a5fa" strokeWidth="2"/>
                  <line x1="340" y1="180" x2="340" y2="200" stroke="#60a5fa" strokeWidth="2"/>
                </>
              )}
              <text x="305" y="225" fill="white" className="text-xs font-bold">Shower</text>
              <text x="300" y="238" fill={!transistorOn ? "#3b82f6" : "#6b7280"} className="text-xs font-bold">
                {!transistorOn ? "FLOWING!" : "No water"}
              </text>
              
              {/* Pipe down from junction */}
              <rect x="190" y="160" width="20" height="80" 
                    fill={transistorOn ? "#3b82f6" : "#1e293b"}/>
              
              {/* Valve (Transistor) */}
              <rect x="160" y="240" width="80" height="60" 
                    fill={transistorOn ? "#dc2626" : "#374151"} 
                    stroke={transistorOn ? "#ef4444" : "#4b5563"} 
                    strokeWidth="3" rx="8"/>
              <text x="180" y="265" fill="white" className="text-xs font-bold">VALVE</text>
              <text x="170" y="280" fill="white" className="text-xs font-bold">
                {transistorOn ? "OPEN" : "CLOSED"}
              </text>
              <text x="175" y="293" fill="white" className="text-xs font-bold">
                {transistorOn ? "✓" : "✗"}
              </text>
              
              {/* Control handle */}
              <rect x="120" y="260" width="40" height="8" 
                    fill={transistorOn ? "#10b981" : "#6b7280"} rx="4"/>
              <circle cx="120" cy="264" r="12" 
                      fill={transistorOn ? "#10b981" : "#6b7280"}/>
              <text x="80" y="250" fill="white" className="text-xs font-bold">Control</text>
              <text x="80" y="263" fill="white" className="text-xs font-bold">Handle</text>
              <text x="85" y="285" fill="white" className="text-xs font-bold">
                {transistorOn ? "ON" : "OFF"}
              </text>
              
              {/* Pipe to drain */}
              <rect x="190" y="300" width="20" height="80" 
                    fill={transistorOn ? "#3b82f6" : "#1e293b"}/>
              
              {/* Drain (Ground) */}
              <rect x="160" y="380" width="80" height="60" fill="#374151" stroke="#4b5563" strokeWidth="3" rx="8"/>
              <line x1="180" y1="395" x2="220" y2="395" stroke="#6b7280" strokeWidth="3"/>
              <line x1="185" y1="405" x2="215" y2="405" stroke="#6b7280" strokeWidth="3"/>
              <line x1="190" y1="415" x2="210" y2="415" stroke="#6b7280" strokeWidth="3"/>
              <text x="175" y="435" fill="#9ca3af" className="text-xs font-bold">DRAIN</text>
              <text x="165" y="455" fill="#9ca3af" className="text-xs">(Ground)</text>
              
              {/* Water flow indicators */}
              {!transistorOn && (
                <>
                  <circle cx="200" cy="130" r="3" fill="#60a5fa">
                    <animate attributeName="cy" values="130;140;150" dur="0.5s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="250" cy="160" r="3" fill="#60a5fa">
                    <animate attributeName="cx" values="250;270;290" dur="0.5s" repeatCount="indefinite"/>
                  </circle>
                  <text x="100" y="180" fill="#3b82f6" className="text-sm font-bold">
                    💧 Water to shower
                  </text>
                </>
              )}
              
              {transistorOn && (
                <>
                  <circle cx="200" cy="130" r="3" fill="#60a5fa">
                    <animate attributeName="cy" values="130;200;270;340" dur="1s" repeatCount="indefinite"/>
                  </circle>
                  <text x="100" y="330" fill="#3b82f6" className="text-sm font-bold">
                    💧 Water to drain
                  </text>
                </>
              )}
            </svg>
          </div>
        </div>

        {/* Explanation Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* When OFF */}
          <div className={`p-6 rounded-xl border-3 transition-all ${
            !transistorOn 
              ? 'bg-blue-900/50 border-blue-500 shadow-lg shadow-blue-500/50' 
              : 'bg-gray-800 border-gray-700'
          }`}>
            <h3 className="text-2xl font-bold mb-4 text-blue-400">
              🔒 Transistor OFF (Not Conducting)
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-3">
                <div className="text-2xl">1️⃣</div>
                <div>
                  <strong className="text-white">Valve is Closed:</strong> Path to ground is blocked
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">2️⃣</div>
                <div>
                  <strong className="text-white">Current Can't Reach Ground:</strong> No drain available
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">3️⃣</div>
                <div>
                  <strong className="text-white">Current Goes to Output:</strong> Only path available
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">✓</div>
                <div>
                  <strong className="text-green-400">Result: OUTPUT = HIGH (ON)</strong>
                  <div className="text-sm mt-1">Output wire has +5V</div>
                </div>
              </div>
            </div>
          </div>

          {/* When ON */}
          <div className={`p-6 rounded-xl border-3 transition-all ${
            transistorOn 
              ? 'bg-green-900/50 border-green-500 shadow-lg shadow-green-500/50' 
              : 'bg-gray-800 border-gray-700'
          }`}>
            <h3 className="text-2xl font-bold mb-4 text-green-400">
              ⚡ Transistor ON (Conducting)
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-3">
                <div className="text-2xl">1️⃣</div>
                <div>
                  <strong className="text-white">Valve Opens:</strong> Direct path to ground created
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">2️⃣</div>
                <div>
                  <strong className="text-white">Current Rushes to Ground:</strong> Follows easiest path (lowest resistance)
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">3️⃣</div>
                <div>
                  <strong className="text-white">Output Gets "Starved":</strong> All current diverted to ground
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">✓</div>
                <div>
                  <strong className="text-red-400">Result: OUTPUT = LOW (OFF)</strong>
                  <div className="text-sm mt-1">Output wire drops to ~0V</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ground Explanation */}
        <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl p-8 border-2 border-purple-700/50 mb-8">
          <h2 className="text-3xl font-bold mb-4 text-purple-400">🌍 What is "Ground"?</h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <h4 className="text-xl font-bold text-white mb-3">Definition:</h4>
              <ul className="space-y-2">
                <li>• <strong>Reference point</strong> for all voltages (0 Volts)</li>
                <li>• <strong>Return path</strong> for electrical current</li>
                <li>• <strong>Low resistance path</strong> that completes the circuit</li>
                <li>• Often connected to <strong>actual Earth</strong> or negative terminal</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-3">Why Current Goes to Ground:</h4>
              <ul className="space-y-2">
                <li>• <strong>Voltage difference:</strong> Power (+5V) → Ground (0V)</li>
                <li>• <strong>Path of least resistance</strong> when transistor conducts</li>
                <li>• <strong>Completes the circuit</strong> - electricity must flow in loops</li>
                <li>• Like water flowing <strong>downhill</strong> to the lowest point</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-gradient-to-r from-orange-900/50 to-red-900/50 rounded-xl p-8 border-2 border-orange-700/50">
          <h2 className="text-3xl font-bold mb-6 text-center text-orange-400">💡 Key Insights</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 p-5 rounded-lg">
              <h4 className="text-lg font-bold text-yellow-400 mb-2">🎯 Transistor = Switch</h4>
              <p className="text-gray-300 text-sm">
                When control is ON, the switch closes and creates a path. When OFF, the switch opens and blocks the path.
              </p>
            </div>
            <div className="bg-gray-900/50 p-5 rounded-lg">
              <h4 className="text-lg font-bold text-cyan-400 mb-2">⚖️ Current Takes Easy Path</h4>
              <p className="text-gray-300 text-sm">
                When transistor conducts, ground becomes the "easy" path. Current always flows through the path of least resistance.
              </p>
            </div>
            <div className="bg-gray-900/50 p-5 rounded-lg">
              <h4 className="text-lg font-bold text-pink-400 mb-2">🔄 Inversion Happens</h4>
              <p className="text-gray-300 text-sm">
                Input ON → Ground steals current → Output OFF. Input OFF → No path to ground → Output ON. This is how NOT gates work!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroundExplanation;