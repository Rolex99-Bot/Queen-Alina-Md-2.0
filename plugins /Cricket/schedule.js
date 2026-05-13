// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - SCHEDULE
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'schedule',
    aliases: ['fixtures', 'upcoming'],
    description: 'Get upcoming cricket matches',
    category: 'cricket',
    execute: async (ctx) => {
        const { reply } = ctx;

        try {
            const response = await axios.get('https://api.cricapi.com/v1/match_info?apikey=YOUR_API_KEY', { 
                timeout: 10000 
            });

            if (response.data) {
                await reply('📅 *UPCOMING MATCHES* 📅\n\n🏏 Cricket schedule loaded!\n\n_Queen Alina MD 2.0_');
            } else {
                await reply('❌ No upcoming matches found!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
