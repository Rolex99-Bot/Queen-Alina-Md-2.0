// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - LYRICS DOWNLOAD
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'lyrics',
    aliases: ['lyric', 'songtext'],
    description: 'Get song lyrics',
    category: 'download',
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a song name!\n\nUsage: *.lyrics <song name>*');
        }

        try {
            await reply('⏳ Searching for lyrics...');

            const apiUrl = `https://api.nexoracle.com/search/lyrics?apikey=free_key@maher_apis&q=${encodeURIComponent(fullArgs)}`;
            const response = await axios.get(apiUrl, { timeout: 30000 });

            if (response.data && response.data.result) {
                const lyrics = response.data.result;

                await reply(`🎵 *Lyrics for: ${fullArgs}*\n\n${lyrics.slice(0, 4000)}\n\n_Downloaded by Queen Alina MD 2.0_`);
            } else {
                await reply('❌ Lyrics not found!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
