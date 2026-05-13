// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - DEMOTE
// ═══════════════════════════════════════════

export default {
    command: 'demote',
    aliases: ['removeadmin', 'unadmin'],
    description: 'Demote admin to member',
    category: 'group',
    groupOnly: true,
    adminOnly: true,
    execute: async (ctx) => {
        const { sock, args, reply, mentions, from, isBotAdmin } = ctx;

        if (!isBotAdmin) {
            return await reply('❌ I need to be an admin to demote users!');
        }

        let target = args[0];
        if (mentions.length > 0) {
            target = mentions[0];
        }

        if (!target) {
            return await reply('❌ Please mention a user to demote!');
        }

        target = target.replace(/[^0-9]/g, '') + '@s.whatsapp.net';

        try {
            await sock.groupParticipantsUpdate(from, [target], 'demote');
            await reply(`👤 Demoted @${target.split('@')[0]} to member!`, { mentions: [target] });
        } catch (error) {
            await reply(`❌ Failed to demote user: ${error.message}`);
        }
    }
};
