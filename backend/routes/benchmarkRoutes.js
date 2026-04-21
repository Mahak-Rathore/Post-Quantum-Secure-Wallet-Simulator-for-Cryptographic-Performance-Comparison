const express = require("express");
const router = express.Router();

const { runBenchmark } = require("../services/benchmarkService");

router.get("/:type", (req, res) => {

  const type = req.params.type;

  const result = runBenchmark(type);

  res.json(result);
});

module.exports = router;