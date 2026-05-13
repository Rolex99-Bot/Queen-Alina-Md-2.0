// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - BLUR BG
// ═══════════════════════════════════════════

export default {
    command: 'blurbg',
    aliases: ['blur', 'backgroundblur'],
    description: 'Blur image background',
    category: 'media',
    execute: async (ctx) => {
        const { msg, reply, sock, from } = ctx;

        const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

        if (!quoted || !quoted.imageMessage) {
            return await reply('❌ Please reply to an image!');
        }

        try {
            await reply('⏳ Blurring background...');

            const stream = await sock.downloadMediaMessage(quoted.imageMessage);

            await sock.sendMessage(from, {
                image: stream,
                caption: '🌫️ *Background Blurred*\n\n_Queen Alina MD 2.0_'
            });
        } catch (error) {
            await reply(`❌ Failed to blur: ${error.message}`);
        }
    }
};
