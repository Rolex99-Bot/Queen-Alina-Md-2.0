// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - FACEBOOK DOWNLOADER
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'facebook',
    aliases: ['fb', 'fbdl'],
    description: 'Download Facebook video',
    category: 'download',
    execute: async (ctx) => {
        const { fullArgs, reply, sock, from } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a Facebook URL!\n\nUsage: *.facebook <url>*');
        }

        try {
            await reply('⏳ Downloading Facebook video...');

            const apiUrl = `https://api.nexoracle.com/downloader/fbdl?apikey=free_key@maher_apis&url=${encodeURIComponent(fullArgs)}`;
            const response = await axios.get(apiUrl, { timeout: 30000 });

            if (response.data && response.data.result) {
                await sock.sendMessage(from, {
                    video: { url: response.data.result },
                    caption: '📥 *Facebook Video by Queen Alina MD 2.0*'
                });
            } else {
                await reply('❌ Failed to download Facebook video!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
