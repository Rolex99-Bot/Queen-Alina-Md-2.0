// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - ALIVE COMMAND
//  Premium Status with Image, Voice & Sticker
// ═══════════════════════════════════════════

export default {
    command: 'alive',
    aliases: ['status', 'online', 'up', 'bot', 'ping'],
    description: 'Check if bot is alive',
    category: 'info',
    execute: async (ctx) => {
        const { config, reply, getRuntime, sock, from, sender } = ctx;
        const runtime = getRuntime();
        const now = new Date();
        
        // ─── Time & Date ───
        const timeStr = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        const dateStr = now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const sinhalaDate = now.toLocaleDateString('si-LK', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // ─── Dynamic Status Bar ───
        const uptimePercent = Math.min(100, Math.floor((getRuntimeSeconds(runtime) / 86400) * 100));
        const statusBar = '█'.repeat(Math.floor(uptimePercent / 10)) + '░'.repeat(10 - Math.floor(uptimePercent / 10));

        // ─── Alive Image URL (Replace with your own) ───
        const aliveImageUrl = 'https://ibb.co/8nr0TZRP'; // 🔁 Change this URL

        // ─── Creative Alive Message ───
        const aliveText = `
╔══════════════════════════════════════╗
║      ✨ *QUEEN ALINA MD 2.0* ✨      ║
║         👑 *THE ALIVE SYSTEM* 👑      ║
╚══════════════════════════════════════╝

┏━━━━━━━━━ *🤖 BOT STATUS* ━━━━━━━━━┓
┃
┃  🟢 *Status:*    ONLINE & ACTIVE
┃  ⏱️ *Uptime:*    ${runtime}
┃  📊 *Stability:* [${statusBar}] ${uptimePercent}%
┃  🌐 *Version:*   ${config.bot.version}
┃  💎 *Mode:*      ${config.bot.mode.toUpperCase()}
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━ *👤 OWNER INFO* ━━━━━━━━━┓
┃
┃  👑 *Name:*   ${config.owner.name}
┃  📱 *Number:* ${config.owner.number}
┃  ✉️  *Pair:*   wa.me/${config.owner.number}
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━ *📅 TIME & DATE* ━━━━━━━━┓
┃
┃  🕐 *Time:* ${timeStr}
┃  📆 *Date:* ${dateStr}
┃  🇱🇰 *දිනය:* ${sinhalaDate}
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━ *⚡ SYSTEM HEALTH* ━━━━━━┓
┃
┃  💾 *Memory:*  ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
┃  🔄 *Node:*     ${process.version}
┃  📡 *Platform:* ${process.platform}
┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

╔══════════════════════════════════════╗
║  ✅ *ALL SYSTEMS OPERATIONAL* ✅      ║
║  🛡️  *SECURE | FAST | RELIABLE* 🛡️    ║
╚══════════════════════════════════════╝

💬 *Type .menu for commands*
🔗 *Pair Code:* \`.pair ${sender.split('@')[0]}\`
`;

        // ═══════════════════════════════════════
        //  SEND ALIVE IMAGE WITH CAPTION
        // ═══════════════════════════════════════
        try {
            await sock.sendMessage(from, {
                image: { url: aliveImageUrl },
                caption: aliveText,
                mimetype: 'image/jpeg',
                contextInfo: {
                    externalAdReply: {
                        title: '👑 Queen Alina MD 2.0',
                        body: '✅ Bot is Online & Ready',
                        thumbnailUrl: aliveImageUrl,
                        sourceUrl: `https://wa.me/${config.owner.number}`,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            });
        } catch (e) {
            // Fallback to text-only if image fails
            await reply(aliveText);
        }

        // ─── Send Voice Note (Status Announcement) ───
        try {
            const voiceText = `Queen Alina MD 2.0 is online and ready to serve. All systems operational.`;
            await sock.sendMessage(from, {
                audio: { url: 'https://your-tts-api.com/speak?text=' + encodeURIComponent(voiceText) },
                mimetype: 'audio/mp4',
                ptt: true
            });
        } catch (e) {
            // Voice optional
        }

        // ─── Send Status Sticker ───
        try {
            await sock.sendMessage(from, {
                sticker: { url: 'https://i.imgur.com/queenAlinaAlive.webp' }
            });
        } catch {
            // Sticker optional
        }

        // ─── Send Pairing Buttons ───
        try {
            await sock.sendMessage(from, {
                text: '🔗 *Quick Actions:*',
                buttons: [
                    {
                        buttonId: 'pair_code',
                        buttonText: { displayText: '📲 Get Pair Code' },
                        type: 1
                    },
                    {
                        buttonId: 'menu',
                        buttonText: { displayText: '📋 Open Menu' },
                        type: 1
                    },
                    {
                        buttonId: 'owner',
                        buttonText: { displayText: '👑 Contact Owner' },
                        type: 1
                    }
                ],
                headerType: 1
            });
        } catch {
            // Buttons optional
        }
    }
};

// ─── Helper: Convert Runtime to Seconds ───
function getRuntimeSeconds(runtimeStr) {
    const parts = runtimeStr.split(' ');
    let seconds = 0;
    parts.forEach(part => {
        if (part.includes('d')) seconds += parseInt(part) * 86400;
        if (part.includes('h')) seconds += parseInt(part) * 3600;
        if (part.includes('m')) seconds += parseInt(part) * 60;
        if (part.includes('s')) seconds += parseInt(part);
    });
    return seconds || 1;
}
