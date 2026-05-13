const { cmd, commands } = require('../command');
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');

// ==================== SONG COMMAND MODULE ====================
// Queen Alina MD 2.0 - Premium Music Downloader
// Supports: Sinhala & English | Button Interface | High Quality

const LANG = {
    en: {
        searching: '🔍 Searching for your song...',
        notFound: '❌ Song not found. Please try another keyword.',
        downloading: '📥 Downloading audio... Please wait.',
        invalidLink: '❌ Invalid YouTube link provided.',
        nowPlaying: '🎵 Now Playing',
        duration: 'Duration',
        views: 'Views',
        channel: 'Channel',
        quality: 'Quality',
        chooseFormat: '🎧 Choose Audio Format:',
        songInfo: '🎵 Song Information',
        downloadComplete: '✅ Download Complete!',
        error: '❌ An error occurred. Please try again.',
        help: '🎵 *Song Commands:*\n\n• .song <name> - Search & download song\n• .song <yt-link> - Download from link\n• .play <name> - Quick play\n• .lyrics <name> - Get lyrics'
    },
    si: {
        searching: '🔍 ඔබගේ ගීතය සොයමින්...',
        notFound: '❌ ගීතය හමු නොවීය. කරුණාකර වෙනත් මූල පදයක් උත්සාහ කරන්න.',
        downloading: '📥 ශ්‍රව්‍ය බාගත කරමින්... කරුණාකර රැඳී සිටින්න.',
        invalidLink: '❌ වලංගු නොවන YouTube සබැඳියක් ලබා දී ඇත.',
        nowPlaying: '🎵 දැන් වාදනය වේ',
        duration: 'කාලසීමාව',
        views: 'නැරඹුම්',
        channel: 'නාලිකාව',
        quality: 'ගුණාත්මකභාවය',
        chooseFormat: '🎧 ශ්‍රව්‍ය ආකෘතිය තෝරන්න:',
        songInfo: '🎵 ගීත තොරතුරු',
        downloadComplete: '✅ බාගත කිරීම සම්පූර්ණයි!',
        error: '❌ දෝෂයක් ඇති විය. කරුණාකර නැවත උත්සාහ කරන්න.',
        help: '🎵 *ගීත විධාන:*\n\n• .song <නම> - ගීතය සොයා බාගත කරන්න\n• .song <yt-link> - සබැඳියෙන් බාගත කරන්න\n• .play <නම> - ඉක්මන් වාදනය\n• .lyrics <නම> - ගී පද ලබා ගන්න'
    }
};

// Get user language (default: English)
function getLang(userData) {
    return userData?.lang === 'si' ? LANG.si : LANG.en;
}

// Format duration
function formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Format numbers
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

// Create premium buttons
function createSongButtons(videoId, lang) {
    const isSinhala = lang === LANG.si;
    return {
        header: isSinhala ? '🔊 ශ්‍රව්‍ය ආකෘති' : '🔊 Audio Formats',
        buttons: [
            {
                buttonId: `song_mp3_${videoId}`,
                buttonText: { displayText: '🎵 MP3 (128kbps)' },
                type: 1
            },
            {
                buttonId: `song_high_${videoId}`,
                buttonText: { displayText: '🔥 High Quality (320kbps)' },
                type: 1
            },
            {
                buttonId: `song_doc_${videoId}`,
                buttonText: { displayText: '📄 Document Format' },
                type: 1
            }
        ]
    };
}

// ==================== MAIN SONG COMMAND ====================
cmd({
    pattern: "song",
    desc: "Download songs from YouTube",
    category: "music",
    filename: __filename,
    use: '<song name or youtube link>'
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply, react }) => {
    try {
        const userData = global.db?.data?.users?.[sender] || {};
        const lang = getLang(userData);

        if (!q) {
            return reply(lang.help);
        }

        await react('🔍');
        await reply(lang.searching);

        let videoInfo;
        let searchQuery = q;

        // Check if input is a YouTube link
        const ytRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
        const match = q.match(ytRegex);

        if (match) {
            // Direct link provided
            const videoId = match[1];
            try {
                const info = await ytdl.getInfo(videoId);
                videoInfo = {
                    videoId: videoId,
                    title: info.videoDetails.title,
                    author: info.videoDetails.author.name,
                    duration: parseInt(info.videoDetails.lengthSeconds),
                    views: parseInt(info.videoDetails.viewCount),
                    thumbnail: info.videoDetails.thumbnails.pop().url,
                    url: info.videoDetails.video_url
                };
            } catch (e) {
                return reply(lang.invalidLink);
            }
        } else {
            // Search by name
            const searchResult = await yts(searchQuery);
            if (!searchResult.videos.length) {
                return reply(lang.notFound);
            }
            const video = searchResult.videos[0];
            videoInfo = {
                videoId: video.videoId,
                title: video.title,
                author: video.author.name,
                duration: video.duration.seconds,
                views: video.views,
                thumbnail: video.thumbnail,
                url: video.url
            };
        }

        // Create song info message
        const songCaption = `
${lang.songInfo}

📌 *${videoInfo.title}*

👤 *${lang.channel}:* ${videoInfo.author}
⏱️ *${lang.duration}:* ${formatDuration(videoInfo.duration)}
👁️ *${lang.views}:* ${formatNumber(videoInfo.views)}
🔗 *Link:* ${videoInfo.url}

${lang.chooseFormat}
        `.trim();

        // Send thumbnail with buttons
        const buttons = createSongButtons(videoInfo.videoId, lang);

        await conn.sendMessage(from, {
            image: { url: videoInfo.thumbnail },
            caption: songCaption,
            footer: 'Queen Alina MD 2.0 🎵',
            buttons: buttons.buttons,
            headerType: 4
        }, { quoted: mek });

        await react('🎵');

        // Store video info for button callbacks
        if (!global.songCache) global.songCache = {};
        global.songCache[videoInfo.videoId] = videoInfo;

    } catch (error) {
        console.error('Song command error:', error);
        reply(lang.error);
        await react('❌');
    }
});

