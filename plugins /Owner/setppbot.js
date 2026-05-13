// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - SET BOT PP
// ═══════════════════════════════════════════

export default {
    command: 'setppbot',
    aliases: ['setbotpp', 'botpp'],
    description: 'Set bot profile picture',
    category: 'owner',
    ownerOnly: true,
    execute: async (ctx) => {
        const { sock, msg, reply } = ctx;

        const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

        if (!quoted || !quoted.imageMessage) {
            return await reply('❌ Please reply to an image!');
        }

        try {
            const stream = await sock.downloadMediaMessage(quoted.imageMessage);
            await sock.updateProfilePicture(sock.user.id, stream);
            await reply('✅ Bot profile picture updated!');
        } catch (error) {
            await reply(`❌ Failed to update profile picture: ${error.message}`);
        }
    }
};
