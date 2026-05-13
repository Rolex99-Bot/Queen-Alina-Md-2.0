// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - PING
// ═══════════════════════════════════════════

export default {
    command: 'ping',
    aliases: ['speed', 'latency'],
    description: 'Check bot response speed',
    category: 'utils',
    execute: async (ctx) => {
        const { reply, getRuntime } = ctx;
        const start = Date.now();

        await reply('🏓 *Pong!*');

        const end = Date.now();
        const ping = end - start;
        const runtime = getRuntime();

        await reply(`🏓 *PING RESULTS* 🏓\n\n⚡ Response Time: ${ping}ms\n⏰ Runtime: ${runtime}\n📊 Status: Online\n\n_Queen Alina MD 2.0_`);
    }
};
