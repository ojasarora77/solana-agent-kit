use anchor_lang::prelude::*;
use anchor_spl::token::{TokenAccount, Mint};

declare_id!("2xPieqJRmxBd2HXUdZFLMJg63t1mQoLyo4Kpsr2DmXVJ");

#[program]
pub mod rug_checker {
    use super::*;

    pub fn analyze_token(ctx: Context<AnalyzeToken>) -> Result<()> {
        let mint = &ctx.accounts.mint;

        // 1️⃣ Check if mint authority is null (ownership renounced)
        let mut is_ownership_renounced = false;
        if mint.mint_authority.is_none() {
            is_ownership_renounced = true;
        }

        // 2️⃣ Get token supply
        let token_supply = mint.supply;

        // 3️⃣ Check if liquidity pool exists
        let has_liquidity = ctx.accounts.liquidity_account.amount > 0;

        // 4️⃣ Store analysis result
        let result = &mut ctx.accounts.analysis_result;
        result.is_safe = is_ownership_renounced && has_liquidity;
        result.token_supply = token_supply;

        msg!(
            "Token Analysis: Ownership Renounced: {}, Supply: {}, Has Liquidity: {}",
            is_ownership_renounced,
            token_supply,
            has_liquidity
        );

        Ok(())
    }
}

#[derive(Accounts)]
pub struct AnalyzeToken<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(mut)]
    pub mint: Account<'info, Mint>,

    #[account(mut)]
    pub liquidity_account: Account<'info, TokenAccount>,

    #[account(init, payer = signer, space = 8 + 16)]
    pub analysis_result: Account<'info, AnalysisResult>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct AnalysisResult {
    pub is_safe: bool,
    pub token_supply: u64,
}
