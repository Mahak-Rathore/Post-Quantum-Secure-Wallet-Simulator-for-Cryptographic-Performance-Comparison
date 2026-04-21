const crypto = require("crypto");

function generateKeys(type) {

  // Classical cryptography
  if (type === "classical") {

    const publicKey = "classical_public_" + crypto.randomBytes(8).toString("hex");
    const privateKey = "classical_private_" + crypto.randomBytes(8).toString("hex");

    return { publicKey, privateKey };
  }

  // Post‑Quantum (simulated Dilithium)
  if (type === "post-quantum") {

    const publicKey = "pq_public_" + crypto.randomBytes(16).toString("hex");
    const privateKey = "pq_private_" + crypto.randomBytes(16).toString("hex");

    return { publicKey, privateKey };
  }

}

module.exports = { generateKeys };