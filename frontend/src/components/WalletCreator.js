import React, { useState } from 'react';

const WalletCreator = ({ onWalletCreated, wallets }) => {
  const [walletType, setWalletType] = useState('classical');

  const handleCreate = () => {
    fetch("http://localhost:5000/api/wallets/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: walletType })
    })
      .then(res => res.json())
      .then(data => {
        onWalletCreated(data);
      })
      .catch(err => {
        console.error("Failed to create wallet:", err);
      });
  };

  return (
    <div className="glass-panel p-6 relative overflow-hidden group">
      {/* Decorative top bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-success via-primary to-transparent opacity-70 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-success/20 p-2 rounded-lg border border-success/30">
          <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path>
          </svg>
        </div>
        <h2 className="text-xl font-display font-semibold">Generate Wallet</h2>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Algorithm Type</label>
          <div className="relative">
            <select
              value={walletType}
              onChange={(e) => setWalletType(e.target.value)}
              className="w-full glass-input appearance-none cursor-pointer"
            >
              <option value="classical" className="bg-surface text-white">Classical (RSA/ECC)</option>
              <option value="post-quantum" className="bg-surface text-white">Post-Quantum (Lattice-based)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <button
          onClick={handleCreate}
          className="w-full btn-success flex justify-center items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Initialize Keypair
        </button>
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <p className="text-xs text-white/40 flex items-center justify-between">
          <span>Active Nodes</span>
          <span className="text-success font-mono">{wallets.length} Keys loaded</span>
        </p>
      </div>
    </div>
  );
};

export default WalletCreator;
