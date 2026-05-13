// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - INSTAGRAM DOWNLOADER
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'instagram',
    aliases: ['ig', 'igdl', 'insta'],
    description: 'Download Instagram media',
    category: 'download',
    execute: async (ctx) => {
        const { fullArgs, reply, sock, from } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide an Instagram URL!\n\nUsage: *.instagram <url>*');
        }

        try {
            await reply('⏳ Downloading Instagram media...');

            const apiUrl = `https://api.nexoracle.com/downloader/igdl?apikey=free_key@maher_apis&url=${encodeURIComponent(fullArgs)}`;
            const response = await axios.get(apiUrl, { timeout: 30000 });

            if (response.data && response.data.result) {
                const media = response.data.result;

                if (Array.isArray(media)) {
                    for (const item of media.slice(0, 5)) {
                        if (item.includes('.mp4')) {
                            await sock.sendMessage(from, {
                                video: { url: item },
                                caption: '📥 *Instagram Video*'
                            });
                        } else {
                            await sock.sendMessage(from, {
                                image: { url: item },
                                caption: '📥 *Instagram Image*'
                            });
                        }
                    }
                } else {
                    await sock.sendMessage(from, {
                        video: { url: media },
                        caption: '📥 *Instagram by Queen Alina MD 2.0*'
                    });
                }
            } else {
                await reply('❌ Failed to download Instagram media!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
