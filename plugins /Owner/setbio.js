// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - SET BIO
// ═══════════════════════════════════════════

export default {
    command: 'setbio',
    aliases: ['setstatus', 'bio'],
    description: 'Set bot status/bio',
    category: 'owner',
    ownerOnly: true,
    execute: async (ctx) => {
        const { sock, fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a bio text!\n\nUsage: *.setbio <text>*');
        }

        try {
            await sock.updateProfileStatus(fullArgs);
            await reply('✅ Bio updated successfully!');
        } catch (error) {
            await reply(`❌ Failed to update bio: ${error.message}`);
        }
    }
};
