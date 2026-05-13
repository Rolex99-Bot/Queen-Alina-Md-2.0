// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - GPT-4
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'gpt4',
    aliases: ['chatgpt4', 'ai4'],
    description: 'Chat with GPT-4',
    category: 'ai',
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a question!\n\nUsage: *.gpt4 <question>*');
        }

        try {
            await reply('🧠 *Queen Alina GPT-4* is analyzing...');

            const apiUrl = `https://api.nexoracle.com/ai/gpt4?apikey=free_key@maher_apis&q=${encodeURIComponent(fullArgs)}`;
            const response = await axios.get(apiUrl, { timeout: 30000 });

            if (response.data && response.data.result) {
                await reply(`🧠 *Queen Alina GPT-4*\n\n${response.data.result}\n\n_Powered by GPT-4_`);
            } else {
                await reply('❌ GPT-4 failed to respond. Please try again!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
