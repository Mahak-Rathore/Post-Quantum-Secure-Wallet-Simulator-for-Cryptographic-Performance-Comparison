const express = require("express");
const router = express.Router();

const walletService = require("../services/walletService");

// Create a wallet
router.post("/create", (req, res) => {
  const { type } = req.body;   // get wallet type from request

  const wallet = walletService.createWallet(type);

  res.json(wallet);
});

// Get all wallets
router.get("/", (req, res) => {
  const wallets = walletService.getWallets();
  res.json(wallets);
});

module.exports = router;