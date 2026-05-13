// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - SETTINGS
// ═══════════════════════════════════════════

export default {
    command: 'settings',
    aliases: ['config', 'setup'],
    description: 'Bot settings panel',
    category: 'owner',
    ownerOnly: true,
    execute: async (ctx) => {
        const { config, buttons, reply, from } = ctx;

        const settingsText = `
⚙️ *BOT SETTINGS* ⚙️

📱 *Auto Read:* ${config.auto.read ? 'ON ✅' : 'OFF ❌'}
📊 *Auto Status:* ${config.auto.status ? 'ON ✅' : 'OFF ❌'}
💬 *Auto Reply:* ${config.auto.reply ? 'ON ✅' : 'OFF ❌'}
📞 *Auto Reject Call:* ${config.auto.rejectCall ? 'ON ✅' : 'OFF ❌'}
👥 *Auto Save Contacts:* ${config.auto.saveContacts ? 'ON ✅' : 'OFF ❌'}

🔒 *Security:*
• Anti Spam: ${config.security.antiSpam ? 'ON ✅' : 'OFF ❌'}
• Anti Bug: ${config.security.antiBug ? 'ON ✅' : 'OFF ❌'}
• Anti Toxic: ${config.security.antiToxic ? 'ON ✅' : 'OFF ❌'}
• Anti Call: ${config.security.antiCall ? 'ON ✅' : 'OFF ❌'}

🌐 *Mode:* ${config.bot.mode.toUpperCase()}
`;

        const settingButtons = [
            { text: '📱 Toggle Auto Read', id: 'toggle_autoread' },
            { text: '📊 Toggle Auto Status', id: 'toggle_autostatus' },
            { text: '💬 Toggle Auto Reply', id: 'toggle_autoreply' },
            { text: '🔒 Toggle Anti Spam', id: 'toggle_antispam' },
            { text: '🌐 Toggle Mode', id: 'toggle_mode' }
        ];

        await buttons.sendReplyButtons(from, settingsText, settingButtons);
    }
};
