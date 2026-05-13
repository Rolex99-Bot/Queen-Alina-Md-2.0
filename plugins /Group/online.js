// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - ONLINE LIST
// ═══════════════════════════════════════════

export default {
    command: 'online',
    aliases: ['listonline', 'active'],
    description: 'Show online members',
    category: 'group',
    groupOnly: true,
    execute: async (ctx) => {
        const { sock, from, reply } = ctx;

        try {
            const groupMetadata = await sock.groupMetadata(from);
            const online = groupMetadata.participants.filter(p => p.presence === 'available');

            let text = `🟢 *Online Members (${online.length}):*\n\n`;
            for (const member of online) {
                text += `• @${member.id.split('@')[0]}\n`;
            }

            await sock.sendMessage(from, {
                text,
                mentions: online.map(m => m.id)
            });
        } catch (error) {
            await reply(`❌ Failed to get online list: ${error.message}`);
        }
    }
};
