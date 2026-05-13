// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - AI TRANSLATE
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'aitranslate',
    aliases: ['translate', 'tr'],
    description: 'Translate text with AI',
    category: 'ai',
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide text to translate!\n\nUsage: *.aitranslate <lang> <text>*\nExample: *.aitranslate si Hello*');
        }

        const parts = fullArgs.split(' ');
        const lang = parts[0];
        const text = parts.slice(1).join(' ');

        if (!text) {
            return await reply('❌ Please provide text to translate!');
        }

        try {
            await reply('🌐 *Queen Alina AI* is translating...');

            const apiUrl = `https://api.nexoracle.com/ai/translate?apikey=free_key@maher_apis&text=${encodeURIComponent(text)}&to=${lang}`;
            const response = await axios.get(apiUrl, { timeout: 30000 });

            if (response.data && response.data.result) {
                await reply(`🌐 *Translation (${lang})*\n\n${response.data.result}\n\n_Translated by Queen Alina AI_`);
            } else {
                await reply('❌ Translation failed!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
