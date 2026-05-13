// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - TO IMAGE
// ═══════════════════════════════════════════

export default {
    command: 'toimg',
    aliases: ['toimage', 'stickertoimage'],
    description: 'Convert sticker to image',
    category: 'media',
    execute: async (ctx) => {
        const { msg, reply, sock, from } = ctx;

        const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

        if (!quoted || !quoted.stickerMessage) {
            return await reply('❌ Please reply to a sticker!');
        }

        try {
            await reply('⏳ Converting to image...');

            const stream = await sock.downloadMediaMessage(quoted.stickerMessage);

            await sock.sendMessage(from, {
                image: stream,
                caption: '🖼️ *Sticker to Image*\n\n_Queen Alina MD 2.0_'
            });
        } catch (error) {
            await reply(`❌ Failed to convert: ${error.message}`);
        }
    }
};
