// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - AUTO STATUS
// ═══════════════════════════════════════════

export default {
    command: 'autostatus',
    aliases: ['statusauto', 'autoview'],
    description: 'Toggle auto status view',
    category: 'owner',
    ownerOnly: true,
    execute: async (ctx) => {
        const { fullArgs, reply, config } = ctx;

        const status = fullArgs.toLowerCase();

        if (status === 'on') {
            config.auto.status = true;
            await reply('✅ Auto status view enabled!');
        } else if (status === 'off') {
            config.auto.status = false;
            await reply('✅ Auto status view disabled!');
        } else {
            await reply(`📱 Auto Status: ${config.auto.status ? 'ON ✅' : 'OFF ❌'}\n\nUsage: *.autostatus on/off*`);
        }
    }
};
