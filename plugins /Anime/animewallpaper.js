// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - ANIME WALLPAPER
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'animewallpaper',
    aliases: ['wallpaper', 'animewp'],
    description: 'Get anime wallpapers',
    category: 'anime',
    execute: async (ctx) => {
        const { reply, sock, from } = ctx;

        try {
            const response = await axios.get('https://api.waifu.im/search?orientation=LANDSCAPE', { timeout: 10000 });

            if (response.data && response.data.images && response.data.images[0]) {
                const wallpaper = response.data.images[0];

                await sock.sendMessage(from, {
                    image: { url: wallpaper.url },
                    caption: `🖼️ *ANIME WALLPAPER* 🖼️\n\n📐 Resolution: ${wallpaper.width}x${wallpaper.height}\n\n_Queen Alina MD 2.0_`
                });
            } else {
                await reply('❌ Failed to fetch wallpaper!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
