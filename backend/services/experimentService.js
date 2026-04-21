const fs = require("fs");
const path = require("path");
const { runBenchmark } = require("./benchmarkService");

const resultsPath = path.join(__dirname, "../data/results.json");

function runExperiment() {

  const classical = runBenchmark("classical");
  const postQuantum = runBenchmark("post-quantum");

  const experimentResult = {
    timestamp: Date.now(),
    experiment: "Post Quantum Wallet Performance Comparison",
    classical,
    postQuantum
  };

  // Read existing results
  let results = [];

  if (fs.existsSync(resultsPath)) {
    const data = fs.readFileSync(resultsPath);
    results = JSON.parse(data);
  }

  // Add new result
  results.push(experimentResult);

  // Save back to file
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));

  return experimentResult;
}

function getAllResults() {
  if (!fs.existsSync(resultsPath)) {
    return [];
  }

  const data = fs.readFileSync(resultsPath);
  return JSON.parse(data);
}

function simulateQuantumAttack(wallet) {
  if (!wallet || !wallet.type) {
    throw new Error("Invalid wallet provided for attack simulation");
  }

  if (wallet.type === "classical") {
    // Simulate Shor's algorithm breaking RSA/ECC
    // Time complexity O((log N)^3)
    const simulatedQubits = Math.floor(Math.random() * (4096 - 2048) + 2048);
    return {
      status: "COMPROMISED",
      message: "Classical cryptographic key factored using Shor's Algorithm.",
      timeTaken: `${(Math.random() * 5 + 0.5).toFixed(2)}s (Simulated)`,
      qubitsUsed: simulatedQubits,
      success: true
    };
  } else {
    // Lattice-based cryptography implies O(2^n) time essentially blocking quantum computers
    return {
      status: "SECURE",
      message: "Lattice-based mathematical structure resisted quantum factorization.",
      timeTaken: "∞ (Exponentially secure)",
      qubitsUsed: "N/A",
      success: false
    };
  }
}

module.exports = { runExperiment, getAllResults, simulateQuantumAttack };