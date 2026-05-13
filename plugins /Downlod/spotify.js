// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - SPOTIFY DOWNLOADER
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'spotify',
    aliases: ['spot', 'spdl'],
    description: 'Download Spotify track',
    category: 'download',
    execute: async (ctx) => {
        const { fullArgs, reply, sock, from } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a Spotify URL or track name!\n\nUsage: *.spotify <url/name>*');
        }

        try {
            await reply('⏳ Downloading from Spotify...');

            const apiUrl = `https://api.nexoracle.com/downloader/spotify?apikey=free_key@maher_apis&url=${encodeURIComponent(fullArgs)}`;
            const response = await axios.get(apiUrl, { timeout: 30000 });

            if (response.data && response.data.result) {
                const track = response.data.result;

                await sock.sendMessage(from, {
                    audio: { url: track.url || track },
                    mimetype: 'audio/mpeg',
                    caption: `🎵 *Spotify Track*\n\n🎤 *Artist:* ${track.artist || 'Unknown'}\n🎬 *Title:* ${track.title || 'Unknown'}\n\n_Downloaded by Queen Alina MD 2.0_`
                });
            } else {
                await reply('❌ Failed to download Spotify track!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
