// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - SHORT URL
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'shorturl',
    aliases: ['short', 'tiny'],
    description: 'Shorten URL',
    category: 'utils',
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a URL!\n\nUsage: *.shorturl <url>*');
        }

        try {
            await reply('🔗 *Shortening URL...*');

            const response = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(fullArgs)}`, { 
                timeout: 10000 
            });

            if (response.data) {
                await reply(`🔗 *URL Shortened* 🔗\n\n📎 Original: ${fullArgs}\n✂️ Short: ${response.data}\n\n_Queen Alina MD 2.0_`);
            } else {
                await reply('❌ Failed to shorten URL!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
