// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - AI STORY
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'aistory',
    aliases: ['story', 'tale'],
    description: 'Generate AI stories',
    category: 'ai',
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        const prompt = fullArgs || 'Write an interesting short story';

        try {
            await reply('📖 *Queen Alina AI* is writing a story...');

            const apiUrl = `https://api.nexoracle.com/ai/chatgpt?apikey=free_key@maher_apis&q=${encodeURIComponent('Write a creative story about: ' + prompt)}`;
            const response = await axios.get(apiUrl, { timeout: 30000 });

            if (response.data && response.data.result) {
                await reply(`📖 *AI Story*\n\n${response.data.result}\n\n_Written by Queen Alina AI_`);
            } else {
                await reply('❌ Failed to generate story!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
