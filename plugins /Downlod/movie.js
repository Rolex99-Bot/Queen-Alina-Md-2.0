// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - MOVIE DOWNLOAD
//  Premium Button System | Queen Amdi Style
// ═══════════════════════════════════════════

export default {
    command: 'movie',
    aliases: ['film', 'moviedl', 'movieinfo'],
    description: 'Search and download movies with Sinhala & English support',
    category: 'download',
    execute: async (ctx) => {
        const { fullArgs, reply, buttons, from } = ctx;

        if (!fullArgs) {
            return await buttons.sendReplyButtons(
                from,
                `🎬 *Movie Search Module*

` +
                `❌ Please provide a movie name!

` +
                `*Usage:*
` +
                `• *.movie <name>*
` +
                `• *.film <name>*
` +
                `• *.moviedl <name>*

` +
                `*Example:*
` +
                `• *.movie Inception*
` +
                `• *.movie Spider-Man Sinhala*`,
                [
                    { text: '🔙 Main Menu', id: 'main_menu' },
                    { text: '❓ Help', id: 'help_download' }
                ]
            );
        }

        // Premium loading message with random symbol
        await reply(
            `🎬 *Movie Search: ${fullArgs}*

` +
            `⏳ Searching available sources...
` +
            `🔍 Checking: SubSLK | Cineru | Sinhalasub | Cinebuz | Best Film Sites

` +
            `⚠️ *Note:* This feature provides movie information and streaming/download links.`
        );

        // ═══════ SINHALA MOVIE PLATFORMS ═══════
        const sinhalaButtons = [
            { text: '📺 SubSLK', id: `subslk_${fullArgs}` },
            { text: '🎞️ Cineru', id: `cineru_${fullArgs}` },
            { text: '🎬 Sinhalasub', id: `sinhalasub_${fullArgs}` },
            { text: '🍿 Cinebuz', id: `cinebuz_${fullArgs}` }
        ];

        // ═══════ INTERNATIONAL PLATFORMS ═══════
        const internationalButtons = [
            { text: '⭐ Best Film DL', id: `bestfilm_${fullArgs}` },
            { text: '🎬 IMDb Info', id: `imdb_${fullArgs}` },
            { text: '📺 YouTube', id: `yt_${fullArgs}` }
        ];

        // ═══════ NAVIGATION BUTTONS ═══════
        const navButtons = [
            { text: '🔙 Back to Menu', id: 'main_menu' },
            { text: '🔄 Search Again', id: 'search_again' }
        ];

        // Send Sinhala Platforms Section
        await buttons.sendReplyButtons(
            from,
            `🇱🇰 *Sinhala Movie Platforms*

` +
            `📌 *Select a platform to search:*

` +
            `• SubSLK - Sinhala Subtitles & Movies
` +
            `• Cineru - Latest Movies Hub
` +
            `• Sinhalasub - Sinhala Subtitle Zone
` +
            `• Cinebuz - Movie Download Center`,
            sinhalaButtons
        );

        // Send International Platforms Section
        await buttons.sendReplyButtons(
            from,
            `🌍 *International Platforms*

` +
            `📌 *Select a platform to search:*

` +
            `• Best Film DL - Top Download Sites
` +
            `• IMDb - Movie Info & Ratings
` +
            `• YouTube - Full Movies & Trailers`,
            internationalButtons
        );

        // Send Navigation Buttons
        await buttons.sendReplyButtons(
            from,
            `⚡ *Quick Actions*`,
            navButtons
        );
    }
};

// ═══════════════════════════════════════════
//  BUTTON HANDLERS - MOVIE MODULE
//  Add these to your main button handler
// ═══════════════════════════════════════════

