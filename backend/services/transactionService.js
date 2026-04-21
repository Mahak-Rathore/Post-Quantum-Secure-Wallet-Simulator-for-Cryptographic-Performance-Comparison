const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/transactions.json");

// Read transactions
function getTransactions() {
  try {
    if (!fs.existsSync(dataPath)) {
      fs.writeFileSync(dataPath, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function sendTransaction(fromWallet, toWallet, amount) {
  const transactions = getTransactions();

  const transaction = {
    from: fromWallet.publicKey,
    to: toWallet.publicKey,
    amount: amount,
    timestamp: Date.now()
  };

  // Simulated signature (hash)
  const signature = crypto
    .createHash("sha256")
    .update(JSON.stringify(transaction) + fromWallet.privateKey)
    .digest("hex");

  // Simulated verification
  const verifyHash = crypto
    .createHash("sha256")
    .update(JSON.stringify(transaction) + fromWallet.privateKey)
    .digest("hex");

  const verified = signature === verifyHash;

  const storedTransaction = {
    ...transaction,
    signature,
    verified
  };

  transactions.push(storedTransaction);

  // Save back to file
  fs.writeFileSync(dataPath, JSON.stringify(transactions, null, 2));

  return storedTransaction;
}

module.exports = { sendTransaction, getTransactions };