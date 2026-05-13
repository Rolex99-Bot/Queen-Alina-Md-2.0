// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - TO MP3
// ═══════════════════════════════════════════

export default {
    command: 'tomp3',
    aliases: ['toaudio', 'mp3'],
    description: 'Convert video to MP3',
    category: 'media',
    execute: async (ctx) => {
        const { msg, reply, sock, from } = ctx;

        const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

        if (!quoted || !quoted.videoMessage) {
            return await reply('❌ Please reply to a video!');
        }

        try {
            await reply('⏳ Converting to MP3...');

            const stream = await sock.downloadMediaMessage(quoted.videoMessage);

            await sock.sendMessage(from, {
                audio: stream,
                mimetype: 'audio/mpeg',
                caption: '🎵 *Video to MP3*\n\n_Queen Alina MD 2.0_'
            });
        } catch (error) {
            await reply(`❌ Failed to convert: ${error.message}`);
        }
    }
};
