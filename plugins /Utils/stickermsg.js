// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - STICKER MESSAGE
// ═══════════════════════════════════════════

export default {
    command: 'stickermsg',
    aliases: ['smsg', 'stickmsg'],
    description: 'Convert text to sticker',
    category: 'utils',
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide text!\n\nUsage: *.stickermsg <text>*');
        }

        await reply(`🎨 *Text to Sticker*\n\nText: ${fullArgs}\n\n_Queen Alina MD 2.0_`);
    }
};
