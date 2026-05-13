// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - TIKTOK MP3
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'tiktokmp3',
    aliases: ['ttmp3', 'tiktokaudio'],
    description: 'Download TikTok audio',
    category: 'download',
    execute: async (ctx) => {
        const { fullArgs, reply, sock, from } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a TikTok URL!\n\nUsage: *.tiktokmp3 <url>*');
        }

        try {
            await reply('⏳ Downloading TikTok audio...');

            const apiUrl = `https://api.nexoracle.com/downloader/tiktok?apikey=free_key@maher_apis&url=${encodeURIComponent(fullArgs)}`;
            const response = await axios.get(apiUrl, { timeout: 30000 });

            if (response.data && response.data.result && response.data.result.audio) {
                await sock.sendMessage(from, {
                    audio: { url: response.data.result.audio },
                    mimetype: 'audio/mp4',
                    caption: '🎵 *TikTok Audio by Queen Alina MD 2.0*'
                });
            } else {
                await reply('❌ Failed to download TikTok audio!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
