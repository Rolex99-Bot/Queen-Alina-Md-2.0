// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - AI MATH
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'aimath',
    aliases: ['math', 'calculate'],
    description: 'Solve math with AI',
    category: 'ai',
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a math problem!\n\nUsage: *.aimath <problem>*');
        }

        try {
            await reply('🔢 *Queen Alina AI* is solving...');

            const apiUrl = `https://api.nexoracle.com/ai/chatgpt?apikey=free_key@maher_apis&q=${encodeURIComponent('Solve this math problem step by step: ' + fullArgs)}`;
            const response = await axios.get(apiUrl, { timeout: 30000 });

            if (response.data && response.data.result) {
                await reply(`🔢 *Math Solution*\n\n${response.data.result}\n\n_Solved by Queen Alina AI_`);
            } else {
                await reply('❌ Failed to solve!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
