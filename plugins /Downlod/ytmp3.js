// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - YOUTUBE MP3
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'ytmp3',
    aliases: ['ytaudio', 'yta'],
    description: 'Download YouTube audio',
    category: 'download',
    execute: async (ctx) => {
        const { fullArgs, reply, sock, from } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a YouTube URL!\n\nUsage: *.ytmp3 <url>*');
        }

        try {
            await reply('⏳ Downloading YouTube audio...');

            const apiUrl = `https://api.nexoracle.com/downloader/ytaudio?apikey=free_key@maher_apis&url=${encodeURIComponent(fullArgs)}`;
            const response = await axios.get(apiUrl, { timeout: 60000 });

            if (response.data && response.data.result) {
                const audioData = response.data.result;

                await sock.sendMessage(from, {
                    audio: { url: audioData.url || audioData },
                    mimetype: 'audio/mpeg',
                    caption: `🎵 *YouTube Audio*\n\n🎬 *Title:* ${audioData.title || 'Unknown'}\n\n_Downloaded by Queen Alina MD 2.0_`
                });
            } else {
                await reply('❌ Failed to download YouTube audio!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
