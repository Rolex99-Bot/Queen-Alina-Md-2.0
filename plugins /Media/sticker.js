// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - STICKER
// ═══════════════════════════════════════════

export default {
    command: 'sticker',
    aliases: ['s', 'stick'],
    description: 'Convert image/video to sticker',
    category: 'media',
    execute: async (ctx) => {
        const { msg, reply, sock, from } = ctx;

        const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

        if (!quoted || (!quoted.imageMessage && !quoted.videoMessage)) {
            return await reply('❌ Please reply to an image or video!');
        }

        try {
            await reply('⏳ Converting to sticker...');

            const mediaMessage = quoted.imageMessage || quoted.videoMessage;
            const stream = await sock.downloadMediaMessage(mediaMessage);

            await sock.sendMessage(from, {
                sticker: stream,
                caption: '🎨 *Sticker by Queen Alina MD 2.0*'
            });
        } catch (error) {
            await reply(`❌ Failed to create sticker: ${error.message}`);
        }
    }
};
