// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - IMDB
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'imdb',
    aliases: ['movie', 'film'],
    description: 'Search IMDB for movies',
    category: 'search',
    execute: async (ctx) => {
        const { fullArgs, reply, config } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a movie name!\n\nUsage: *.imdb <movie name>*');
        }

        try {
            await reply('🎬 *Searching IMDB...*');

            const apiKey = config.apiKeys.imdb || 'YOUR_API_KEY';
            const apiUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(fullArgs)}&apikey=${apiKey}`;

            const response = await axios.get(apiUrl, { timeout: 10000 });

            if (response.data && response.data.Search) {
                let imdbText = `🎬 *IMDB Search: ${fullArgs}* 🎬\n\n`;

                for (const movie of response.data.Search.slice(0, 5)) {
                    imdbText += `🎥 ${movie.Title}\n`;
                    imdbText += `📅 Year: ${movie.Year}\n`;
                    imdbText += `🎭 Type: ${movie.Type}\n`;
                    imdbText += `🆔 IMDB ID: ${movie.imdbID}\n\n`;
                }

                await reply(imdbText + '_Queen Alina MD 2.0_');
            } else {
                await reply('❌ No movies found!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
