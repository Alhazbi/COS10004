import React, { useState, useEffect, useCallback } from 'react';

const FlipFlop = ({ bit, index, isClocking, dataIn }) => {
  const weight = Math.pow(2, 7 - index);
  const isActive = bit === 1;
  
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Data Line */}
      <div className="h-8 w-0.5 bg-emerald-400" style={{
        boxShadow: dataIn ? '0 0 8px #34d399' : 'none',
        transition: 'box-shadow 0.3s'
      }} />
      
      {/* Flip-Flop Box */}
      <div 
        className={`
          relative w-16 h-20 rounded-lg border-2 
          flex flex-col items-center justify-center
          transition-all duration-300
          ${isClocking ? 'scale-95' : 'scale-100'}
          ${isActive 
            ? 'bg-emerald-900/60 border-emerald-400 shadow-lg shadow-emerald-500/30' 
            : 'bg-zinc-800/80 border-zinc-600'
          }
        `}
        style={{
          boxShadow: isActive ? '0 0 20px rgba(52, 211, 153, 0.3), inset 0 0 15px rgba(52, 211, 153, 0.1)' : 'none'
        }}
      >
        {/* D-FF Label */}
        <div className="text-xs text-zinc-400 font-mono absolute top-1">D-FF</div>
        
        {/* Q Output */}
        <div className={`
          text-2xl font-bold font-mono
          transition-all duration-200
          ${isActive ? 'text-emerald-300' : 'text-zinc-500'}
        `}>
          {bit}
        </div>
        
        {/* Clock Input Indicator */}
        <div className={`
          absolute -left-1 top-1/2 -translate-y-1/2
          w-2 h-2 rounded-full
          transition-all duration-150
          ${isClocking ? 'bg-amber-400 scale-125' : 'bg-zinc-600'}
        `} />
        
        {/* Q Output Pin */}
        <div className={`
          absolute -bottom-1 left-1/2 -translate-x-1/2
          w-3 h-3 rounded-full border-2
          transition-all duration-200
          ${isActive 
            ? 'bg-emerald-400 border-emerald-300' 
            : 'bg-zinc-700 border-zinc-500'
          }
        `} />
      </div>
      
      {/* Output Line */}
      <div className={`
        h-6 w-0.5 transition-all duration-300
        ${isActive ? 'bg-emerald-400' : 'bg-zinc-600'}
      `} style={{
        boxShadow: isActive ? '0 0 8px #34d399' : 'none'
      }} />
      
      {/* LED Indicator */}
      <div 
        className={`
          w-6 h-6 rounded-full border-2 
          transition-all duration-300
          ${isActive 
            ? 'bg-red-500 border-red-400 animate-pulse' 
            : 'bg-zinc-800 border-zinc-600'
          }
        `}
        style={{
          boxShadow: isActive 
            ? '0 0 15px rgba(239, 68, 68, 0.6), 0 0 30px rgba(239, 68, 68, 0.3)' 
            : 'inset 0 2px 4px rgba(0,0,0,0.5)'
        }}
      />
      
      {/* Weight Label */}
      <div className="text-sm font-mono text-zinc-400 mt-1">{weight}</div>
    </div>
  );
};

