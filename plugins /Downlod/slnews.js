// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - SRI LANKA NEWS
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'slnews',
    aliases: ['news', 'lknews'],
    description: 'Get Sri Lanka news',
    category: 'download',
    execute: async (ctx) => {
        const { reply } = ctx;

        try {
            await reply('⏳ Fetching Sri Lanka news...');

            const apiUrl = 'https://api.nexoracle.com/news/sl?apikey=free_key@maher_apis';
            const response = await axios.get(apiUrl, { timeout: 30000 });

            if (response.data && response.data.result) {
                const news = response.data.result;
                let newsText = '📰 *Sri Lanka News* 📰\n\n';

                for (const item of news.slice(0, 10)) {
                    newsText += `• ${item.title}\n${item.url || ''}\n\n`;
                }

                await reply(newsText + '\n_Updated by Queen Alina MD 2.0_');
            } else {
                await reply('❌ Failed to fetch news!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
