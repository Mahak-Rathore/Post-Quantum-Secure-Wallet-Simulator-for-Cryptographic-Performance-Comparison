const express = require("express");
const router = express.Router();
const experimentService = require("../services/experimentService");

// Run experiment
router.get("/run", (req, res) => {
  const result = experimentService.runExperiment();
  res.json(result);
});

// Get all stored results
router.get("/results", (req, res) => {
  const results = experimentService.getAllResults();
  res.json(results);
});

// Simulate Quantum Attack
router.post("/shors-attack", (req, res) => {
  try {
    const { wallet } = req.body;
    const attackResult = experimentService.simulateQuantumAttack(wallet);
    res.json(attackResult);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;