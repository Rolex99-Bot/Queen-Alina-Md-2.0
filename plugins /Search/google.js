// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - GOOGLE SEARCH
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'google',
    aliases: ['g', 'search'],
    description: 'Search Google',
    category: 'search',
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a search query!\n\nUsage: *.google <query>*');
        }

        try {
            await reply('🔍 *Searching Google...*');

            const apiUrl = `https://api.nexoracle.com/search/google?apikey=free_key@maher_apis&q=${encodeURIComponent(fullArgs)}`;
            const response = await axios.get(apiUrl, { timeout: 30000 });

            if (response.data && response.data.result) {
                let searchText = `🔍 *Google Search: ${fullArgs}* 🔍\n\n`;

                for (const result of response.data.result.slice(0, 5)) {
                    searchText += `📌 ${result.title}\n`;
                    searchText += `🔗 ${result.url || result.link}\n`;
                    searchText += `📝 ${result.snippet || result.description}\n\n`;
                }

                await reply(searchText + '_Queen Alina MD 2.0_');
            } else {
                await reply('❌ No results found!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
