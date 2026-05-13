// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - GPT (ChatGPT)
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'gpt',
    aliases: ['chatgpt', 'openai'],
    description: 'Chat with GPT-3.5',
    category: 'ai',
    execute: async (ctx) => {
        const { fullArgs, reply, config } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a question!\n\nUsage: *.gpt <question>*');
        }

        try {
            await reply('🤖 *Queen Alina AI* is thinking...');

            const apiUrl = `https://api.nexoracle.com/ai/chatgpt?apikey=free_key@maher_apis&q=${encodeURIComponent(fullArgs)}`;
            const response = await axios.get(apiUrl, { timeout: 30000 });

            if (response.data && response.data.result) {
                await reply(`🤖 *Queen Alina AI*\n\n${response.data.result}\n\n_Powered by GPT-3.5_`);
            } else {
                await reply('❌ AI failed to respond. Please try again!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
