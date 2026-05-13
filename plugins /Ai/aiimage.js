// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - AI IMAGE GENERATOR
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'aiimage',
    aliases: ['genimage', 'createimage', 'imagine'],
    description: 'Generate AI images',
    category: 'ai',
    execute: async (ctx) => {
        const { fullArgs, reply, sock, from } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a description!\n\nUsage: *.aiimage <description>*');
        }

        try {
            await reply('🎨 *Queen Alina AI* is generating your image...');

            const apiUrl = `https://api.nexoracle.com/ai/aiimg?apikey=free_key@maher_apis&q=${encodeURIComponent(fullArgs)}`;
            const response = await axios.get(apiUrl, { timeout: 60000 });

            if (response.data && response.data.result) {
                await sock.sendMessage(from, {
                    image: { url: response.data.result },
                    caption: `🎨 *AI Generated Image*\n\n📝 *Prompt:* ${fullArgs}\n\n_Created by Queen Alina MD 2.0_`
                });
            } else {
                await reply('❌ Failed to generate image. Please try again!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
