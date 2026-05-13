// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - TEXT TO SPEECH
// ═══════════════════════════════════════════

export default {
    command: 'tts',
    aliases: ['say', 'speak'],
    description: 'Text to speech',
    category: 'utils',
    execute: async (ctx) => {
        const { fullArgs, reply, sock, from } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide text!\n\nUsage: *.tts <text>*');
        }

        try {
            await reply('🔊 *Generating voice...*');

            const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(fullArgs)}&tl=en&client=tw-ob`;

            await sock.sendMessage(from, {
                audio: { url: ttsUrl },
                mimetype: 'audio/mp4',
                ptt: true,
                caption: '🔊 *Text to Speech*'
            });
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
