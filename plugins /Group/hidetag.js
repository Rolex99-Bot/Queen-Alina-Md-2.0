// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - HIDE TAG
// ═══════════════════════════════════════════

export default {
    command: 'hidetag',
    aliases: ['hidden', 'ghost'],
    description: 'Tag all members with hidden mentions',
    category: 'group',
    groupOnly: true,
    adminOnly: true,
    execute: async (ctx) => {
        const { sock, from, reply, fullArgs } = ctx;

        try {
            const groupMetadata = await sock.groupMetadata(from);
            const participants = groupMetadata.participants;

            const mentions = participants.map(p => p.id);

            await sock.sendMessage(from, {
                text: fullArgs || '👻 Hidden mention!',
                mentions
            });
        } catch (error) {
            await reply(`❌ Failed to hide tag: ${error.message}`);
        }
    }
};
