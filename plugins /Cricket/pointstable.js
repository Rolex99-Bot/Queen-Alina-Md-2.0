// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - POINTS TABLE
// ═══════════════════════════════════════════

export default {
    command: 'pointstable',
    aliases: ['points', 'table'],
    description: 'Get tournament points table',
    category: 'cricket',
    execute: async (ctx) => {
        const { reply } = ctx;

        await reply(`🏆 *POINTS TABLE* 🏆\n\n📊 Loading tournament standings...\n\n_Queen Alina MD 2.0_`);
    }
};
