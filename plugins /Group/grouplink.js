// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - GROUP LINK
// ═══════════════════════════════════════════

export default {
    command: 'grouplink',
    aliases: ['link', 'invitelink'],
    description: 'Get group invite link',
    category: 'group',
    groupOnly: true,
    adminOnly: true,
    execute: async (ctx) => {
        const { sock, from, reply, isBotAdmin } = ctx;

        if (!isBotAdmin) {
            return await reply('❌ I need to be an admin!');
        }

        try {
            const link = await sock.groupInviteCode(from);
            await reply(`🔗 *Group Invite Link:*\n\nhttps://chat.whatsapp.com/${link}\n\n⚠️ Don't share with strangers!`);
        } catch (error) {
            await reply(`❌ Failed to get link: ${error.message}`);
        }
    }
};