export default function RegisterSimulator() {
  const [bits, setBits] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [dataInput, setDataInput] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [isClocking, setIsClocking] = useState(false);
  const [clockPulseIndex, setClockPulseIndex] = useState(-1);
  const [autoMode, setAutoMode] = useState(false);
  const [selectedExample, setSelectedExample] = useState(null);
  
  const examples = [
    { name: 'A', value: 65, binary: [0, 1, 0, 0, 0, 0, 0, 1] },
    { name: 'B', value: 66, binary: [0, 1, 0, 0, 0, 0, 1, 0] },
    { name: 'Z', value: 90, binary: [0, 1, 0, 1, 1, 0, 1, 0] },
    { name: '0', value: 48, binary: [0, 0, 1, 1, 0, 0, 0, 0] },
    { name: '9', value: 57, binary: [0, 0, 1, 1, 1, 0, 0, 1] },
    { name: '!', value: 33, binary: [0, 0, 1, 0, 0, 0, 0, 1] },
    { name: '~', value: 126, binary: [0, 1, 1, 1, 1, 1, 1, 0] },
    { name: 'MAX', value: 255, binary: [1, 1, 1, 1, 1, 1, 1, 1] },
  ];
  
  const decimalValue = bits.reduce((acc, bit, idx) => acc + bit * Math.pow(2, 7 - idx), 0);
  const dataInputDecimal = dataInput.reduce((acc, bit, idx) => acc + bit * Math.pow(2, 7 - idx), 0);
  
  const clockPulse = useCallback(() => {
    setIsClocking(true);
    
    // Animate each flip-flop loading sequentially
    let delay = 0;
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        setClockPulseIndex(i);
      }, delay);
      delay += 50;
    }
    
    setTimeout(() => {
      setBits([...dataInput]);
      setIsClocking(false);
      setClockPulseIndex(-1);
    }, 500);
  }, [dataInput]);
  
  const reset = () => {
    setBits([0, 0, 0, 0, 0, 0, 0, 0]);
    setDataInput([0, 0, 0, 0, 0, 0, 0, 0]);
    setSelectedExample(null);
  };
  
  const toggleDataBit = (index) => {
    const newData = [...dataInput];
    newData[index] = newData[index] === 0 ? 1 : 0;
    setDataInput(newData);
    setSelectedExample(null);
  };
  
  const loadExample = (example) => {
    setDataInput([...example.binary]);
    setSelectedExample(example.name);
  };
  
  // Auto clock mode
  useEffect(() => {
    if (autoMode) {
      const interval = setInterval(clockPulse, 1500);
      return () => clearInterval(interval);
    }
  }, [autoMode, clockPulse]);
  
  return (
    <div className="min-h-screen bg-zinc-950 p-6 font-sans" style={{
      backgroundImage: `
        radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
        linear-gradient(rgba(39, 39, 42, 0.3) 1px, transparent 1px),
        linear-gradient(90deg, rgba(39, 39, 42, 0.3) 1px, transparent 1px)
      `,
      backgroundSize: '100% 100%, 100% 100%, 20px 20px, 20px 20px'
    }}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent tracking-tight">
          8-Bit Register Simulator
        </h1>
        <p className="text-zinc-500 mt-2 font-mono text-sm">
          Interactive D Flip-Flop Register with Clock Control
        </p>
      </div>
      
      {/* Main Container */}
      <div className="max-w-5xl mx-auto">
        {/* Data Input Section */}
        <div className="bg-zinc-900/50 backdrop-blur rounded-2xl border border-zinc-800 p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-zinc-400 font-mono text-sm">DATA INPUT BUS</span>
            <span className="text-emerald-400 font-mono text-lg">
              {dataInputDecimal} <span className="text-zinc-500 text-sm">(0x{dataInputDecimal.toString(16).toUpperCase().padStart(2, '0')})</span>
            </span>
          </div>
          
          {/* Data Input Toggles */}
          <div className="flex justify-center gap-4 mb-4">
            {dataInput.map((bit, idx) => (
              <button
                key={idx}
                onClick={() => toggleDataBit(idx)}
                className={`
                  w-12 h-12 rounded-lg font-mono text-xl font-bold
                  transition-all duration-200 border-2
                  hover:scale-105 active:scale-95
                  ${bit === 1 
                    ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-500/30' 
                    : 'bg-zinc-800 border-zinc-600 text-zinc-400 hover:border-zinc-500'
                  }
                `}
              >
                {bit}
              </button>
            ))}
          </div>
          
          {/* Bit Position Labels */}
          <div className="flex justify-center gap-4">
            {[7, 6, 5, 4, 3, 2, 1, 0].map(pos => (
              <div key={pos} className="w-12 text-center text-xs text-zinc-500 font-mono">
                bit {pos}
              </div>
            ))}
          </div>
        </div>
        
        {/* Clock Line */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          <span className="text-amber-400 font-mono text-xs px-2">CLOCK</span>
          <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        </div>
        
        {/* Register Display */}
        <div className="bg-zinc-900/50 backdrop-blur rounded-2xl border border-zinc-800 p-8 mb-6">
          <div className="flex justify-center gap-6">
            {bits.map((bit, idx) => (
              <FlipFlop 
                key={idx} 
                bit={bit} 
                index={idx}
                isClocking={isClocking && clockPulseIndex >= idx}
                dataIn={dataInput[idx] === 1}
              />
            ))}
          </div>
        </div>
        
        {/* Output Display */}
        <div className="bg-zinc-900/50 backdrop-blur rounded-2xl border border-zinc-800 p-6 mb-6">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-zinc-500 font-mono text-xs mb-2">BINARY</div>
              <div className="text-2xl font-mono text-emerald-400 tracking-wider">
                {bits.join('')}
              </div>
            </div>
            <div>
              <div className="text-zinc-500 font-mono text-xs mb-2">DECIMAL</div>
              <div className="text-4xl font-bold text-cyan-400">
                {decimalValue}
              </div>
            </div>
            <div>
              <div className="text-zinc-500 font-mono text-xs mb-2">ASCII</div>
              <div className="text-4xl font-bold text-purple-400">
                {decimalValue >= 32 && decimalValue <= 126 
                  ? String.fromCharCode(decimalValue) 
                  : <span className="text-zinc-600 text-lg">N/A</span>
                }
              </div>
            </div>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={clockPulse}
            disabled={isClocking}
            className={`
              px-8 py-4 rounded-xl font-bold text-lg
              transition-all duration-200
              ${isClocking 
                ? 'bg-amber-900/50 text-amber-700 cursor-not-allowed' 
                : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/30'
              }
            `}
          >
            ⏱ CLOCK PULSE
          </button>
          
          <button
            onClick={() => setAutoMode(!autoMode)}
            className={`
              px-6 py-4 rounded-xl font-bold
              transition-all duration-200
              ${autoMode 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' 
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              }
            `}
          >
            {autoMode ? '⏸ AUTO ON' : '▶ AUTO OFF'}
          </button>
          
          <button
            onClick={reset}
            className="px-6 py-4 rounded-xl font-bold bg-red-900/50 text-red-400 hover:bg-red-900 transition-all duration-200"
          >
            ↺ RESET
          </button>
        </div>
        
        {/* Examples Section */}
        <div className="bg-zinc-900/50 backdrop-blur rounded-2xl border border-zinc-800 p-6">
          <h3 className="text-zinc-400 font-mono text-sm mb-4 text-center">ASCII CHARACTER EXAMPLES</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {examples.map(example => (
              <button
                key={example.name}
                onClick={() => loadExample(example)}
                className={`
                  px-4 py-3 rounded-lg font-mono
                  transition-all duration-200 hover:scale-105
                  ${selectedExample === example.name 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' 
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 border border-zinc-700'
                  }
                `}
              >
                <div className="text-lg font-bold">{example.name}</div>
                <div className="text-xs opacity-70">{example.value}</div>
              </button>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-zinc-800/50 rounded-lg">
            <p className="text-zinc-400 text-sm text-center">
              💡 <span className="text-zinc-300">Click a character above</span> to load its ASCII binary value into the data input bus, 
              then press <span className="text-amber-400">CLOCK PULSE</span> to store it in the register.
            </p>
          </div>
        </div>
        
        {/* How it Works */}
        <div className="mt-6 bg-zinc-900/30 rounded-xl border border-zinc-800/50 p-6">
          <h3 className="text-cyan-400 font-mono text-sm mb-3">HOW IT WORKS</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-zinc-400">
            <div className="flex gap-3">
              <span className="text-emerald-400">1.</span>
              <p>Set the <span className="text-emerald-300">data input</span> bits by clicking the toggles or selecting an example character.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-amber-400">2.</span>
              <p>Press <span className="text-amber-300">CLOCK PULSE</span> to transfer data into the D flip-flops on the rising edge.</p>
            </div>
            <div className="flex gap-3">
              <span className="text-purple-400">3.</span>
              <p>The register <span className="text-purple-300">stores</span> the value until the next clock pulse or reset.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
