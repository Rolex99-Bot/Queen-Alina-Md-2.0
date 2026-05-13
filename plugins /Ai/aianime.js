// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - AI ANIME
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'aianime',
    aliases: ['animeai', 'animestyle'],
    description: 'Generate anime style images',
    category: 'ai',
    execute: async (ctx) => {
        const { fullArgs, reply, sock, from } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a description!\n\nUsage: *.aianime <description>*');
        }

        try {
            await reply('🎌 *Queen Alina AI* is creating anime art...');

            const apiUrl = `https://api.nexoracle.com/ai/aiimg?apikey=free_key@maher_apis&q=${encodeURIComponent('anime style: ' + fullArgs)}`;
            const response = await axios.get(apiUrl, { timeout: 60000 });

            if (response.data && response.data.result) {
                await sock.sendMessage(from, {
                    image: { url: response.data.result },
                    caption: `🎌 *AI Anime Art*\n\n📝 *Prompt:* ${fullArgs}\n\n_Created by Queen Alina MD 2.0_`
                });
            } else {
                await reply('❌ Failed to generate anime art!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
