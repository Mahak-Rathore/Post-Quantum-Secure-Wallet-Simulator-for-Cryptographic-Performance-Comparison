const express = require("express");
const cors = require("cors");

const walletRoutes = require("./routes/walletRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const benchmarkRoutes = require("./routes/benchmarkRoutes");
const experimentRoutes = require("./routes/experimentRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Post Quantum Wallet Simulator API running");
});

// Wallet API
app.use("/api/wallets", walletRoutes);

// Transaction API
app.use("/api/transaction", transactionRoutes);

app.use("/api/benchmark", benchmarkRoutes);

app.use("/api/experiment", experimentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});