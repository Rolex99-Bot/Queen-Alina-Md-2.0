// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - PLAY STORE
// ═══════════════════════════════════════════

export default {
    command: 'playstore',
    aliases: ['app', 'android'],
    description: 'Search Play Store apps',
    category: 'search',
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide an app name!\n\nUsage: *.playstore <app name>*');
        }

        await reply(`📱 *Play Store Search: ${fullArgs}*\n\n⏳ Searching...\n\n_Queen Alina MD 2.0_`);
    }
};
