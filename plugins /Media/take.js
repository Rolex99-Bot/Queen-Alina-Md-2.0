// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - TAKE (STEAL STICKER)
// ═══════════════════════════════════════════

export default {
    command: 'take',
    aliases: ['steal', 'grab'],
    description: 'Steal a sticker with custom pack name',
    category: 'media',
    execute: async (ctx) => {
        const { msg, fullArgs, reply, sock, from } = ctx;

        const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

        if (!quoted || !quoted.stickerMessage) {
            return await reply('❌ Please reply to a sticker!');
        }

        try {
            await reply('⏳ Stealing sticker...');

            const stream = await sock.downloadMediaMessage(quoted.stickerMessage);

            await sock.sendMessage(from, {
                sticker: stream,
                caption: fullArgs || '🎨 *Queen Alina MD 2.0*'
            });
        } catch (error) {
            await reply(`❌ Failed to steal sticker: ${error.message}`);
        }
    }
};
