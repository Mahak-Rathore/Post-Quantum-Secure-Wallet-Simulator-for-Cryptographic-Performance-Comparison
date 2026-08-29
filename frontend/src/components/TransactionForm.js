import React from 'react';

const TransactionForm = ({ wallets, onTransactionSent }) => {
  const handleSend = () => {
    const from = document.getElementById("fromWallet").value;
    const to = document.getElementById("toWallet").value;
    const amount = document.getElementById("amount").value;

    if (!from || !to) {
      alert("Please select wallets.");
      return;
    }

    try {
      const fromWallet = JSON.parse(from);
      const toWallet = JSON.parse(to);

      fetch("http://localhost:5000/api/transaction/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromWallet,
          toWallet,
          amount: Number(amount)
        })
      })
        .then(res => res.json())
        .then(data => {
          onTransactionSent(data);
        });

    } catch (err) {
      alert("Invalid wallet data ❌");
    }
  };

  return (
    <div className="glass-panel p-6 relative overflow-hidden group h-full">
      <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-secondary via-primary to-transparent opacity-70 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-secondary/20 p-2 rounded-lg border border-secondary/30">
          <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h2 className="text-xl font-display font-semibold">Execute Transfer</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Sender Signature (From)</label>
          <div className="relative">
            <select id="fromWallet" className="w-full glass-input appearance-none cursor-pointer">
              <option value="" className="bg-surface text-gray-400">Select Identity...</option>
              {wallets.map(w => (
                <option key={w.id} value={JSON.stringify(w)} className="bg-surface text-white">
                  {w.id.substring(0,8)}... ({w.type})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Receiver Address (To)</label>
          <div className="relative">
            <select id="toWallet" className="w-full glass-input appearance-none cursor-pointer">
              <option value="" className="bg-surface text-gray-400">Select Target...</option>
              {wallets.map(w => (
                <option key={w.id} value={JSON.stringify(w)} className="bg-surface text-white">
                  {w.id.substring(0,8)}... ({w.type})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Payload (Amount)</label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-primary font-mono select-none">Ð</span>
            <input
              id="amount"
              type="number"
              placeholder="0.00"
              min="0"
              step="any"
              className="w-full glass-input pl-10 font-mono"
            />
          </div>
        </div>

        <button
          onClick={handleSend}
          className="w-full btn-secondary mt-2 flex justify-center items-center gap-2"
        >
          Transmit Block
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TransactionForm;
