// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - UNBLOCK USER
// ═══════════════════════════════════════════

export default {
    command: 'unblock',
    aliases: ['unbanuser'],
    description: 'Unblock a user',
    category: 'owner',
    ownerOnly: true,
    execute: async (ctx) => {
        const { sock, args, reply, mentions } = ctx;

        let target = args[0];
        if (mentions.length > 0) {
            target = mentions[0];
        }

        if (!target) {
            return await reply('❌ Please mention a user or provide a number!\n\nUsage: *.unblock @user*');
        }

        target = target.replace(/[^0-9]/g, '') + '@s.whatsapp.net';

        try {
            await sock.updateBlockStatus(target, 'unblock');
            await reply(`✅ Unblocked @${target.split('@')[0]}`, { mentions: [target] });
        } catch (error) {
            await reply(`❌ Failed to unblock user: ${error.message}`);
        }
    }
};
