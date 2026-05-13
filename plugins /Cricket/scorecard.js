// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - SCORECARD
// ═══════════════════════════════════════════

export default {
    command: 'scorecard',
    aliases: ['card', 'fullscore'],
    description: 'Get full scorecard',
    category: 'cricket',
    execute: async (ctx) => {
        const { reply } = ctx;

        await reply(`🏏 *FULL SCORECARD* 🏏\n\n📊 Detailed match statistics...\n\n_Queen Alina MD 2.0_`);
    }
};
