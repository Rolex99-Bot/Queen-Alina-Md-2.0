// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - AUTO READ
// ═══════════════════════════════════════════

export default {
    command: 'autoread',
    aliases: ['read', 'readstatus'],
    description: 'Toggle auto read messages',
    category: 'owner',
    ownerOnly: true,
    execute: async (ctx) => {
        const { fullArgs, reply, config } = ctx;

        const status = fullArgs.toLowerCase();

        if (status === 'on') {
            config.auto.read = true;
            await reply('✅ Auto read enabled!');
        } else if (status === 'off') {
            config.auto.read = false;
            await reply('✅ Auto read disabled!');
        } else {
            await reply(`📖 Auto Read Status: ${config.auto.read ? 'ON ✅' : 'OFF ❌'}\n\nUsage: *.autoread on/off*`);
        }
    }
};
