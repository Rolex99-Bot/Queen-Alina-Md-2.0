// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - FAKE CHAT
// ═══════════════════════════════════════════

export default {
    command: 'fakechat',
    aliases: ['fake', 'prankchat'],
    description: 'Generate fake chat screenshot',
    category: 'fun',
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide text for fake chat!\n\nUsage: *.fakechat <text>*');
        }

        await reply(`💬 *Fake Chat Generated*\n\n${fullArgs}\n\n😂 This is just for fun!`);
    }
};
