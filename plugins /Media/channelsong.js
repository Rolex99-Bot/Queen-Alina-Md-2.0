// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - CHANNEL SONG
// ═══════════════════════════════════════════

export default {
    command: 'channelsong',
    aliases: ['csong', 'uploadsong'],
    description: 'Upload song to channel',
    category: 'media',
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a song name or URL!\n\nUsage: *.channelsong <name>*');
        }

        await reply(`🎵 *Channel Song Upload*\n\nSong: ${fullArgs}\n\n⏳ Processing...\n\n_Queen Alina MD 2.0_`);
    }
};
