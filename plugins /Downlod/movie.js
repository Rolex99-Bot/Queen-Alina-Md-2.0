// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - MOVIE DOWNLOAD
// ═══════════════════════════════════════════

export default {
    command: 'movie',
    aliases: ['film', 'moviedl'],
    description: 'Search and download movies',
    category: 'download',
    execute: async (ctx) => {
        const { fullArgs, reply, buttons, from } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a movie name!\n\nUsage: *.movie <name>*');
        }

        await reply(`🎬 *Movie Search: ${fullArgs}*\n\n⏳ Searching available sources...\n\n⚠️ Note: This feature provides movie information and legal streaming links.`);

        // Send info with buttons for streaming platforms
        const movieButtons = [
            { text: '🎬 IMDb', id: 'imdb_search' },
            { text: '📺 Netflix', id: 'netflix_search' },
            { text: '🎞️ YouTube', id: 'yt_search' }
        ];

        await buttons.sendReplyButtons(from, `🔍 Search results for: *${fullArgs}*`, movieButtons);
    }
};
