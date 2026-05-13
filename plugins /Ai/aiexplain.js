// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - AI EXPLAIN
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'aiexplain',
    aliases: ['explain', 'teach'],
    description: 'Explain anything with AI',
    category: 'ai',
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide something to explain!\n\nUsage: *.aiexplain <topic>*');
        }

        try {
            await reply('📚 *Queen Alina AI* is explaining...');

            const apiUrl = `https://api.nexoracle.com/ai/chatgpt?apikey=free_key@maher_apis&q=${encodeURIComponent('Explain in simple terms: ' + fullArgs)}`;
            const response = await axios.get(apiUrl, { timeout: 30000 });

            if (response.data && response.data.result) {
                await reply(`📚 *Explanation*\n\n${response.data.result}\n\n_Explained by Queen Alina AI_`);
            } else {
                await reply('❌ Failed to explain!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
