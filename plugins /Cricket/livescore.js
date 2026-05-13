// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - LIVE SCORE
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'livescore',
    aliases: ['live', 'score'],
    description: 'Get live cricket scores',
    category: 'cricket',
    execute: async (ctx) => {
        const { reply } = ctx;

        try {
            const response = await axios.get('https://api.cricapi.com/v1/currentMatches?apikey=YOUR_API_KEY&offset=0', { 
                timeout: 10000 
            });

            if (response.data && response.data.data) {
                let scoreText = '🏏 *LIVE CRICKET SCORES* 🏏\n\n';

                for (const match of response.data.data.slice(0, 5)) {
                    scoreText += `📍 ${match.name}\n`;
                    scoreText += `🏆 ${match.matchType?.toUpperCase() || 'MATCH'}\n`;
                    scoreText += `📊 ${match.status || 'Live'}\n\n`;
                }

                await reply(scoreText + '_Queen Alina MD 2.0_');
            } else {
                await reply('❌ No live matches found!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
