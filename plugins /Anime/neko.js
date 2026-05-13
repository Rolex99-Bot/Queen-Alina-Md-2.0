// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - NEKO
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'neko',
    aliases: ['catgirl', 'nekos'],
    description: 'Get a random neko image',
    category: 'anime',
    execute: async (ctx) => {
        const { reply, sock, from } = ctx;

        try {
            const response = await axios.get('https://nekos.life/api/v2/img/neko', { timeout: 10000 });

            if (response.data && response.data.url) {
                await sock.sendMessage(from, {
                    image: { url: response.data.url },
                    caption: `🐱 *NEKO* 🐱\n\n_Meow! Queen Alina MD 2.0_`
                });
            } else {
                await reply('❌ Failed to fetch neko!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
