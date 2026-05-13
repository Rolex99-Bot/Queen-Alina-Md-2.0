// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - ATTP (ANIMATED TEXT)
// ═══════════════════════════════════════════

export default {
    command: 'attp',
    aliases: ['animatedtext', 'textgif'],
    description: 'Create animated text sticker',
    category: 'media',
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide text!\n\nUsage: *.attp <text>*');
        }

        await reply(`🎨 *Animated Text*\n\nText: ${fullArgs}\n\n_Queen Alina MD 2.0_`);
    }
};
