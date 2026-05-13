// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - YOUTUBE MP4
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'ytmp4',
    aliases: ['ytvideo', 'ytv'],
    description: 'Download YouTube video',
    category: 'download',
    execute: async (ctx) => {
        const { fullArgs, reply, sock, from } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a YouTube URL!\n\nUsage: *.ytmp4 <url>*');
        }

        try {
            await reply('⏳ Downloading YouTube video...');

            const apiUrl = `https://api.nexoracle.com/downloader/ytvideo?apikey=free_key@maher_apis&url=${encodeURIComponent(fullArgs)}`;
            const response = await axios.get(apiUrl, { timeout: 60000 });

            if (response.data && response.data.result) {
                const videoData = response.data.result;

                await sock.sendMessage(from, {
                    video: { url: videoData.url || videoData },
                    caption: `📥 *YouTube Video*\n\n🎬 *Title:* ${videoData.title || 'Unknown'}\n📊 *Quality:* ${videoData.quality || 'HD'}\n\n_Downloaded by Queen Alina MD 2.0_`
                });
            } else {
                await reply('❌ Failed to download YouTube video!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
