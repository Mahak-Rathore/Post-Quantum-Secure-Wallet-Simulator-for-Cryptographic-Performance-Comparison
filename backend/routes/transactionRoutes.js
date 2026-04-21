const express = require("express");
const router = express.Router();

const transactionService = require("../services/transactionService");

router.post("/send", (req, res) => {
  const { fromWallet, toWallet, amount } = req.body;

  const transaction = transactionService.sendTransaction(
    fromWallet,
    toWallet,
    amount
  );

  res.json(transaction);
});

module.exports = router;