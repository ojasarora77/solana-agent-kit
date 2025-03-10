const anchor = require("@project-serum/anchor");
const { Keypair, PublicKey } = require("@solana/web3.js");
const { connection, PROGRAM_ID, WALLET_PATH } = require("./config");
const fs = require("fs");

// Load wallet keypair
const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync(WALLET_PATH)));
const wallet = Keypair.fromSecretKey(secretKey);

// Set up Anchor provider
const provider = new anchor.AnchorProvider(connection, new anchor.Wallet(wallet), {
  commitment: "confirmed",
});
anchor.setProvider(provider);

// Load Program IDL
const idl = require("./idl.json"); // Export IDL from Anchor
const program = new anchor.Program(idl, PROGRAM_ID, provider);

/**
 * Call analyze_token in the smart contract
 */
async function analyzeToken(mintAddress, liquidityAccount) {
  try {
    const mintPubkey = new PublicKey(mintAddress);
    const liquidityPubkey = new PublicKey(liquidityAccount);

    // Generate new account to store analysis result
    const analysisResult = anchor.web3.Keypair.generate();

    // Call smart contract function
    const tx = await program.methods
      .analyzeToken()
      .accounts({
        signer: wallet.publicKey,
        mint: mintPubkey,
        liquidityAccount: liquidityPubkey,
        analysisResult: analysisResult.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([wallet, analysisResult])
      .rpc();

    console.log("Transaction Signature:", tx);
    return { success: true, tx };
  } catch (error) {
    console.error("Error in analyzeToken:", error);
    return { success: false, error: error.message };
  }
}

module.exports = { analyzeToken };