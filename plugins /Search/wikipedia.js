// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - WIKIPEDIA
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'wikipedia',
    aliases: ['wiki', 'wp'],
    description: 'Search Wikipedia',
    category: 'search',
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a search term!\n\nUsage: *.wikipedia <term>*');
        }

        try {
            await reply('📚 *Searching Wikipedia...*');

            const apiUrl = `https://api.nexoracle.com/search/wikipedia?apikey=free_key@maher_apis&q=${encodeURIComponent(fullArgs)}`;
            const response = await axios.get(apiUrl, { timeout: 30000 });

            if (response.data && response.data.result) {
                await reply(`📚 *Wikipedia: ${fullArgs}* 📚\n\n${response.data.result.slice(0, 4000)}\n\n_Queen Alina MD 2.0_`);
            } else {
                await reply('❌ No Wikipedia article found!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
