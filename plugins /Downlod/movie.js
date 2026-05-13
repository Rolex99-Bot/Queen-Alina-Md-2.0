// ═══════════════════════════════════════════
//  BUTTON HANDLERS FOR MOVIE PLATFORMS
// ═══════════════════════════════════════════

// SubSLK Handler
bot.on('button', async (ctx) => {
    if (ctx.buttonId.startsWith('subslk_')) {
        const movieName = ctx.buttonId.replace('subslk_', '');
        await ctx.reply(
            `📺 *SubSLK - Sinhala Subtitles*\n\n` +
            `🔍 Searching: *${movieName}*\n\n` +
            `🔗 *Direct Search Link:*\n` +
            `https://subslk.com/?s=${encodeURIComponent(movieName)}\n\n` +
            `📥 *Features:*\n` +
            `• Sinhala Subtitles (SRT)\n` +
            `• English Movies with Sinhala Sub\n` +
            `• TV Series Subtitles\n\n` +
            `⚡ *Queen Alina MD 2.0*`
        );
    }
});

// Cineru Handler
bot.on('button', async (ctx) => {
    if (ctx.buttonId.startsWith('cineru_')) {
        const movieName = ctx.buttonId.replace('cineru_', '');
        await ctx.reply(
            `🎞️ *Cineru - Movie Hub*\n\n` +
            `🔍 Searching: *${movieName}*\n\n` +
            `🔗 *Direct Search Link:*\n` +
            `https://cineru.lk/?s=${encodeURIComponent(movieName)}\n\n` +
            `📥 *Features:*\n` +
            `• Latest Movies\n` +
            `• HD Quality\n` +
            `• Fast Downloads\n\n` +
            `⚡ *Queen Alina MD 2.0*`
        );
    }
});

// Sinhalasub Handler
bot.on('button', async (ctx) => {
    if (ctx.buttonId.startsWith('sinhalasub_')) {
        const movieName = ctx.buttonId.replace('sinhalasub_', '');
        await ctx.reply(
            `🎬 *Sinhalasub - Subtitle Zone*\n\n` +
            `🔍 Searching: *${movieName}*\n\n` +
            `🔗 *Direct Search Link:*\n` +
            `https://sinhalasub.net/?s=${encodeURIComponent(movieName)}\n\n` +
            `📥 *Features:*\n` +
            `• Sinhala Subtitles\n` +
            `• Movie Reviews\n` +
            `• Download Links\n\n` +
            `⚡ *Queen Alina MD 2.0*`
        );
    }
});

// Cinebuz Handler
bot.on('button', async (ctx) => {
    if (ctx.buttonId.startsWith('cinebuz_')) {
        const movieName = ctx.buttonId.replace('cinebuz_', '');
        await ctx.reply(
            `🍿 *Cinebuz - Download Center*\n\n` +
            `🔍 Searching: *${movieName}*\n\n` +
            `🔗 *Direct Search Link:*\n` +
            `https://cinebuz.com/?s=${encodeURIComponent(movieName)}\n\n` +
            `📥 *Features:*\n` +
            `• Direct Downloads\n` +
            `• Multiple Qualities\n` +
            `• Fast Servers\n\n` +
            `⚡ *Queen Alina MD 2.0*`
        );
    }
});

// Best Film Download Handler
bot.on('button', async (ctx) => {
    if (ctx.buttonId.startsWith('bestfilm_')) {
        const movieName = ctx.buttonId.replace('bestfilm_', '');
        await ctx.reply(
            `⭐ *Best Film Download Sites*\n\n` +
            `🔍 Searching: *${movieName}*\n\n` +
            `🌍 *Top International Sites:*\n\n` +
            `1️⃣ *YTS (YIFY)*\n` +
            `🔗 https://yts.mx/browse-movies/${encodeURIComponent(movieName)}\n` +
            `✓ Small file sizes, HD quality\n\n` +
            `2️⃣ *1337x*\n` +
            `🔗 https://1337x.to/search/${encodeURIComponent(movieName)}/1/\n` +
            `✓ Huge library, verified torrents\n\n` +
            `3️⃣ *The Pirate Bay*\n` +
            `🔗 https://thepiratebay.org/search.php?q=${encodeURIComponent(movieName)}\n` +
            `✓ Classic torrent site\n\n` +
            `4️⃣ *RARBG*\n` +
            `🔗 https://rarbg.to/torrents.php?search=${encodeURIComponent(movieName)}\n` +
            `✓ High quality releases\n\n` +
            `⚠️ *Disclaimer:* Use VPN for safety. Download responsibly.\n\n` +
            `⚡ *Queen Alina MD 2.0*`
        );
    }
});

// IMDb Handler
bot.on('button', async (ctx) => {
    if (ctx.buttonId.startsWith('imdb_')) {
        const movieName = ctx.buttonId.replace('imdb_', '');
        await ctx.reply(
            `🎬 *IMDb Information*\n\n` +
            `🔍 Searching: *${movieName}*\n\n` +
            `🔗 *IMDb Search:*\n` +
            `https://www.imdb.com/find?q=${encodeURIComponent(movieName)}\n\n` +
            `📊 *Get Info:*\n` +
            `• Ratings & Reviews\n` +
            `• Cast & Crew\n` +
            `• Plot Summary\n` +
            `• Release Dates\n\n` +
            `⚡ *Queen Alina MD 2.0*`
        );
    }
});

// YouTube Handler
bot.on('button', async (ctx) => {
    if (ctx.buttonId.startsWith('yt_')) {
        const movieName = ctx.buttonId.replace('yt_', '');
        await ctx.reply(
            `📺 *YouTube Search*\n\n` +
            `🔍 Searching: *${movieName}*\n\n` +
            `🔗 *YouTube Results:*\n` +
            `https://www.youtube.com/results?search_query=${encodeURIComponent(movieName + ' full movie')}\n\n` +
            `📥 *Find:*\n` +
            `• Full Movies\n` +
            `• Trailers\n` +
            `• Reviews\n` +
            `• Clips\n\n` +
            `⚡ *Queen Alina MD 2.0*`
        );
    }
});
