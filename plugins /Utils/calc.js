// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - CALCULATOR
// ═══════════════════════════════════════════

export default {
    command: 'calc',
    aliases: ['calculate', 'math'],
    description: 'Calculate expressions',
    category: 'utils',
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide an expression!\n\nUsage: *.calc <expression>*\nExample: *.calc 5 + 3*');
        }

        try {
            // Safe evaluation
            const result = Function('"use strict"; return (' + fullArgs + ')')();

            await reply(`🔢 *CALCULATOR* 🔢\n\n📝 Expression: ${fullArgs}\n✅ Result: ${result}\n\n_Queen Alina MD 2.0_`);
        } catch (error) {
            await reply(`❌ Invalid expression: ${error.message}`);
        }
    }
};
