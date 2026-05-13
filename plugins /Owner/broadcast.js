// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - BROADCAST
// ═══════════════════════════════════════════

export default {
    command: 'broadcast',
    aliases: ['bc', 'announce'],
    description: 'Broadcast message to all chats',
    category: 'owner',
    ownerOnly: true,
    execute: async (ctx) => {
        const { sock, fullArgs, reply, from } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a message to broadcast!\n\nUsage: *.broadcast <message>*');
        }

        const broadcastText = `
📢 *BROADCAST MESSAGE* 📢

${fullArgs}

👑 *From:* Queen Alina MD 2.0
⏰ *Time:* ${new Date().toLocaleString()}
`;

        // Get all chats
        const chats = await sock.groupFetchAllParticipating();
        const privateChats = Object.keys(chats).length;

        let sent = 0;
        let failed = 0;

        // Broadcast to groups
        for (const [jid, chat] of Object.entries(chats)) {
            try {
                await sock.sendMessage(jid, { text: broadcastText });
                sent++;
                await new Promise(r => setTimeout(r, 1000)); // Delay to avoid spam
            } catch {
                failed++;
            }
        }

        await reply(`✅ *Broadcast Complete!*\n\n📤 Sent: ${sent}\n❌ Failed: ${failed}\n📊 Total: ${sent + failed}`);
    }
};
