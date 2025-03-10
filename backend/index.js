const express = require("express");
const cors = require("cors");
const { analyzeToken } = require("./solana");

const app = express();
app.use(cors());
app.use(express.json());

// Health Check
app.get("/", (req, res) => {
  res.send("RugChecker API is live 🚀");
});

// API to analyze a token
app.post("/analyze", async (req, res) => {
  const { mint, liquidity } = req.body;

  if (!mint || !liquidity) {
    return res.status(400).json({ error: "Mint and liquidity addresses are required" });
  }

  const result = await analyzeToken(mint, liquidity);
  res.json(result);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`RugChecker API running on http://localhost:${PORT}`);
});