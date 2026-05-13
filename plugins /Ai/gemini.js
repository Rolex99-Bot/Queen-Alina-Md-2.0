// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - GEMINI
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'gemini',
    aliases: ['googleai', 'bard'],
    description: 'Chat with Google Gemini',
    category: 'ai',
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a question!\n\nUsage: *.gemini <question>*');
        }

        try {
            await reply('🔮 *Queen Alina Gemini* is processing...');

            const apiUrl = `https://api.nexoracle.com/ai/gemini?apikey=free_key@maher_apis&q=${encodeURIComponent(fullArgs)}`;
            const response = await axios.get(apiUrl, { timeout: 30000 });

            if (response.data && response.data.result) {
                await reply(`🔮 *Queen Alina Gemini*\n\n${response.data.result}\n\n_Powered by Google Gemini_`);
            } else {
                await reply('❌ Gemini failed to respond. Please try again!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
