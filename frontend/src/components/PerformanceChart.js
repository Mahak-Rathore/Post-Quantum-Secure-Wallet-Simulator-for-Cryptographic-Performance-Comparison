import React from 'react';
import { Bar } from 'react-chartjs-2';

const PerformanceChart = ({ results }) => {
  if (results.length === 0) return null;

  const latestResult = results[results.length - 1];

  const chartData = {
    labels: ["Key Gen (ms)", "Sign (ms)", "Verify (ms)"],
    datasets: [
      {
        label: "Classical (RSA/ECC)",
        data: [
          latestResult.classical.avgKeyGenerationTime,
          latestResult.classical.avgSigningTime,
          latestResult.classical.avgVerificationTime
        ],
        backgroundColor: "rgba(112, 0, 255, 0.7)",
        borderColor: "#7000ff",
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: "Post‑Quantum",
        data: [
          latestResult.postQuantum.avgKeyGenerationTime,
          latestResult.postQuantum.avgSigningTime,
          latestResult.postQuantum.avgVerificationTime
        ],
        backgroundColor: "rgba(0, 240, 255, 0.7)",
        borderColor: "#00f0ff",
        borderWidth: 1,
        borderRadius: 4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: "'Inter', sans-serif"
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(10, 10, 15, 0.9)',
        titleColor: '#fff',
        bodyColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6
      }
    },
    scales: {
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: 'rgba(255, 255, 255, 0.5)' }
      },
      x: {
        grid: { display: false },
        ticks: { color: 'rgba(255, 255, 255, 0.7)' }
      }
    }
  };

  return (
    <div className="mt-8 space-y-8 animate-fade-in pb-12">
      {/* Metrics Table */}
      <div className="glass-panel overflow-hidden">
        <div className="p-6 border-b border-white/10 bg-white/5">
          <h2 className="text-xl font-display font-semibold flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            Cryptographic Overhead Analysis
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-black/20 text-white/50 font-mono text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Paradigm</th>
                <th className="px-6 py-4 font-medium">Key Size</th>
                <th className="px-6 py-4 font-medium">Sig Size</th>
                <th className="px-6 py-4 font-medium">Gen Time</th>
                <th className="px-6 py-4 font-medium">Sign Time</th>
                <th className="px-6 py-4 font-medium">Verify Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 border-l-4 border-secondary font-medium tracking-wide">Classical</td>
                <td className="px-6 py-4 font-mono text-white/70">{latestResult.classical.keySize}</td>
                <td className="px-6 py-4 font-mono text-white/70">{latestResult.classical.signatureSize}</td>
                <td className="px-6 py-4 font-mono text-white/70">{latestResult.classical.avgKeyGenerationTime.toFixed(2)} ms</td>
                <td className="px-6 py-4 font-mono text-white/70">{latestResult.classical.avgSigningTime.toFixed(2)} ms</td>
                <td className="px-6 py-4 font-mono text-white/70">{latestResult.classical.avgVerificationTime.toFixed(2)} ms</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors bg-white/[0.02]">
                <td className="px-6 py-4 border-l-4 border-primary font-medium tracking-wide">Post-Quantum</td>
                <td className="px-6 py-4 font-mono text-white/70">{latestResult.postQuantum.keySize}</td>
                <td className="px-6 py-4 font-mono text-white/70">{latestResult.postQuantum.signatureSize}</td>
                <td className="px-6 py-4 font-mono text-white/70">{latestResult.postQuantum.avgKeyGenerationTime.toFixed(2)} ms</td>
                <td className="px-6 py-4 font-mono text-white/70">{latestResult.postQuantum.avgSigningTime.toFixed(2)} ms</td>
                <td className="px-6 py-4 font-mono text-white/70">{latestResult.postQuantum.avgVerificationTime.toFixed(2)} ms</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Chart */}
      <div className="glass-panel p-6 h-[400px]">
        <h3 className="text-lg font-display font-medium mb-6 text-white/80">Latency Comparison (ms)</h3>
        <div className="w-full h-[300px]">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
