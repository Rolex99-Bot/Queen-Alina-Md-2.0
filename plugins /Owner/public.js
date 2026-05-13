// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - PUBLIC MODE
// ═══════════════════════════════════════════

export default {
    command: 'public',
    aliases: ['publicmode'],
    description: 'Set bot to public mode',
    category: 'owner',
    ownerOnly: true,
    execute: async (ctx) => {
        const { reply, config } = ctx;

        config.bot.mode = 'public';
        await reply('✅ Bot mode set to *PUBLIC*\n\nEveryone can use commands now.');
    }
};
