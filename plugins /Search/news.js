// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - NEWS
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'news',
    aliases: ['headlines', 'latest'],
    description: 'Get latest news',
    category: 'search',
    execute: async (ctx) => {
        const { reply, config } = ctx;

        try {
            await reply('📰 *Fetching news...*');

            const apiKey = config.apiKeys.news || 'YOUR_API_KEY';
            const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

            const response = await axios.get(apiUrl, { timeout: 10000 });

            if (response.data && response.data.articles) {
                let newsText = '📰 *LATEST NEWS* 📰\n\n';

                for (const article of response.data.articles.slice(0, 5)) {
                    newsText += `📌 ${article.title}\n`;
                    newsText += `📝 ${article.description || 'No description'}\n`;
                    newsText += `🔗 ${article.url}\n\n`;
                }

                await reply(newsText + '_Queen Alina MD 2.0_');
            } else {
                await reply('❌ No news found!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
