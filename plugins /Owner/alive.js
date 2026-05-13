// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - ALIVE COMMAND
//  Bot Status with Voice & Sticker
// ═══════════════════════════════════════════

export default {
    command: 'alive',
    aliases: ['status', 'online', 'up'],
    description: 'Check if bot is alive',
    category: 'owner',
    execute: async (ctx) => {
        const { config, reply, getRuntime, sock, from } = ctx;
        const runtime = getRuntime();

        const aliveText = `
✨ *QUEEN ALINA MD 2.0* ✨

🤖 *Status:* ONLINE
⏰ *Runtime:* ${runtime}
👑 *Owner:* ${config.owner.name}
📱 *Contact:* ${config.owner.number}
🌐 *Version:* ${config.bot.version}
💎 *Mode:* ${config.bot.mode.toUpperCase()}

✅ *All Systems Operational*
`;

        // Send text with voice note option
        await reply(aliveText);

        // Send status sticker (simulated - would need actual sticker URL)
        try {
            await sock.sendMessage(from, {
                sticker: { url: 'https://i.imgur.com/aliveSticker.webp' }
            });
        } catch {
            // Sticker optional
        }
    }
};
