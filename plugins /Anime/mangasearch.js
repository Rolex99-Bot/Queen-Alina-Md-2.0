// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - MANGA SEARCH
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'mangasearch',
    aliases: ['manga', 'mangalist'],
    description: 'Search for manga',
    category: 'anime',
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a manga name!\n\nUsage: *.mangasearch <name>*');
        }

        try {
            const response = await axios.get(`https://api.jikan.moe/v4/manga?q=${encodeURIComponent(fullArgs)}&limit=5`, { 
                timeout: 10000 
            });

            if (response.data && response.data.data) {
                let mangaText = `📚 *MANGA SEARCH: ${fullArgs}* 📚\n\n`;

                for (const manga of response.data.data) {
                    mangaText += `📖 ${manga.title}\n`;
                    mangaText += `⭐ Score: ${manga.score || 'N/A'}\n`;
                    mangaText += `📊 Chapters: ${manga.chapters || 'N/A'}\n`;
                    mangaText += `📅 Status: ${manga.status || 'N/A'}\n\n`;
                }

                await reply(mangaText + '_Queen Alina MD 2.0_');
            } else {
                await reply('❌ No manga found!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
