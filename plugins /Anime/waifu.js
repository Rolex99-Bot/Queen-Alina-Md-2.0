// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - WAIFU
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'waifu',
    aliases: ['waifus', 'animewife'],
    description: 'Get a random waifu image',
    category: 'anime',
    execute: async (ctx) => {
        const { reply, sock, from } = ctx;

        try {
            const response = await axios.get('https://api.waifu.im/search', { timeout: 10000 });

            if (response.data && response.data.images && response.data.images[0]) {
                const waifu = response.data.images[0];

                await sock.sendMessage(from, {
                    image: { url: waifu.url },
                    caption: `🌸 *WAIFU* 🌸\n\n💕 Source: ${waifu.source || 'Unknown'}\n\n_Queen Alina MD 2.0_`
                });
            } else {
                await reply('❌ Failed to fetch waifu!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
