import React from 'react';

const Header = ({ onRunExperiment }) => {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between py-6 px-8 mb-8 border-b border-white/10 bg-surface/30 backdrop-blur-sm relative z-10 w-full overflow-hidden">
      <div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-white tracking-wide">
          Post-Quantum <span className="text-primary glow-text">Wallet Simulator</span>
        </h1>
      </div>

      <button
        onClick={onRunExperiment}
        className="mt-6 md:mt-0 flex items-center gap-3 bg-gradient-to-r from-primary/80 to-secondary/80 hover:from-primary hover:to-secondary text-white font-semibold py-3 px-8 rounded-xl shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:scale-105 transition-all duration-300"
      >
        <svg className="w-5 h-5 animate-spin-slow origin-center" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
        </svg>
        Run New Experiment
      </button>

      {/* Background glowing orb for subtle effect */}
      <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
    </header>
  );
};

export default Header;
