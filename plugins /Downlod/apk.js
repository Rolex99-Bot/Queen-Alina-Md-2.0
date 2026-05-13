// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - APK DOWNLOAD
//  Android App APK Downloader
// ═══════════════════════════════════════════

import axios from 'axios';

const apkSources = {
    // Direct APK download sources
    apkpure: 'https://d.apkpure.com/b/APK/',
    apkmirror: 'https://www.apkmirror.com/wp-content/themes/APKMirror/download.php?id=',
    uptodown: 'https://dw.uptodown.com/dwn/',
    apkcombo: 'https://apkcombo.com/download/',
};

export default {
    command: 'apk',
    aliases: ['app', 'android', 'downloadapk', 'ඇප්'],
    description: 'Download Android APK files',
    category: 'download',
    execute: async (ctx) => {
        const { fullArgs, reply, buttons, from, sock } = ctx;

        if (!fullArgs) {
            const helpText = `
📱 *APK DOWNLOADER* 📱

🤖 Download Android apps as APK files

📝 *Usage:*
*.apk <app name>*
*.apk <package name>*

📋 *Examples:*
*.apk whatsapp*
*.apk com.whatsapp*
*.apk instagram*
*.apk tiktok*
*.apk facebook*
*.apk spotify*
*.apk telegram*
*.apk chrome*
*.apk youtube*
*.apk netflix*

⚠️ *Note:* This searches for official APK sources

_Queen Alina MD 2.0_
`;

            const popularButtons = [
                { text: '📱 WhatsApp', id: 'apk_whatsapp' },
                { text: '📸 Instagram', id: 'apk_instagram' },
                { text: '🎵 TikTok', id: 'apk_tiktok' },
                { text: '💬 Telegram', id: 'apk_telegram' },
                { text: '🎵 Spotify', id: 'apk_spotify' },
                { text: '📺 Netflix', id: 'apk_netflix' }
            ];

            await buttons.sendReplyButtons(from, helpText, popularButtons);
            return;
        }

        const appName = fullArgs.toLowerCase().trim();

        // Popular app package names mapping
        const appPackages = {
            // Social Media
            'whatsapp': 'com.whatsapp',
            'instagram': 'com.instagram.android',
            'facebook': 'com.facebook.katana',
            'messenger': 'com.facebook.orca',
            'twitter': 'com.twitter.android',
            'tiktok': 'com.zhiliaoapp.musically',
            'snapchat': 'com.snapchat.android',
            'telegram': 'org.telegram.messenger',
            'signal': 'org.thoughtcrime.securesms',
            'discord': 'com.discord',

            // Entertainment
            'youtube': 'com.google.android.youtube',
            'netflix': 'com.netflix.mediaclient',
            'spotify': 'com.spotify.music',
            'twitch': 'tv.twitch.android.app',
            'hotstar': 'in.startv.hotstar',
            'primevideo': 'com.amazon.avod.thirdpartyclient',

            // Productivity
            'chrome': 'com.android.chrome',
            'gmail': 'com.google.android.gm',
            'drive': 'com.google.android.apps.docs',
            'maps': 'com.google.android.apps.maps',
            'translate': 'com.google.android.apps.translate',
            'photos': 'com.google.android.apps.photos',

            // Shopping
            'amazon': 'in.amazon.mShop.android.shopping',
            'flipkart': 'com.flipkart.android',
            'daraz': 'com.daraz.android',
            'aliexpress': 'com.alibaba.aliexpresshd',

            // Games
            'pubg': 'com.tencent.ig',
            'freefire': 'com.dts.freefireth',
            'cod': 'com.activision.callofduty.shooter',
            'subway': 'com.kiloo.subwaysurf',
            'candy': 'com.king.candycrushsaga',
            'ludo': 'com.ludo.king',

            // Tools
            'zarchiver': 'ru.zdevs.zarchiver',
            'esfile': 'com.estrongs.android.pop',
            'shareit': 'com.lenovo.anyshare.gps',
            'mxplayer': 'com.mxtech.videoplayer.ad',
            'vlc': 'org.videolan.vlc',

            // Sri Lankan Apps
            'pickme': 'com.pickme.passenger',
            'uber': 'com.ubercab',
            'kapruka': 'com.kapruka',
            'wowlk': 'com.wow.lk',
            'darazlk': 'com.daraz.android',
        };

        // Get package name
        let packageName = appPackages[appName] || appName;

        // If user provided package name directly (contains dots)
        if (appName.includes('.')) {
            packageName = appName;
        }

        try {
            await reply(`⏳ *Searching APK for ${appName}...*`);

            // Try APKPure API
            const apkpureUrl = `https://api.apkpure.com/gp/v1/app_detail?package=${packageName}`;

            try {
                const response = await axios.get(apkpureUrl, { 
                    timeout: 15000,
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                    }
                });

                if (response.data && response.data.data) {
                    const appData = response.data.data;

                    const appInfo = `
📱 *APK FOUND* 📱

📦 *Name:* ${appData.name || appName}
📋 *Package:* ${packageName}
⭐ *Rating:* ${appData.rating || 'N/A'}
📊 *Version:* ${appData.version || 'Latest'}
📥 *Downloads:* ${appData.download_count || 'N/A'}
📝 *Description:* ${appData.description?.substring(0, 200) || 'No description'}

⏳ Preparing download link...

_Queen Alina MD 2.0_
`;

                    await reply(appInfo);
                }
            } catch (apiError) {
                // API failed, continue with direct link
            }

            // Generate download links
            const downloadLinks = {
                apkpure: `https://d.apkpure.com/b/APK/${packageName}?version=latest`,
                apkmirror: `https://www.apkmirror.com/apk/${packageName.replace(/\./g, '-')}/`,
                apkcombo: `https://apkcombo.com/${packageName}/download/apk`
            };

            // Send download options
            const downloadText = `
📥 *DOWNLOAD ${appName.toUpperCase()}* 📥

📦 Package: ${packageName}

🔗 *Download Sources:*

1️⃣ *APKPure (Recommended)*
${downloadLinks.apkpure}

2️⃣ *APKMirror (Safe)*
${downloadLinks.apkmirror}

3️⃣ *APKCombo*
${downloadLinks.apkcombo}

⚠️ *Safety Tips:*
• Only download from trusted sources
• Enable "Unknown Sources" in Settings
• Scan APK with antivirus before installing

_Queen Alina MD 2.0_
`;

            const downloadButtons = [
                { text: '📥 APKPure', id: `dl_apkpure_${packageName}` },
                { text: '📥 APKMirror', id: `dl_apkmirror_${packageName}` },
                { text: '📥 APKCombo', id: `dl_apkcombo_${packageName}` }
            ];

            await buttons.sendReplyButtons(from, downloadText, downloadButtons);

            // Also try to send direct APK if available
            try {
                const directUrl = `https://d.apkpure.com/b/APK/${packageName}`;

                await sock.sendMessage(from, {
                    document: { url: directUrl },
                    mimetype: 'application/vnd.android.package-archive',
                    fileName: `${appName}_latest.apk`,
                    caption: `📦 *${appName.toUpperCase()} APK*\n\n⚠️ Download and install manually if direct download fails\n\n_Queen Alina MD 2.0_`
                });
            } catch (dlError) {
                // Direct download failed, links already sent
            }

        } catch (error) {
            await reply(`❌ *Error searching APK!*\n\nError: ${error.message}\n\nTry searching on:\n• apkpure.com\n• apkmirror.com\n• apkcombo.com\n\n_Queen Alina MD 2.0_`);
        }
    }
};
