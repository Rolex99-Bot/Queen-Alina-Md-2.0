// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - BOT INFO
// ═══════════════════════════════════════════

export default {
    command: 'bot',
    aliases: ['info', 'about'],
    description: 'Bot information',
    category: 'owner',
    execute: async (ctx) => {
        const { config, reply } = ctx;

        const botInfo = `
🤖 *QUEEN ALINA MD 2.0* 🤖

📛 *Name:* ${config.bot.name}
🔢 *Version:* ${config.bot.version}
👑 *Owner:* ${config.owner.name}
📱 *Number:* ${config.owner.number}
📝 *Caption:* ${config.owner.caption}
🙏 *Thanks To:* ${config.owner.thanks}
🗣️ *Languages:* ${config.bot.languages.join(' & ')}

💠 *Features:*
• 500+ Advanced Commands
• Premium Button System
• AI Integration
• Auto Reply System
• Security Protection
• 24/7 Uptime

© ${config.owner.name} | ${config.owner.number}
`;

        await reply(botInfo);
    }
};
