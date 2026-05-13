// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - TIKTOK DOWNLOADER
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'tiktok',
    aliases: ['tt', 'ttdl'],
    description: 'Download TikTok video',
    category: 'download',
    execute: async (ctx) => {
        const { fullArgs, reply, sock, from } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a TikTok URL!\n\nUsage: *.tiktok <url>*');
        }

        try {
            await reply('⏳ Downloading TikTok video...');

            const apiUrl = `https://api.nexoracle.com/downloader/tiktok?apikey=free_key@maher_apis&url=${encodeURIComponent(fullArgs)}`;
            const response = await axios.get(apiUrl, { timeout: 30000 });

            if (response.data && response.data.result) {
                const videoUrl = response.data.result.video || response.data.result;

                await sock.sendMessage(from, {
                    video: { url: videoUrl },
                    caption: '📥 *TikTok Downloaded by Queen Alina MD 2.0*'
                });
            } else {
                await reply('❌ Failed to download TikTok video!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
