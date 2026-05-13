// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - KICK
// ═══════════════════════════════════════════

export default {
    command: 'kick',
    aliases: ['remove', 'ban'],
    description: 'Kick user from group',
    category: 'group',
    groupOnly: true,
    adminOnly: true,
    execute: async (ctx) => {
        const { sock, args, reply, mentions, from, isBotAdmin } = ctx;

        if (!isBotAdmin) {
            return await reply('❌ I need to be an admin to kick users!');
        }

        let target = args[0];
        if (mentions.length > 0) {
            target = mentions[0];
        }

        if (!target) {
            return await reply('❌ Please mention a user to kick!\n\nUsage: *.kick @user*');
        }

        target = target.replace(/[^0-9]/g, '') + '@s.whatsapp.net';

        try {
            await sock.groupParticipantsUpdate(from, [target], 'remove');
            await reply(`👢 Kicked @${target.split('@')[0]} from the group!`, { mentions: [target] });
        } catch (error) {
            await reply(`❌ Failed to kick user: ${error.message}`);
        }
    }
};
