// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - SOUNDCLOUD DOWNLOADER
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'soundcloud',
    aliases: ['sc', 'scdl'],
    description: 'Download SoundCloud track',
    category: 'download',
    execute: async (ctx) => {
        const { fullArgs, reply, sock, from } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a SoundCloud URL!\n\nUsage: *.soundcloud <url>*');
        }

        try {
            await reply('⏳ Downloading from SoundCloud...');

            const apiUrl = `https://api.nexoracle.com/downloader/soundcloud?apikey=free_key@maher_apis&url=${encodeURIComponent(fullArgs)}`;
            const response = await axios.get(apiUrl, { timeout: 30000 });

            if (response.data && response.data.result) {
                await sock.sendMessage(from, {
                    audio: { url: response.data.result },
                    mimetype: 'audio/mpeg',
                    caption: '🎵 *SoundCloud by Queen Alina MD 2.0*'
                });
            } else {
                await reply('❌ Failed to download from SoundCloud!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
