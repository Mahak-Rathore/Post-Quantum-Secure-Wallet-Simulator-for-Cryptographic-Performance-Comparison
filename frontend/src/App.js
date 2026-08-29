import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

// Components
import Header from "./components/Header";
import WalletCreator from "./components/WalletCreator";
import TransactionForm from "./components/TransactionForm";
import TransactionHistory from "./components/TransactionHistory";
import PerformanceChart from "./components/PerformanceChart";
import QuantumAttack from "./components/QuantumAttack";

// Register Chart.js elements
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function App() {
  const [results, setResults] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // Fetch results
  const fetchResults = () => {
    fetch("http://localhost:5000/api/experiment/results")
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(err => console.error("Error fetching results", err));
  };

  useEffect(() => {
    fetchResults();
  }, []);

  // Run experiment
  const runExperiment = () => {
    fetch("http://localhost:5000/api/experiment/run")
      .then(res => res.json())
      .then(() => fetchResults())
      .catch(err => console.error("Error running experiment", err));
  };

  const handleWalletCreated = (newWallet) => {
    setWallets(prev => [...prev, newWallet]);
  };

  const handleTransactionSent = (newTx) => {
    setTransactions(prev => [...prev, newTx]);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      <Header onRunExperiment={runExperiment} />

      <main className="space-y-6">
        {/* Top Grid: 2x2 Layout for Operational Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WalletCreator onWalletCreated={handleWalletCreated} wallets={wallets} />
          
          <QuantumAttack wallets={wallets} />
          
          <TransactionForm wallets={wallets} onTransactionSent={handleTransactionSent} />
          
          <TransactionHistory transactions={transactions} />
        </div>

        {/* Bottom Section: Performance Metrics */}
        <PerformanceChart results={results} />
      </main>
    </div>
  );
}

export default App;