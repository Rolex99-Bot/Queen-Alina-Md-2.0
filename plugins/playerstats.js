// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - PLAYER STATS
// ═══════════════════════════════════════════

export default {
    command: 'playerstats',
    aliases: ['player', 'stats'],
    description: 'Get player statistics',
    category: 'cricket',
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a player name!\n\nUsage: *.playerstats <name>*');
        }

        await reply(`🏏 *Player Stats: ${fullArgs}*\n\n📊 Loading statistics...\n\n_Queen Alina MD 2.0_`);
    }
};
