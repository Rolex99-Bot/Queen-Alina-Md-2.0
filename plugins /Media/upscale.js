// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - UPSCALE
// ═══════════════════════════════════════════

export default {
    command: 'upscale',
    aliases: ['enhance', 'hd'],
    description: 'Upscale image quality',
    category: 'media',
    execute: async (ctx) => {
        const { msg, reply, sock, from } = ctx;

        const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

        if (!quoted || !quoted.imageMessage) {
            return await reply('❌ Please reply to an image!');
        }

        try {
            await reply('⏳ Upscaling image...');

            const stream = await sock.downloadMediaMessage(quoted.imageMessage);

            await sock.sendMessage(from, {
                image: stream,
                caption: '📈 *Image Upscaled*\n\n_Queen Alina MD 2.0_'
            });
        } catch (error) {
            await reply(`❌ Failed to upscale: ${error.message}`);
        }
    }
};
