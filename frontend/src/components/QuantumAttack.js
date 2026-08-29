import React, { useState } from 'react';

const QuantumAttack = ({ wallets }) => {
  const [selectedWallet, setSelectedWallet] = useState("");
  const [attackResult, setAttackResult] = useState(null);
  const [isAttacking, setIsAttacking] = useState(false);

  const handleAttack = () => {
    if (!selectedWallet) {
      alert("Please select a target wallet first.");
      return;
    }

    setIsAttacking(true);
    setAttackResult(null);

    const target = JSON.parse(selectedWallet);

    // Simulate buildup UX
    setTimeout(() => {
      fetch("http://localhost:5000/api/experiment/shors-attack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet: target })
      })
      .then(res => res.json())
      .then(data => {
        setAttackResult({ ...data, targetType: target.type });
        setIsAttacking(false);
      })
      .catch(err => {
        console.error("Attack simulation failed:", err);
        setIsAttacking(false);
      });
    }, 1500); // 1.5s simulated "crunching" time
  };

  return (
    <div className="glass-panel p-6 relative overflow-hidden group h-full border-accent/30">
      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="bg-accent/20 p-2 rounded-lg border border-accent/30 relative">
            {isAttacking && (
              <span className="absolute -inset-1 rounded-lg bg-accent/50 animate-pulse blur-sm"></span>
            )}
            <svg className="w-6 h-6 text-accent relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              <circle cx="12" cy="12" r="10" strokeWidth="1" strokeDasharray="4"></circle>
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-display font-semibold text-white group-hover:text-accent transition-colors">Quantum Adversary</h2>
            <p className="text-xs text-white/50 font-mono">Shor's Algorithm Simulator</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Select Target Vector</label>
          <div className="relative">
            <select
              value={selectedWallet}
              onChange={(e) => setSelectedWallet(e.target.value)}
              className="w-full glass-input appearance-none cursor-pointer border-accent/20 focus:ring-accent/50"
              disabled={isAttacking}
            >
              <option value="" className="bg-surface text-gray-400">Select Identity to Attack...</option>
              {wallets.map(w => (
                <option key={w.id} value={JSON.stringify(w)} className="bg-surface text-white">
                  {w.id.substring(0,8)}... ({w.type})
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleAttack}
          disabled={isAttacking || !selectedWallet}
          className={`w-full py-2.5 px-6 rounded-lg font-medium tracking-wide transition-all duration-300 flex justify-center items-center gap-2 border 
            ${isAttacking 
              ? 'bg-accent text-white border-accent shadow-[0_0_20px_#ff003c]' 
              : 'bg-accent/10 text-accent border-accent/30 hover:bg-accent/20 hover:shadow-[0_0_15px_rgba(255,0,60,0.4)] disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
        >
          {isAttacking ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              FACTORIZING QUBITS...
            </>
          ) : (
            'INITIATE QUANTUM ATTACK'
          )}
        </button>

        {attackResult && (
          <div className={`mt-4 p-4 rounded-xl border animate-fade-in ${attackResult.success ? 'bg-accent/10 border-accent/40' : 'bg-success/10 border-success/40'}`}>
            <div className="flex items-start justify-between mb-2">
              <span className={`text-lg font-display font-bold tracking-wider ${attackResult.success ? 'text-accent' : 'text-success'}`}>
                {attackResult.status}
              </span>
              <span className="text-xs font-mono text-white/50 bg-black/40 px-2 py-1 rounded">
                Target: {attackResult.targetType}
              </span>
            </div>
            
            <p className="text-sm text-white/80 mb-3">{attackResult.message}</p>
            
            <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-black/30 p-2 rounded">
              <div className="flex flex-col">
                <span className="text-white/40">Time Taken:</span>
                <span className={attackResult.success ? 'text-accent' : 'text-success'}>{attackResult.timeTaken}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white/40">Qubits Needed:</span>
                <span className="text-primary">{attackResult.qubitsUsed}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuantumAttack;