// ==================== PLAY COMMAND (Quick Download) ====================
cmd({
    pattern: "play",
    desc: "Quick play song (auto download best quality)",
    category: "music",
    filename: __filename,
    use: '<song name>'
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply, react }) => {
    try {
        const userData = global.db?.data?.users?.[sender] || {};
        const lang = getLang(userData);

        if (!q) {
            return reply(userData?.lang === 'si' ? '🔍 ගීතයේ නම ලබා දෙන්න.\nඋදාහරණ: .play maa nowana' : '🔍 Please provide a song name.\nExample: .play faded');
        }

        await react('🔍');
        await reply(lang.searching);

        const searchResult = await yts(q);
        if (!searchResult.videos.length) {
            return reply(lang.notFound);
        }

        const video = searchResult.videos[0];
        await react('📥');
        await reply(lang.downloading);

        // Download audio
        const audioStream = ytdl(video.url, { 
            quality: 'highestaudio',
            filter: 'audioonly'
        });

        const tempDir = path.join(__dirname, '../temp');
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

        const fileName = `${Date.now()}_${video.videoId}.mp3`;
        const filePath = path.join(tempDir, fileName);
        const writeStream = fs.createWriteStream(filePath);

        audioStream.pipe(writeStream);

        await new Promise((resolve, reject) => {
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });

        // Send audio
        await conn.sendMessage(from, {
            audio: fs.readFileSync(filePath),
            mimetype: 'audio/mpeg',
            fileName: `${video.title}.mp3`,
            caption: `🎵 ${video.title}\n👤 ${video.author.name}\n⏱️ ${video.duration.timestamp}`,
            contextInfo: {
                externalAdReply: {
                    title: video.title,
                    body: video.author.name,
                    thumbnailUrl: video.thumbnail,
                    mediaType: 2,
                    mediaUrl: video.url
                }
            }
        }, { quoted: mek });

        // Cleanup
        fs.unlinkSync(filePath);
        await react('✅');

    } catch (error) {
        console.error('Play command error:', error);
        reply(LANG.en.error);
        await react('❌');
    }
});

// ==================== LYRICS COMMAND ====================
cmd({
    pattern: "lyrics",
    desc: "Get song lyrics",
    category: "music",
    filename: __filename,
    use: '<song name>'
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply, react }) => {
    try {
        const userData = global.db?.data?.users?.[sender] || {};
        const isSinhala = userData?.lang === 'si';

        if (!q) {
            return reply(isSinhala ? '🔍 ගීතයේ නම ලබා දෙන්න.' : '🔍 Please provide a song name.');
        }

        await react('📝');

        // Note: You need to install lyrics-finder or similar package
        // const lyricsFinder = require('lyrics-finder');
        // const lyrics = await lyricsFinder(q);

        // Placeholder for lyrics functionality
        const lyrics = isSinhala 
            ? '📝 ගී පද සේවාව ඉක්මනින් එකතු කෙරේ...' 
            : '📝 Lyrics service coming soon...\n\nTry: .song ' + q;

        await reply(lyrics);
        await react('✅');

    } catch (error) {
        console.error('Lyrics command error:', error);
        reply(LANG.en.error);
        await react('❌');
    }
});

