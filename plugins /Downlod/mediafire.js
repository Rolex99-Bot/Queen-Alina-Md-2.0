// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - MEDIAFIRE DOWNLOADER
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'mediafire',
    aliases: ['mf', 'mfdl'],
    description: 'Download from MediaFire',
    category: 'download',
    execute: async (ctx) => {
        const { fullArgs, reply, sock, from } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a MediaFire URL!\n\nUsage: *.mediafire <url>*');
        }

        try {
            await reply('⏳ Downloading from MediaFire...');

            const apiUrl = `https://api.nexoracle.com/downloader/mediafire?apikey=free_key@maher_apis&url=${encodeURIComponent(fullArgs)}`;
            const response = await axios.get(apiUrl, { timeout: 30000 });

            if (response.data && response.data.result) {
                const file = response.data.result;

                await sock.sendMessage(from, {
                    document: { url: file.url || file },
                    mimetype: 'application/octet-stream',
                    fileName: file.name || 'download.zip',
                    caption: `📥 *MediaFire Download*\n\n📁 *File:* ${file.name || 'Unknown'}\n📊 *Size:* ${file.size || 'Unknown'}\n\n_Downloaded by Queen Alina MD 2.0_`
                });
            } else {
                await reply('❌ Failed to download from MediaFire!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
