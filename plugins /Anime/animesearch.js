// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - ANIME SEARCH
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'animesearch',
    aliases: ['anime', 'animelist'],
    description: 'Search for anime',
    category: 'anime',
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide an anime name!\n\nUsage: *.animesearch <name>*');
        }

        try {
            const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(fullArgs)}&limit=5`, { 
                timeout: 10000 
            });

            if (response.data && response.data.data) {
                let animeText = `🔍 *ANIME SEARCH: ${fullArgs}* 🔍\n\n`;

                for (const anime of response.data.data) {
                    animeText += `📺 ${anime.title}\n`;
                    animeText += `⭐ Score: ${anime.score || 'N/A'}\n`;
                    animeText += `📊 Episodes: ${anime.episodes || 'N/A'}\n`;
                    animeText += `📅 Status: ${anime.status || 'N/A'}\n\n`;
                }

                await reply(animeText + '_Queen Alina MD 2.0_');
            } else {
                await reply('❌ No anime found!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