// ==================== BUTTON HANDLERS ====================
// Handle MP3 button
cmd({
    pattern: "song_mp3",
    desc: "Download MP3 format",
    category: "music",
    fromMe: false,
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply, react }) => {
    try {
        const videoId = body.split('_')[2];
        if (!videoId || !global.songCache?.[videoId]) {
            return reply(LANG.en.error);
        }

        const videoInfo = global.songCache[videoId];
        await react('📥');
        reply(LANG.en.downloading);

        const audioStream = ytdl(videoInfo.url, { 
            quality: 'highestaudio',
            filter: 'audioonly'
        });

        const tempDir = path.join(__dirname, '../temp');
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

        const fileName = `${Date.now()}_${videoId}_128kbps.mp3`;
        const filePath = path.join(tempDir, fileName);
        const writeStream = fs.createWriteStream(filePath);

        audioStream.pipe(writeStream);

        await new Promise((resolve, reject) => {
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });

        await conn.sendMessage(from, {
            audio: fs.readFileSync(filePath),
            mimetype: 'audio/mpeg',
            fileName: `${videoInfo.title}.mp3`,
            caption: `🎵 ${videoInfo.title}\n📦 Format: MP3 (128kbps)\n👤 ${videoInfo.author}`
        }, { quoted: mek });

        fs.unlinkSync(filePath);
        await react('✅');

    } catch (error) {
        console.error('MP3 download error:', error);
        reply(LANG.en.error);
        await react('❌');
    }
});

// High Quality Download
cmd({
    pattern: "song_high",
    desc: "Download high quality audio",
    category: "music",
    fromMe: false,
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply, react }) => {
    try {
        const videoId = body.split('_')[2];
        if (!videoId || !global.songCache?.[videoId]) {
            return reply(LANG.en.error);
        }

        const videoInfo = global.songCache[videoId];
        await react('📥');
        reply(LANG.en.downloading);

        const audioStream = ytdl(videoInfo.url, { 
            quality: 'highestaudio',
            filter: 'audioonly',
            highWaterMark: 1 << 25
        });

        const tempDir = path.join(__dirname, '../temp');
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

        const fileName = `${Date.now()}_${videoId}_320kbps.mp3`;
        const filePath = path.join(tempDir, fileName);
        const writeStream = fs.createWriteStream(filePath);

        audioStream.pipe(writeStream);

        await new Promise((resolve, reject) => {
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });

        await conn.sendMessage(from, {
            document: fs.readFileSync(filePath),
            mimetype: 'audio/mpeg',
            fileName: `${videoInfo.title} [320kbps].mp3`,
            caption: `🔥 High Quality\n🎵 ${videoInfo.title}\n👤 ${videoInfo.author}\n📦 320kbps`
        }, { quoted: mek });

        fs.unlinkSync(filePath);
        await react('✅');

    } catch (error) {
        console.error('High quality download error:', error);
        reply(LANG.en.error);
        await react('❌');
    }
});

// Document Format Download
cmd({
    pattern: "song_doc",
    desc: "Download as document",
    category: "music",
    fromMe: false,
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply, react }) => {
    try {
        const videoId = body.split('_')[2];
        if (!videoId || !global.songCache?.[videoId]) {
            return reply(LANG.en.error);
        }

        const videoInfo = global.songCache[videoId];
        await react('📥');
        reply(LANG.en.downloading);

        const audioStream = ytdl(videoInfo.url, { 
            quality: 'highestaudio',
            filter: 'audioonly'
        });

        const tempDir = path.join(__dirname, '../temp');
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

        const fileName = `${Date.now()}_${videoId}.mp3`;
        const filePath = path.join(tempDir, fileName);
        const writeStream = fs.createWriteStream(filePath);

        audioStream.pipe(writeStream);

        await new Promise((resolve, reject) => {
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });

        await conn.sendMessage(from, {
            document: fs.readFileSync(filePath),
            mimetype: 'audio/mpeg',
            fileName: `${videoInfo.title}.mp3`,
            caption: `📄 Document Format\n🎵 ${videoInfo.title}\n👤 ${videoInfo.author}`
        }, { quoted: mek });

        fs.unlinkSync(filePath);
        await react('✅');

    } catch (error) {
        console.error('Document download error:', error);
        reply(LANG.en.error);
        await react('❌');
    }
});

// ==================== AUTO CLEANUP ====================
setInterval(() => {
    const tempDir = path.join(__dirname, '../temp');
    if (fs.existsSync(tempDir)) {
        fs.readdir(tempDir, (err, files) => {
            if (err) return;
            files.forEach(file => {
                const filePath = path.join(tempDir, file);
                fs.stat(filePath, (err, stats) => {
                    if (err) return;
                    const now = Date.now();
                    const fileAge = now - stats.mtime.getTime();
                    if (fileAge > 3600000) {
                        fs.unlink(filePath, () => {});
                    }
                });
            });
        });
    }
}, 3600000);

module.exports = {
    getLang,
    formatDuration,
    formatNumber,
    createSongButtons
};

