// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - RESTART
// ═══════════════════════════════════════════

export default {
    command: 'restart',
    aliases: ['reboot', 'reload'],
    description: 'Restart the bot',
    category: 'owner',
    ownerOnly: true,
    execute: async (ctx) => {
        const { reply } = ctx;

        await reply('🔄 *Restarting Queen Alina MD 2.0...*\n\nPlease wait...');

        setTimeout(() => {
            process.exit(0);
        }, 3000);
    }
};
