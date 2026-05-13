// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - BLOCK USER
// ═══════════════════════════════════════════

export default {
    command: 'block',
    aliases: ['banuser'],
    description: 'Block a user',
    category: 'owner',
    ownerOnly: true,
    execute: async (ctx) => {
        const { sock, args, reply, mentions } = ctx;

        let target = args[0];
        if (mentions.length > 0) {
            target = mentions[0];
        }

        if (!target) {
            return await reply('❌ Please mention a user or provide a number!\n\nUsage: *.block @user*');
        }

        target = target.replace(/[^0-9]/g, '') + '@s.whatsapp.net';

        try {
            await sock.updateBlockStatus(target, 'block');
            await reply(`✅ Blocked @${target.split('@')[0]}`, { mentions: [target] });
        } catch (error) {
            await reply(`❌ Failed to block user: ${error.message}`);
        }
    }
};
