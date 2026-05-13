// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - WARN
// ═══════════════════════════════════════════

export default {
    command: 'warn',
    aliases: ['warning'],
    description: 'Warn a user',
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
            return await reply('❌ Please mention a user to warn!');
        }

        target = target.replace(/[^0-9]/g, '');

        try {
            const userData = await database.getUser(target) || { userId: target, warnings: 0 };
            userData.warnings = (userData.warnings || 0) + 1;

            await database.saveUser(target, userData);

            const warnText = `
⚠️ *WARNING* ⚠️

👤 User: @${target}
⚠️ Warnings: ${userData.warnings}/3
👮 Admin: @${ctx.sender.split('@')[0]}

${userData.warnings >= 3 ? '🚫 *User has reached maximum warnings!*' : ''}
`;

            await sock.sendMessage(from, {
                text: warnText,
                mentions: [target + '@s.whatsapp.net', ctx.sender]
            });
        } catch (error) {
            await reply(`❌ Failed to warn user: ${error.message}`);
        }
    }
};
