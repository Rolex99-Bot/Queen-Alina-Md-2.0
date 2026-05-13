// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - AI VOICE
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'aivoice',
    aliases: ['tts', 'speak', 'say'],
    description: 'Text to speech with AI',
    category: 'ai',
    execute: async (ctx) => {
        const { fullArgs, reply, sock, from } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide text to convert!\n\nUsage: *.aivoice <text>*');
        }

        try {
            await reply('🔊 *Queen Alina AI* is generating voice...');

            const apiUrl = `https://api.nexoracle.com/ai/tts?apikey=free_key@maher_apis&text=${encodeURIComponent(fullArgs)}`;
            const response = await axios.get(apiUrl, { timeout: 30000, responseType: 'arraybuffer' });

            if (response.data) {
                await sock.sendMessage(from, {
                    audio: response.data,
                    mimetype: 'audio/mp4',
                    ptt: true,
                    caption: '🔊 *AI Voice*'
                });
            } else {
                await reply('❌ Failed to generate voice!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
