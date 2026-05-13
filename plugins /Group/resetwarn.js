// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - RESET WARN
// ═══════════════════════════════════════════

export default {
    command: 'resetwarn',
    aliases: ['clearwarn', 'unwarn'],
    description: 'Reset user warnings',
    category: 'group',
    groupOnly: true,
    adminOnly: true,
    execute: async (ctx) => {
        const { sock, args, reply, mentions, from, database } = ctx;

        let target = args[0];
        if (mentions.length > 0) {
            target = mentions[0];
        }

        if (!target) {
            return await reply('❌ Please mention a user!');
        }

        target = target.replace(/[^0-9]/g, '');

        try {
            await database.saveUser(target, { warnings: 0 });
            await reply(`✅ Warnings reset for @${target}!`, {
                mentions: [target + '@s.whatsapp.net']
            });
        } catch (error) {
            await reply(`❌ Failed to reset warnings: ${error.message}`);
        }
    }
};
