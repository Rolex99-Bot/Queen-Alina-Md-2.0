// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - AI LOGO GENERATOR
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'ailogo',
    aliases: ['genlogo', 'createlogo'],
    description: 'Generate AI logos',
    category: 'ai',
    execute: async (ctx) => {
        const { fullArgs, reply, sock, from } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a logo description!\n\nUsage: *.ailogo <description>*');
        }

        try {
            await reply('🎨 *Queen Alina AI* is designing your logo...');

            const apiUrl = `https://api.nexoracle.com/ai/ailogo?apikey=free_key@maher_apis&q=${encodeURIComponent(fullArgs)}`;
            const response = await axios.get(apiUrl, { timeout: 60000 });

            if (response.data && response.data.result) {
                await sock.sendMessage(from, {
                    image: { url: response.data.result },
                    caption: `🎨 *AI Generated Logo*\n\n📝 *Prompt:* ${fullArgs}\n\n_Created by Queen Alina MD 2.0_`
                });
            } else {
                await reply('❌ Failed to generate logo. Please try again!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
