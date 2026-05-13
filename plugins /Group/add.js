// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - ADD
// ═══════════════════════════════════════════

export default {
    command: 'add',
    aliases: ['invite'],
    description: 'Add user to group',
    category: 'group',
    groupOnly: true,
    adminOnly: true,
    execute: async (ctx) => {
        const { sock, args, reply, from, isBotAdmin } = ctx;

        if (!isBotAdmin) {
            return await reply('❌ I need to be an admin to add users!');
        }

        if (!args[0]) {
            return await reply('❌ Please provide a phone number!\n\nUsage: *.add 94775153939*');
        }

        const target = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';

        try {
            await sock.groupParticipantsUpdate(from, [target], 'add');
            await reply(`✅ Added @${target.split('@')[0]} to the group!`, { mentions: [target] });
        } catch (error) {
            await reply(`❌ Failed to add user: ${error.message}`);
        }
    }
};
