// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - ANIME GIF
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'animegif',
    aliases: ['animemoji', 'anigif'],
    description: 'Get anime GIFs',
    category: 'anime',
    execute: async (ctx) => {
        const { reply, sock, from } = ctx;

        try {
            const response = await axios.get('https://nekos.life/api/v2/img/ngif', { timeout: 10000 });

            if (response.data && response.data.url) {
                await sock.sendMessage(from, {
                    video: { url: response.data.url },
                    gifPlayback: true,
                    caption: `🎬 *ANIME GIF* 🎬\n\n_Queen Alina MD 2.0_`
                });
            } else {
                await reply('❌ Failed to fetch GIF!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
