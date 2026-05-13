// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - OPEN GROUP
// ═══════════════════════════════════════════

export default {
    command: 'open',
    aliases: ['unlock', 'opengroup'],
    description: 'Open group for everyone',
    category: 'group',
    groupOnly: true,
    adminOnly: true,
    execute: async (ctx) => {
        const { sock, from, reply, isBotAdmin } = ctx;

        if (!isBotAdmin) {
            return await reply('❌ I need to be an admin!');
        }

        try {
            await sock.groupSettingUpdate(from, 'not_announcement');
            await reply('🔓 Group is now *OPEN*! Everyone can send messages.');
        } catch (error) {
            await reply(`❌ Failed to open group: ${error.message}`);
        }
    }
};
