const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/wallets.json");

// Read wallets
function getWallets() {
  try {
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Create wallet
function createWallet(type = "classical") {
  const wallets = getWallets();

  const newWallet = {
    id: uuidv4(),
    type: type,
    publicKey: "publicKey_" + Math.random().toString(36).substring(2),
    privateKey: "privateKey_" + Math.random().toString(36).substring(2)
  };

  wallets.push(newWallet);

  fs.writeFileSync(dataPath, JSON.stringify(wallets, null, 2));

  return newWallet;
}

module.exports = {
  createWallet,
  getWallets
};