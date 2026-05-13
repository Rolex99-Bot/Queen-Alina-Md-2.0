// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - SET NAME
// ═══════════════════════════════════════════

export default {
    command: 'setname',
    aliases: ['setbotname', 'botname'],
    description: 'Set bot display name',
    category: 'owner',
    ownerOnly: true,
    execute: async (ctx) => {
        const { sock, fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a name!\n\nUsage: *.setname <name>*');
        }

        try {
            await sock.updateProfileName(fullArgs);
            await reply(`✅ Bot name changed to: *${fullArgs}*`);
        } catch (error) {
            await reply(`❌ Failed to update name: ${error.message}`);
        }
    }
};
