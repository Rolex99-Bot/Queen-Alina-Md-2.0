// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - BASE64
// ═══════════════════════════════════════════

export default {
    command: 'base64',
    aliases: ['encode', 'decode'],
    description: 'Base64 encode/decode',
    category: 'utils',
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide text!\n\nUsage: *.base64 <text>*');
        }

        try {
            // Try to decode first, if fails then encode
            let result;
            let action;

            try {
                result = Buffer.from(fullArgs, 'base64').toString('utf8');
                action = 'Decoded';
            } catch {
                result = Buffer.from(fullArgs).toString('base64');
                action = 'Encoded';
            }

            await reply(`🔐 *BASE64 ${action}* 🔐\n\n📝 Original: ${fullArgs}\n✅ Result: ${result}\n\n_Queen Alina MD 2.0_`);
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
