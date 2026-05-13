// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - BOT INFO (PREMIUM EDITION)
// ═══════════════════════════════════════════

import { generateWAMessageFromContent, downloadMediaMessage } from '@whiskeysockets/baileys';
import moment from 'moment-timezone';

export default {
    command: 'bot',
    aliases: ['info', 'about', 'status', 'alive'],
    description: 'Bot information & status',
    category: 'owner',
    cooldown: 5,
    execute: async (ctx) => {
        const { config, reply, sock, m, isOwner } = ctx;

        // ─── Dynamic Data ───
        const uptime = process.uptime();
        const formattedUptime = formatUptime(uptime);
        const memory = process.memoryUsage();
        const ramUsed = (memory.heapUsed / 1024 / 1024).toFixed(2);
        const ramTotal = (memory.heapTotal / 1024 / 1024).toFixed(2);
        const platform = process.platform;
        const nodeVersion = process.version;
        const date = moment().tz(config.timezone || 'Asia/Colombo').format('YYYY-MM-DD');
        const time = moment().tz(config.timezone || 'Asia/Colombo').format('hh:mm A');
        const totalCommands = config.commands?.length || 500;
        const usersCount = config.database?.users?.length || '∞';
        const groupsCount = config.database?.groups?.length || '∞';

        // ─── Owner-Only Advanced Stats ───
        const showAdvanced = isOwner;

        // ─── Bot Image URL ───
        const botImageUrl = 'https://i.ibb.co/8nr0TZRP/Queen-Alina-MD.png';

        // ─── Interactive Button Message with Image ───
        const buttonMessage = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: {
                        header: {
                            title: `✨ ${config.bot.name} ✨`,
                            subtitle: 'Premium Multi-Device Bot',
                            hasMediaAttachment: true,
                            imageMessage: {
                                url: botImageUrl,
                                mimetype: 'image/jpeg',
                                caption: `${config.bot.name} - ${config.bot.version}`,
                                fileLength: 999999999,
                                height: 1000,
                                width: 1000,
                                mediaKey: undefined,
                                fileEncSha256: undefined,
                                directPath: undefined,
                                mediaKeyTimestamp: undefined,
                                jpegThumbnail: undefined,
                                contextInfo: undefined
                            }
                        },
                        body: {
                            text: buildMainText(config, formattedUptime, date, time, totalCommands, usersCount, groupsCount, showAdvanced, ramUsed, ramTotal, platform, nodeVersion)
                        },
                        footer: {
                            text: `© ${config.owner.name} • ${config.bot.version}`
                        },
                        nativeFlowMessage: {
                            buttons: [
                                {
                                    name: "quick_reply",
                                    buttonParamsJson: JSON.stringify({
                                        display_text: "📜 All Commands",
                                        id: `${config.prefix}menu`
                                    })
                                },
                                {
                                    name: "quick_reply",
                                    buttonParamsJson: JSON.stringify({
                                        display_text: "👑 Owner Contact",
                                        id: `${config.prefix}owner`
                                    })
                                },
                                {
                                    name: "quick_reply",
                                    buttonParamsJson: JSON.stringify({
                                        display_text: "⚡ Bot Status",
                                        id: `${config.prefix}ping`
                                    })
                                },
                                {
                                    name: "cta_url",
                                    buttonParamsJson: JSON.stringify({
                                        display_text: "🌐 GitHub Repo",
                                        url: config.bot.repo || "https://github.com/queenalina",
                                        merchant_url: config.bot.repo || "https://github.com/queenalina"
                                    })
                                },
                                {
                                    name: "cta_url",
                                    buttonParamsJson: JSON.stringify({
                                        display_text: "💬 Support Group",
                                        url: config.bot.group || "https://chat.whatsapp.com/support",
                                        merchant_url: config.bot.group || "https://chat.whatsapp.com/support"
                                    })
                                }
                            ]
                        }
                    }
                }
            }
        }, { quoted: m });

        // ─── Send Message ───
        await sock.relayMessage(m.chat, buttonMessage.message, { messageId: buttonMessage.key.id });

        // ─── Optional: Send Animated Status (if alive command used) ───
        if (ctx.command === 'alive') {
            await sendAliveStatus(ctx, config, formattedUptime);
        }
    }
};

// ─── Helper Functions ───

function buildMainText(config, uptime, date, time, totalCmds, users, groups, advanced, ramUsed, ramTotal, platform, nodeV) {
    let text = `╭───❮ *BOT INFORMATION* ❯───╮\n\n`;
    
    text += `│ 🤖 *Name:* ${config.bot.name}\n`;
    text += `│ 🔢 *Version:* ${config.bot.version}\n`;
    text += `│ 🌐 *Mode:* ${config.bot.mode || 'Public'}\n`;
    text += `│ 🗣️ *Languages:* ${config.bot.languages?.join(' • ') || 'Sinhala & English'}\n`;
    text += `│ ⏰ *Time:* ${time}\n`;
    text += `│ 📅 *Date:* ${date}\n`;
    text += `│ ⏱️ *Uptime:* ${uptime}\n\n`;
    
    text += `├─❮ *OWNER DETAILS* ❯─┤\n`;
    text += `│ 👑 *Owner:* ${config.owner.name}\n`;
    text += `│ 📱 *Number:* ${config.owner.number}\n`;
    text += `│ 📝 *Caption:* ${config.owner.caption || 'Queen Alina MD'}\n`;
    text += `│ 🙏 *Credits:* ${config.owner.thanks || 'Baileys & Community'}\n\n`;
    
    text += `├─❮ *STATISTICS* ❯─┤\n`;
    text += `│ 📊 *Commands:* ${totalCmds}+\n`;
    text += `│ 👥 *Users:* ${users}\n`;
    text += `│ 👨‍👩‍👧‍👦 *Groups:* ${groups}\n`;
    
    if (advanced) {
        text += `│ 💾 *RAM:* ${ramUsed}MB / ${ramTotal}MB\n`;
        text += `│ 🖥️ *Platform:* ${platform}\n`;
        text += `│ ⚙️ *Node:* ${nodeV}\n`;
    }
    
    text += `\n├─❮ *PREMIUM FEATURES* ❯─┤\n`;
    text += `│ • 500+ Advanced Commands\n`;
    text += `│ • Premium Button System\n`;
    text += `│ • AI Integration (GPT-4)\n`;
    text += `│ • Auto Reply & Anti-Spam\n`;
    text += `│ • Security Protection\n`;
    text += `│ • 24/7 Uptime & Auto-Restart\n`;
    text += `│ • Multi-Language Support\n`;
    text += `│ • WhatsApp Pair Code Login\n`;
    
    text += `\n╰───❮ *QUEEN ALINA MD 2.0* ❯───╯`;
    
    return text;
}

function formatUptime(seconds) {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    
    const parts = [];
    if (d > 0) parts.push(`${d}d`);
    if (h > 0) parts.push(`${h}h`);
    if (m > 0) parts.push(`${m}m`);
    if (s > 0) parts.push(`${s}s`);
    
    return parts.join(' ') || '0s';
}

async function sendAliveStatus(ctx, config, uptime) {
    const { reply } = ctx;
    const aliveText = `
╭━━━━━━━━━━━━━━━━━━━━━╮
┃     *🤖 ALIVE 🤖*     
┃  *${config.bot.name}*
╰━━━━━━━━━━━━━━━━━━━━━╯

*Status:* 🟢 Online & Running
*Uptime:* ${uptime}
*Version:* ${config.bot.version}

*${config.owner.caption || 'Queen Alina MD'}*
`;
    
    await reply(aliveText);
}
