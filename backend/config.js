require("dotenv").config();
const { Connection, Keypair, PublicKey } = require("@solana/web3.js");

// Load env variables
const RPC_URL = process.env.RPC_URL || "https://api.devnet.solana.com";
const PROGRAM_ID = new PublicKey("2xPieqJRmxBd2HXUdZFLMJg63t1mQoLyo4Kpsr2DmXVJ"); // Replace with actual Program ID
const WALLET_PATH = process.env.WALLET_PATH || "/Users/ojasarora/.config/solana/id.json";

// Set up Solana connection
const connection = new Connection(RPC_URL, "confirmed");

module.exports = { connection, PROGRAM_ID, WALLET_PATH };