// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - EVAL (OWNER ONLY)
// ═══════════════════════════════════════════

export default {
    command: 'eval',
    aliases: ['execute', 'run'],
    description: 'Execute JavaScript code',
    category: 'owner',
    ownerOnly: true,
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide code to execute!');
        }

        try {
            const result = eval(fullArgs);
            const output = typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result);

            await reply(`✅ *Result:*\n\`\`\`${output.slice(0, 4000)}\`\`\``);
        } catch (error) {
            await reply(`❌ *Error:*\n\`\`\`${error.message}\`\`\``);
        }
    }
};
