// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - PRIVATE MODE
// ═══════════════════════════════════════════

export default {
    command: 'private',
    aliases: ['privatemode'],
    description: 'Set bot to private mode',
    category: 'owner',
    ownerOnly: true,
    execute: async (ctx) => {
        const { reply, config } = ctx;

        config.bot.mode = 'private';
        await reply('🔒 Bot mode set to *PRIVATE*\n\nOnly owner can use commands now.');
    }
};
