// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - VOICE (Sinhala)
// ═══════════════════════════════════════════

export default {
    command: 'voice',
    aliases: ['sinhalavoice', 'slvoice'],
    description: 'Sinhala text to speech',
    category: 'utils',
    execute: async (ctx) => {
        const { fullArgs, reply, sock, from } = ctx;

        if (!fullArgs) {
            return await reply('❌ කරුණාකර පෙළ ඇතුළත් කරන්න!\n\nභාවිතය: *.voice <පෙළ>*');
        }

        try {
            await reply('🔊 *සිංහල හඬ උත්පාදනය කරමින්...*');

            const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(fullArgs)}&tl=si&client=tw-ob`;

            await sock.sendMessage(from, {
                audio: { url: ttsUrl },
                mimetype: 'audio/mp4',
                ptt: true,
                caption: '🔊 *Sinhala Voice*'
            });
        } catch (error) {
            await reply(`❌ දෝෂයක්: ${error.message}`);
        }
    }
};
