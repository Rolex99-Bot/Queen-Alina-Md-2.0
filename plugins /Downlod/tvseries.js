// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - TV SERIES
// ═══════════════════════════════════════════

export default {
    command: 'tvseries',
    aliases: ['tv', 'series'],
    description: 'Search TV series',
    category: 'download',
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a series name!\n\nUsage: *.tvseries <name>*');
        }

        await reply(`📺 *TV Series Search: ${fullArgs}*\n\n⏳ Searching...\n\n💡 Try: *.imdb ${fullArgs}* for detailed info`);
    }
};
