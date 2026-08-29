import React from 'react';

const TransactionHistory = ({ transactions }) => {
  return (
    <div className="glass-panel p-6 flex-1 flex flex-col h-full max-h-[500px]">
      <div className="flex items-center gap-3 mb-6 shrink-0">
        <div className="bg-white/10 p-2 rounded-lg border border-white/20">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h2 className="text-xl font-display font-semibold">Ledger Stream</h2>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {transactions.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-white/30 space-y-4">
            <svg className="w-16 h-16 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            <p className="font-mono text-sm">AWAITING_TRANSACTIONS...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.slice(0).reverse().map((tx, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-xl border ${tx.verified ? 'border-success/20 bg-success/5' : 'border-accent/20 bg-accent/5'} flex flex-col gap-4 group hover:bg-white/5 transition-colors`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${tx.verified ? 'bg-success shadow-[0_0_8px_#00ffaa]' : 'bg-accent shadow-[0_0_8px_#ff003c]'}`}></div>
                    <div className="text-sm font-medium text-white/90">
                      <span className="text-secondary/70">Amount:</span> <span className="font-mono text-base">{tx.amount}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    {tx.verified ? (
                      <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-md border border-success/30 font-medium tracking-wide">VERIFIED</span>
                    ) : (
                      <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-md border border-accent/30 font-medium tracking-wide">FAILED</span>
                    )}
                    <span className="text-[10px] text-white/30 font-mono">T-{transactions.length - index}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 text-[10px] font-mono text-white/50 w-full bg-black/10 rounded-lg p-3 border border-white/5">
                  <div className="flex flex-col gap-1">
                    <span className="text-secondary font-semibold uppercase tracking-wider text-[9px]">Sender Signature (From)</span>
                    <div className="bg-black/40 p-2.5 rounded max-h-20 overflow-y-auto custom-scrollbar break-all hover:text-white/80 transition-colors">
                      {tx.from}
                    </div>
                  </div>
                  <div className="flex w-full justify-center opacity-30">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-primary font-semibold uppercase tracking-wider text-[9px]">Receiver Address (To)</span>
                    <div className="bg-black/40 p-2.5 rounded max-h-20 overflow-y-auto custom-scrollbar break-all hover:text-white/80 transition-colors">
                      {tx.to}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
