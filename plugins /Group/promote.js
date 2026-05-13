// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - PROMOTE
// ═══════════════════════════════════════════

export default {
    command: 'promote',
    aliases: ['admin', 'makeadmin'],
    description: 'Promote user to admin',
    category: 'group',
    groupOnly: true,
    adminOnly: true,
    execute: async (ctx) => {
        const { sock, args, reply, mentions, from, isBotAdmin } = ctx;

        if (!isBotAdmin) {
            return await reply('❌ I need to be an admin to promote users!');
        }

        let target = args[0];
        if (mentions.length > 0) {
            target = mentions[0];
        }

        if (!target) {
            return await reply('❌ Please mention a user to promote!');
        }

        target = target.replace(/[^0-9]/g, '') + '@s.whatsapp.net';

        try {
            await sock.groupParticipantsUpdate(from, [target], 'promote');
            await reply(`👑 Promoted @${target.split('@')[0]} to admin!`, { mentions: [target] });
        } catch (error) {
            await reply(`❌ Failed to promote user: ${error.message}`);
        }
    }
};
