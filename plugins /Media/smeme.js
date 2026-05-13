// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - SMEME (STICKER MEME)
// ═══════════════════════════════════════════

export default {
    command: 'smeme',
    aliases: ['stickermeme', 'memesticker'],
    description: 'Create sticker meme',
    category: 'media',
    execute: async (ctx) => {
        const { fullArgs, reply, sock, from, msg } = ctx;

        const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

        if (!quoted || !quoted.imageMessage) {
            return await reply('❌ Please reply to an image!');
        }

        if (!fullArgs) {
            return await reply('❌ Please provide top and bottom text!\n\nUsage: *.smeme top|bottom*');
        }

        try {
            await reply('⏳ Creating meme sticker...');

            const stream = await sock.downloadMediaMessage(quoted.imageMessage);

            await sock.sendMessage(from, {
                sticker: stream,
                caption: `🎭 ${fullArgs}`
            });
        } catch (error) {
            await reply(`❌ Failed: ${error.message}`);
        }
    }
};
