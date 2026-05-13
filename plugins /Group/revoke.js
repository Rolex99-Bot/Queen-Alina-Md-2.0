// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - REVOKE LINK
// ═══════════════════════════════════════════

export default {
    command: 'revoke',
    aliases: ['resetlink', 'newlink'],
    description: 'Revoke and reset group link',
    category: 'group',
    groupOnly: true,
    adminOnly: true,
    execute: async (ctx) => {
        const { sock, from, reply, isBotAdmin } = ctx;

        if (!isBotAdmin) {
            return await reply('❌ I need to be an admin!');
        }

        try {
            await sock.groupRevokeInvite(from);
            const newLink = await sock.groupInviteCode(from);
            await reply(`🔄 *Link Revoked!*\n\nNew Link: https://chat.whatsapp.com/${newLink}`);
        } catch (error) {
            await reply(`❌ Failed to revoke link: ${error.message}`);
        }
    }
};
