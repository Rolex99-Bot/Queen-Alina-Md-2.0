// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - PREMIUM MENU COMMAND
//  Enhanced Interactive Menu with Language Support
//  Version: 2.1 Premium
// ═══════════════════════════════════════════

export default {
    command: ['menu', 'panel'],
    aliases: ['help', 'commands', 'list', 'මෙනුව', 'මෙනු'],
    description: 'Show premium interactive menu with image',
    category: 'owner',
    cooldown: 3,
    execute: async (ctx) => {
        const { config, buttons, reply, getRuntime, getString, lang, image } = ctx;
        const prefix = config.bot.prefix || '.';
        const runtime = getRuntime() || 'Active';
        const currentLang = lang || 'en';

        // ─── Premium Image Configuration ───
        const MENU_IMAGE = 'https://ibb.co/8nr0TZRP';
        
        // ─── Language Data ───
        const menuData = {
            en: {
                header: '💠 QUEEN ALINA MD 2.0 💠',
                runtime: 'Runtime',
                owner: 'Owner',
                mode: 'Mode',
                language: 'Language',
                premium: 'Premium Features Active',
                stats: '500+ Commands | 24/7 Online | AI Powered',
                categories: 'Command Categories',
                ownerCat: 'Owner',
                groupCat: 'Group',
                downloadCat: 'Download',
                aiCat: 'AI',
                funCat: 'Fun',
                cricketCat: 'Cricket',
                animeCat: 'Anime',
                mediaCat: 'Media',
                searchCat: 'Search',
                utilsCat: 'Utils',
                securityCat: 'Security',
                switchLang: 'Switch Language',
                allCmds: 'All Commands',
                footer: 'Queen Alina MD 2.0 | Premium Bot'
            },
            si: {
                header: '💠 ක්වීන් අලිනා MD 2.0 💠',
                runtime: 'ක්‍රියාකාලය',
                owner: 'අයිතිකරු',
                mode: 'මාදිලිය',
                language: 'භාෂාව',
                premium: 'ප්‍රීමියම් විශේෂාංග සක්‍රීයයි',
                stats: 'විධාන 500+ | 24/7 මාර්ගගත | AI බලගතු',
                categories: 'විධාන කාණ්ඩ',
                ownerCat: 'අයිතිකරු',
                groupCat: 'කණ්ඩායම',
                downloadCat: 'බාගත',
                aiCat: 'AI',
                funCat: 'විනෝදාංශ',
                cricketCat: 'ක්‍රිකට්',
                animeCat: 'ඇනිමේ',
                mediaCat: 'මාධ්‍යය',
                searchCat: 'සෙවීම',
                utilsCat: 'උපකරණ',
                securityCat: 'ආරක්ෂාව',
                switchLang: 'භාෂාව මාරු කරන්න',
                allCmds: 'සියලුම විධාන',
                footer: 'Queen Alina MD 2.0 | ප්‍රීමියම් බෝට්'
            }
        };

        const t = menuData[currentLang] || menuData.en;
        const langDisplay = currentLang === 'si' ? 'සිංහල 🇱🇰' : 'English 🇬🇧';
        const modeDisplay = (config.bot?.mode || 'public').toUpperCase();

        // ─── Premium Styled Text ───
        const menuCaption = `
╔══════════════════════════════════╗
║     👑 *${t.header}* 👑     ║
╠══════════════════════════════════╣

⏰ *${t.runtime}:* \`${runtime}\`
👤 *${t.owner}:* ${config.owner?.name || 'Queen Alina'}
🔰 *${t.mode}:* ${modeDisplay}
🌐 *${t.language}:* ${langDisplay}

╭────────────────────────────╮
│  💎 *${t.premium}*  │
│  ⚡ ${t.stats}  │
╰────────────────────────────╯

📚 *${t.categories}:*
┌─────────────────────────────┐
│ 👑 ${t.ownerCat}  │ 👥 ${t.groupCat}  │ 📥 ${t.downloadCat} │
│ 🤖 ${t.aiCat}     │ 🎭 ${t.funCat}    │ 🏏 ${t.cricketCat}  │
│ 🎌 ${t.animeCat}  │ 🎨 ${t.mediaCat}  │ 🔍 ${t.searchCat}   │
│ ⚙️ ${t.utilsCat}  │ 🛡️ ${t.securityCat}│                    │
└─────────────────────────────┘

🌐 *${t.switchLang}:* \`${prefix}lang si\` | \`${prefix}lang en\`
💡 *${t.allCmds}:* \`${prefix}help all\`

╚══════════════════════════════════╝
`.trim();

        // ─── Premium Button Layout ───
        const menuButtons = [
            // Row 1: Main Navigation
            [
                { text: `📋 ${t.allCmds}`, id: 'menu_all' },
                { text: `👑 ${t.ownerCat}`, id: 'menu_owner' }
            ],
            // Row 2: Core Features
            [
                { text: `👥 ${t.groupCat}`, id: 'menu_group' },
                { text: `📥 ${t.downloadCat}`, id: 'menu_download' }
            ],
            // Row 3: AI & Fun
            [
                { text: `🤖 ${t.aiCat}`, id: 'menu_ai' },
                { text: `🎭 ${t.funCat}`, id: 'menu_fun' }
            ],
            // Row 4: Media & Search
            [
                { text: `🎨 ${t.mediaCat}`, id: 'menu_media' },
                { text: `🔍 ${t.searchCat}`, id: 'menu_search' }
            ],
            // Row 5: Language Switch
            [
                { 
                    text: currentLang === 'si' ? '🇬🇧 English' : '🇱🇰 සිංහල', 
                    id: 'menu_switch_lang' 
                },
                { text: `⚙️ ${t.utilsCat}`, id: 'menu_utils' }
            ]
        ];

        // ─── Send Premium Menu with Image ───
        try {
            // Send image with caption first
            if (image && typeof image.send === 'function') {
                await image.send(ctx.from, MENU_IMAGE, {
                    caption: menuCaption,
                    contextInfo: {
                        externalAdReply: {
                            title: t.header,
                            body: t.premium,
                            thumbnailUrl: MENU_IMAGE,
                            sourceUrl: 'https://github.com/queenalina',
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    }
                });
            }

            // Send interactive buttons
            if (buttons && typeof buttons.sendReplyButtons === 'function') {
                await buttons.sendReplyButtons(ctx.from, menuCaption, menuButtons.flat(), {
                    header: `👑 ${t.header} 👑`,
                    footer: `© ${config.owner?.name || 'Queen Alina'} | ${config.owner?.number || 'MD 2.0'}\n${t.footer}`,
                    image: MENU_IMAGE
                });
            } else {
                // Fallback to text reply if buttons unavailable
                await reply(menuCaption);
            }

        } catch (error) {
            console.error('Menu Error:', error);
            // Ultimate fallback
            await reply(`👑 *QUEEN ALINA MD 2.0*\n\n${menuCaption}\n\n⚠️ Buttons unavailable. Use ${prefix}help <category>`);
        }
    }
};
