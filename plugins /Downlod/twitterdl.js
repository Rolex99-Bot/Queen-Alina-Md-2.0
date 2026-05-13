// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - TWITTER DOWNLOADER
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'twitterdl',
    aliases: ['xdl', 'tweet'],
    description: 'Download Twitter/X video',
    category: 'download',
    execute: async (ctx) => {
        const { fullArgs, reply, sock, from } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a Twitter/X URL!\n\nUsage: *.twitterdl <url>*');
        }

        try {
            await reply('⏳ Downloading Twitter video...');

            const apiUrl = `https://api.nexoracle.com/downloader/twitter?apikey=free_key@maher_apis&url=${encodeURIComponent(fullArgs)}`;
            const response = await axios.get(apiUrl, { timeout: 30000 });

            if (response.data && response.data.result) {
                await sock.sendMessage(from, {
                    video: { url: response.data.result },
                    caption: '📥 *Twitter Video by Queen Alina MD 2.0*'
                });
            } else {
                await reply('❌ Failed to download Twitter video!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
