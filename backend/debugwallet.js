const fs = require('fs');

const WALLET_PATH = "/Users/ojasarora/.config/solana/id.json";  // Use your actual absolute path

try {
    if (!fs.existsSync(WALLET_PATH)) {
        throw new Error("File does not exist: " + WALLET_PATH);
    }

    const secretKey = JSON.parse(fs.readFileSync(WALLET_PATH, 'utf-8'));
    console.log("Successfully loaded wallet!");
} catch (err) {
    console.error("Error loading wallet:", err.message);
}