export const MovieButtonHandlers = {

    // ═══════ SUBSLK HANDLER ═══════
    async handleSubSLK(ctx, movieName) {
        const { reply, buttons, from } = ctx;
        await buttons.sendUrlButtons(
            from,
            `📺 *SubSLK - Sinhala Subtitles*

` +
            `🔍 Searching: *${movieName}*

` +
            `📥 *Features:*
` +
            `• Sinhala Subtitles (SRT)
` +
            `• English Movies with Sinhala Sub
` +
            `• TV Series Subtitles
` +
            `• Free Downloads`,
            [
                { type: 'url', text: '🔍 Search SubSLK', url: `https://subslk.com/?s=${encodeURIComponent(movieName)}` },
                { type: 'url', text: '📋 Browse All', url: 'https://subslk.com/' },
                { type: 'quick', text: '🔙 Back', id: `movie_${movieName}` }
            ]
        );
    },

    // ═══════ CINERU HANDLER ═══════
    async handleCineru(ctx, movieName) {
        const { reply, buttons, from } = ctx;
        await buttons.sendUrlButtons(
            from,
            `🎞️ *Cineru - Movie Hub*

` +
            `🔍 Searching: *${movieName}*

` +
            `📥 *Features:*
` +
            `• Latest Movies
` +
            `• HD Quality
` +
            `• Fast Downloads
` +
            `• Sinhala Dubbed`,
            [
                { type: 'url', text: '🔍 Search Cineru', url: `https://cineru.lk/?s=${encodeURIComponent(movieName)}` },
                { type: 'url', text: '📋 Browse All', url: 'https://cineru.lk/' },
                { type: 'quick', text: '🔙 Back', id: `movie_${movieName}` }
            ]
        );
    },

    // ═══════ SINHALASUB HANDLER ═══════
    async handleSinhalasub(ctx, movieName) {
        const { reply, buttons, from } = ctx;
        await buttons.sendUrlButtons(
            from,
            `🎬 *Sinhalasub - Subtitle Zone*

` +
            `🔍 Searching: *${movieName}*

` +
            `📥 *Features:*
` +
            `• Sinhala Subtitles
` +
            `• Movie Reviews
` +
            `• Download Links
` +
            `• Quality Ratings`,
            [
                { type: 'url', text: '🔍 Search Sinhalasub', url: `https://sinhalasub.net/?s=${encodeURIComponent(movieName)}` },
                { type: 'url', text: '📋 Browse All', url: 'https://sinhalasub.net/' },
                { type: 'quick', text: '🔙 Back', id: `movie_${movieName}` }
            ]
        );
    },

    // ═══════ CINEBUZ HANDLER ═══════
    async handleCinebuz(ctx, movieName) {
        const { reply, buttons, from } = ctx;
        await buttons.sendUrlButtons(
            from,
            `🍿 *Cinebuz - Download Center*

` +
            `🔍 Searching: *${movieName}*

` +
            `📥 *Features:*
` +
            `• Direct Downloads
` +
            `• Multiple Qualities
` +
            `• Fast Servers
` +
            `• No Registration`,
            [
                { type: 'url', text: '🔍 Search Cinebuz', url: `https://cinebuz.com/?s=${encodeURIComponent(movieName)}` },
                { type: 'url', text: '📋 Browse All', url: 'https://cinebuz.com/' },
                { type: 'quick', text: '🔙 Back', id: `movie_${movieName}` }
            ]
        );
    },

    // ═══════ BEST FILM DOWNLOAD HANDLER ═══════
    async handleBestFilm(ctx, movieName) {
        const { reply, buttons, from } = ctx;
        await buttons.sendUrlButtons(
            from,
            `⭐ *Best Film Download Sites*

` +
            `🔍 Searching: *${movieName}*

` +
            `🌍 *Top International Sites:*

` +
            `1️⃣ *YTS (YIFY)* - Small file sizes, HD quality
` +
            `2️⃣ *1337x* - Huge library, verified torrents
` +
            `3️⃣ *The Pirate Bay* - Classic torrent site
` +
            `4️⃣ *RARBG* - High quality releases

` +
            `⚠️ *Disclaimer:* Use VPN for safety. Download responsibly.`,
            [
                { type: 'url', text: '🎬 YTS Search', url: `https://yts.mx/browse-movies/${encodeURIComponent(movieName)}` },
                { type: 'url', text: '🔍 1337x Search', url: `https://1337x.to/search/${encodeURIComponent(movieName)}/1/` },
                { type: 'url', text: '🏴‍☠️ TPB Search', url: `https://thepiratebay.org/search.php?q=${encodeURIComponent(movieName)}` },
                { type: 'url', text: '📥 RARBG Search', url: `https://rarbg.to/torrents.php?search=${encodeURIComponent(movieName)}` },
                { type: 'quick', text: '🔙 Back', id: `movie_${movieName}` }
            ]
        );
    },

    // ═══════ IMDB HANDLER ═══════
    async handleIMDb(ctx, movieName) {
        const { reply, buttons, from } = ctx;
        await buttons.sendUrlButtons(
            from,
            `🎬 *IMDb Information*

` +
            `🔍 Searching: *${movieName}*

` +
            `📊 *Get Info:*
` +
            `• Ratings & Reviews
` +
            `• Cast & Crew
` +
            `• Plot Summary
` +
            `• Release Dates
` +
            `• Trailers`,
            [
                { type: 'url', text: '🔍 Search IMDb', url: `https://www.imdb.com/find?q=${encodeURIComponent(movieName)}` },
                { type: 'url', text: '📊 IMDb Top 250', url: 'https://www.imdb.com/chart/top/' },
                { type: 'quick', text: '🔙 Back', id: `movie_${movieName}` }
            ]
        );
    },

    // ═══════ YOUTUBE HANDLER ═══════
    async handleYouTube(ctx, movieName) {
        const { reply, buttons, from } = ctx;
        await buttons.sendUrlButtons(
            from,
            `📺 *YouTube Search*

` +
            `🔍 Searching: *${movieName}*

` +
            `📥 *Find:*
` +
            `• Full Movies
` +
            `• Trailers
` +
            `• Reviews
` +
            `• Clips
` +
            `• Behind the Scenes`,
            [
                { type: 'url', text: '🔍 Search YouTube', url: `https://www.youtube.com/results?search_query=${encodeURIComponent(movieName + ' full movie')}` },
                { type: 'url', text: '🎬 Trailers', url: `https://www.youtube.com/results?search_query=${encodeURIComponent(movieName + ' trailer')}` },
                { type: 'quick', text: '🔙 Back', id: `movie_${movieName}` }
            ]
        );
    }
};

