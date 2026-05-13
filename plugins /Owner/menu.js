// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - MENU COMMAND
//  Premium Interactive Menu with Language Support
// ═══════════════════════════════════════════

export default {
    command: 'menu',
    aliases: ['help', 'commands', 'list', 'මෙනුව'],
    description: 'Show premium interactive menu',
    category: 'owner',
    execute: async (ctx) => {
        const { config, buttons, reply, getRuntime, getString, lang } = ctx;
        const prefix = config.bot.prefix;
        const runtime = getRuntime();

        // Language-specific menu text
        const menuTexts = {
            en: `
👑 *QUEEN ALINA MD 2.0* 👑

⏰ *Runtime:* ${runtime}
📱 *Owner:* ${config.owner.name}
🌐 *Mode:* ${config.bot.mode.toUpperCase()}
🗣️ *Language:* ${lang === 'si' ? 'සිංහල' : 'English'}

💎 *Premium Features Enabled*
🤖 500+ Commands | 24/7 Online
🎨 Interactive Buttons | AI Powered
🛡️ Security Protected | Auto Reply

📚 *Command Categories:*
👑 Owner | 👥 Group | 📥 Download
🤖 AI | 🎭 Fun | 🏏 Cricket
🎌 Anime | 🎨 Media | 🔍 Search
⚙️ Utils | 🛡️ Security

🌐 *Language:* *.lang si* | *.lang en*
`,
            si: `
👑 *QUEEN ALINA MD 2.0* 👑

⏰ *ක්‍රියාකාලය:* ${runtime}
📱 *අයිතිකරු:* ${config.owner.name}
🌐 *මාදිලිය:* ${config.bot.mode.toUpperCase()}
🗣️ *භාෂාව:* ${lang === 'si' ? 'සිංහල' : 'English'}

💎 *ප්‍රීමියම් විශේෂාංග සක්‍රීයයි*
🤖 විධාන 500+ | 24/7 මාර්ගගත
🎨 අන්තර්ක්‍රියාකාර බොත්තම් | AI බලගතු
🛡️ ආරක්ෂාව ආරක්ෂිත | ස්වයං ප්‍රතිචාර

📚 *විධාන කාණ්ඩ:*
👑 අයිතිකරු | 👥 කණ්ඩායම | 📥 බාගත
🤖 AI | 🎭 විනෝදාංශ | 🏏 ක්‍රිකට්
🎌 ඇනිමේ | 🎨 මාධ්‍යය | 🔍 සෙවීම
⚙️ උපකරණ | 🛡️ ආරක්ෂාව

🌐 *භාෂාව:* *.lang si* | *.lang en*
`
        };

        const menuText = menuTexts[lang] || menuTexts.en;

        const menuButtons = [
            { text: lang === 'si' ? '📋 සියලුම විධාන' : '📋 All Commands', id: 'menu_all' },
            { text: lang === 'si' ? '👑 අයිතිකරු' : '👑 Owner', id: 'menu_owner' },
            { text: lang === 'si' ? '👥 කණ්ඩායම' : '👥 Group', id: 'menu_group' },
            { text: lang === 'si' ? '📥 බාගත' : '📥 Download', id: 'menu_download' },
            { text: lang === 'si' ? '🤖 AI' : '🤖 AI', id: 'menu_ai' },
            { text: lang === 'si' ? '🎭 විනෝදාංශ' : '🎭 Fun', id: 'menu_fun' }
        ];

        await buttons.sendReplyButtons(ctx.from, menuText, menuButtons, {
            header: lang === 'si' ? '💠 QUEEN ALINA MD 2.0 මෙනුව 💠' : '💠 QUEEN ALINA MD 2.0 MENU 💠',
            footer: `© ${config.owner.name} | ${config.owner.number}`
        });
    }
};
