// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - SHUTDOWN
// ═══════════════════════════════════════════

export default {
    command: 'shutdown',
    aliases: ['stop', 'off'],
    description: 'Shutdown the bot',
    category: 'owner',
    ownerOnly: true,
    execute: async (ctx) => {
        const { reply } = ctx;

        await reply('👋 *Shutting down Queen Alina MD 2.0...*\n\nGoodbye!');

        setTimeout(() => {
            process.exit(1);
        }, 3000);
    }
};
