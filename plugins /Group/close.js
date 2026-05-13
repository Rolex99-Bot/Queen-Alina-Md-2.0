// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - CLOSE GROUP
// ═══════════════════════════════════════════

export default {
    command: 'close',
    aliases: ['lock', 'closegroup'],
    description: 'Close group for admins only',
    category: 'group',
    groupOnly: true,
    adminOnly: true,
    execute: async (ctx) => {
        const { sock, from, reply, isBotAdmin } = ctx;

        if (!isBotAdmin) {
            return await reply('❌ I need to be an admin!');
        }

        try {
            await sock.groupSettingUpdate(from, 'announcement');
            await reply('🔒 Group is now *CLOSED*! Only admins can send messages.');
        } catch (error) {
            await reply(`❌ Failed to close group: ${error.message}`);
        }
    }
};
