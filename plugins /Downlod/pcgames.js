// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - PC GAMES
// ═══════════════════════════════════════════

export default {
    command: 'pcgames',
    aliases: ['games', 'gamedl'],
    description: 'Search PC games',
    category: 'download',
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a game name!\n\nUsage: *.pcgames <name>*');
        }

        await reply(`🎮 *PC Game Search: ${fullArgs}*\n\n⏳ Searching...\n\n💡 This feature provides game information and official store links.`);
    }
};
