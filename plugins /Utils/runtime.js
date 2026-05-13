// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - RUNTIME
// ═══════════════════════════════════════════

export default {
    command: 'runtime',
    aliases: ['uptime', 'status'],
    description: 'Check bot uptime',
    category: 'utils',
    execute: async (ctx) => {
        const { reply, getRuntime, config } = ctx;
        const runtime = getRuntime();

        await reply(`⏰ *BOT RUNTIME* ⏰\n\n🤖 Bot: ${config.bot.name}\n🔢 Version: ${config.bot.version}\n⏰ Uptime: ${runtime}\n👑 Owner: ${config.owner.name}\n🌐 Mode: ${config.bot.mode.toUpperCase()}\n\n_Queen Alina MD 2.0_`);
    }
};
