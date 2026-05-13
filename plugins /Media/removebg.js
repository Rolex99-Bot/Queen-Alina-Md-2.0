// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - REMOVE BG
// ═══════════════════════════════════════════

import axios from 'axios';
import FormData from 'form-data';

export default {
    command: 'removebg',
    aliases: ['nobg', 'transparent'],
    description: 'Remove background from image',
    category: 'media',
    execute: async (ctx) => {
        const { msg, reply, sock, from, config } = ctx;

        const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

        if (!quoted || !quoted.imageMessage) {
            return await reply('❌ Please reply to an image!');
        }

        try {
            await reply('⏳ Removing background...');

            const stream = await sock.downloadMediaMessage(quoted.imageMessage);

            // Using remove.bg API
            const formData = new FormData();
            formData.append('image_file', stream, 'image.png');
            formData.append('size', 'auto');

            const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
                headers: {
                    ...formData.getHeaders(),
                    'X-Api-Key': config.apiKeys.removeBg || 'YOUR_API_KEY'
                },
                responseType: 'arraybuffer',
                timeout: 30000
            });

            await sock.sendMessage(from, {
                image: response.data,
                caption: '🎨 *Background Removed*\n\n_Queen Alina MD 2.0_'
            });
        } catch (error) {
            await reply(`❌ Failed to remove background: ${error.message}`);
        }
    }
};
