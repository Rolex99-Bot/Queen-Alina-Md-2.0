// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - TRANSLATE
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'translate',
    aliases: ['tr', 'trans'],
    description: 'Translate text',
    category: 'utils',
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide text to translate!\n\nUsage: *.translate <lang> <text>*\nExample: *.translate si Hello*');
        }

        const parts = fullArgs.split(' ');
        const lang = parts[0];
        const text = parts.slice(1).join(' ');

        if (!text) {
            return await reply('❌ Please provide text to translate!');
        }

        try {
            await reply('🌐 *Translating...*');

            const apiUrl = `https://api.nexoracle.com/ai/translate?apikey=free_key@maher_apis&text=${encodeURIComponent(text)}&to=${lang}`;
            const response = await axios.get(apiUrl, { timeout: 30000 });

            if (response.data && response.data.result) {
                await reply(`🌐 *Translation (${lang})* 🌐\n\n${response.data.result}\n\n_Queen Alina MD 2.0_`);
            } else {
                await reply('❌ Translation failed!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
