// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - TAG ALL
// ═══════════════════════════════════════════

export default {
    command: 'tagall',
    aliases: ['mentionall', 'all'],
    description: 'Tag all group members',
    category: 'group',
    groupOnly: true,
    adminOnly: true,
    execute: async (ctx) => {
        const { sock, from, reply, fullArgs } = ctx;

        try {
            const groupMetadata = await sock.groupMetadata(from);
            const participants = groupMetadata.participants;

            let text = fullArgs || '👋 Attention everyone!';
            text += '\n\n';

            const mentions = [];
            for (const participant of participants) {
                mentions.push(participant.id);
                text += `@${participant.id.split('@')[0]} `;
            }

            await sock.sendMessage(from, { text, mentions });
        } catch (error) {
            await reply(`❌ Failed to tag all: ${error.message}`);
        }
    }
};
