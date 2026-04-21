const { generateKeys } = require("./cryptoService");
const crypto = require("crypto");

function runBenchmark(type) {

  const iterations = 100;

  let keyGenTotal = 0;
  let signTotal = 0;
  let verifyTotal = 0;

  let keySize = 0;
  let signatureSize = 0;

  for (let i = 0; i < iterations; i++) {

    const startKey = Date.now();
    const keys = generateKeys(type);
    keyGenTotal += Date.now() - startKey;

    // measure key size (only once)
    if (i === 0) {
      keySize = Buffer.byteLength(keys.publicKey, "utf8");
    }

    const transaction = {
      from: keys.publicKey,
      to: "receiver",
      amount: 10,
      timestamp: Date.now()
    };

    const startSign = Date.now();

    const signature = crypto
      .createHash("sha256")
      .update(JSON.stringify(transaction) + keys.privateKey)
      .digest("hex");

    signTotal += Date.now() - startSign;

    // measure signature size
    if (i === 0) {
      signatureSize = Buffer.byteLength(signature, "utf8");
    }

    const startVerify = Date.now();

    const verifyHash = crypto
      .createHash("sha256")
      .update(JSON.stringify(transaction) + keys.privateKey)
      .digest("hex");

    const verified = signature === verifyHash;

    verifyTotal += Date.now() - startVerify;
  }

  return {
    algorithm: type,
    iterations,
    keySize,
    signatureSize,
    avgKeyGenerationTime: keyGenTotal / iterations,
    avgSigningTime: signTotal / iterations,
    avgVerificationTime: verifyTotal / iterations
  };
}

module.exports = { runBenchmark };