// ═══════════════════════════════════════════
//  ROUTER FUNCTION - Add to main bot handler
// ═══════════════════════════════════════════

export async function routeMovieButtons(ctx) {
    const { buttonId } = ctx;

    if (buttonId.startsWith('subslk_')) {
        const movieName = buttonId.replace('subslk_', '');
        await MovieButtonHandlers.handleSubSLK(ctx, movieName);
        return true;
    }

    if (buttonId.startsWith('cineru_')) {
        const movieName = buttonId.replace('cineru_', '');
        await MovieButtonHandlers.handleCineru(ctx, movieName);
        return true;
    }

    if (buttonId.startsWith('sinhalasub_')) {
        const movieName = buttonId.replace('sinhalasub_', '');
        await MovieButtonHandlers.handleSinhalasub(ctx, movieName);
        return true;
    }

    if (buttonId.startsWith('cinebuz_')) {
        const movieName = buttonId.replace('cinebuz_', '');
        await MovieButtonHandlers.handleCinebuz(ctx, movieName);
        return true;
    }

    if (buttonId.startsWith('bestfilm_')) {
        const movieName = buttonId.replace('bestfilm_', '');
        await MovieButtonHandlers.handleBestFilm(ctx, movieName);
        return true;
    }

    if (buttonId.startsWith('imdb_')) {
        const movieName = buttonId.replace('imdb_', '');
        await MovieButtonHandlers.handleIMDb(ctx, movieName);
        return true;
    }

    if (buttonId.startsWith('yt_')) {
        const movieName = buttonId.replace('yt_', '');
        await MovieButtonHandlers.handleYouTube(ctx, movieName);
        return true;
    }

    if (buttonId.startsWith('movie_')) {
        // Re-show movie menu
        const movieName = buttonId.replace('movie_', '');
        ctx.fullArgs = movieName;
        await movieModule.execute(ctx);
        return true;
    }

    return false; // Not a movie button
}

// Default export for the command module
const movieModule = {
    command: 'movie',
    aliases: ['film', 'moviedl', 'movieinfo'],
    description: 'Search and download movies with Sinhala & English support',
    category: 'download',
    execute: async (ctx) => {
        const { fullArgs, reply, buttons, from } = ctx;

        if (!fullArgs) {
            return await buttons.sendReplyButtons(
                from,
                `🎬 *Movie Search Module*

` +
                `❌ Please provide a movie name!

` +
                `*Usage:*
` +
                `• *.movie <name>*
` +
                `• *.film <name>*
` +
                `• *.moviedl <name>*

` +
                `*Example:*
` +
                `• *.movie Inception*
` +
                `• *.movie Spider-Man Sinhala*`,
                [
                    { text: '🔙 Main Menu', id: 'main_menu' },
                    { text: '❓ Help', id: 'help_download' }
                ]
            );
        }

        await reply(
            `🎬 *Movie Search: ${fullArgs}*

` +
            `⏳ Searching available sources...
` +
            `🔍 Checking: SubSLK | Cineru | Sinhalasub | Cinebuz | Best Film Sites

` +
            `⚠️ *Note:* This feature provides movie information and streaming/download links.`
        );

        const sinhalaButtons = [
            { text: '📺 SubSLK', id: `subslk_${fullArgs}` },
            { text: '🎞️ Cineru', id: `cineru_${fullArgs}` },
            { text: '🎬 Sinhalasub', id: `sinhalasub_${fullArgs}` },
            { text: '🍿 Cinebuz', id: `cinebuz_${fullArgs}` }
        ];

        const internationalButtons = [
            { text: '⭐ Best Film DL', id: `bestfilm_${fullArgs}` },
            { text: '🎬 IMDb Info', id: `imdb_${fullArgs}` },
            { text: '📺 YouTube', id: `yt_${fullArgs}` }
        ];

        const navButtons = [
            { text: '🔙 Back to Menu', id: 'main_menu' },
            { text: '🔄 Search Again', id: 'search_again' }
        ];

        await buttons.sendReplyButtons(
            from,
            `🇱🇰 *Sinhala Movie Platforms*

` +
            `📌 *Select a platform to search:*

` +
            `• SubSLK - Sinhala Subtitles & Movies
` +
            `• Cineru - Latest Movies Hub
` +
            `• Sinhalasub - Sinhala Subtitle Zone
` +
            `• Cinebuz - Movie Download Center`,
            sinhalaButtons
        );

        await buttons.sendReplyButtons(
            from,
            `🌍 *International Platforms*

` +
            `📌 *Select a platform to search:*

` +
            `• Best Film DL - Top Download Sites
` +
            `• IMDb - Movie Info & Ratings
` +
            `• YouTube - Full Movies & Trailers`,
            internationalButtons
        );

        await buttons.sendReplyButtons(
            from,
            `⚡ *Quick Actions*`,
            navButtons
        );
    }
};

export default movieModule;
