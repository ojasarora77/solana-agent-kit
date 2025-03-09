use anchor_lang::prelude::*;

declare_id!("2xPieqJRmxBd2HXUdZFLMJg63t1mQoLyo4Kpsr2DmXVJ");

#[program]
pub mod solana_agent_kit {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Solana Agent Kit initialized!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
