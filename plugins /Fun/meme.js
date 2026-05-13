// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - MEME
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'meme',
    aliases: ['memes', 'funnymeme'],
    description: 'Get a random meme',
    category: 'fun',
    execute: async (ctx) => {
        const { reply, sock, from } = ctx;

        try {
            const response = await axios.get('https://meme-api.com/gimme', { timeout: 10000 });

            if (response.data && response.data.url) {
                await sock.sendMessage(from, {
                    image: { url: response.data.url },
                    caption: `😂 *MEME* 😂\n\n${response.data.title}\n\n👍 ${response.data.ups} upvotes\n\n_Queen Alina MD 2.0_`
                });
            } else {
                await reply('❌ Failed to fetch meme!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
