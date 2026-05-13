// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - LYRICS
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'lyrics',
    aliases: ['songlyrics', 'words'],
    description: 'Get song lyrics',
    category: 'search',
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a song name!\n\nUsage: *.lyrics <song name>*');
        }

        try {
            await reply('🎵 *Searching lyrics...*');

            const apiUrl = `https://api.nexoracle.com/search/lyrics?apikey=free_key@maher_apis&q=${encodeURIComponent(fullArgs)}`;
            const response = await axios.get(apiUrl, { timeout: 30000 });

            if (response.data && response.data.result) {
                await reply(`🎵 *Lyrics: ${fullArgs}* 🎵\n\n${response.data.result.slice(0, 4000)}\n\n_Queen Alina MD 2.0_`);
            } else {
                await reply('❌ Lyrics not found!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
