// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - EXEC (OWNER ONLY)
// ═══════════════════════════════════════════

export default {
    command: 'exec',
    aliases: ['shell', 'terminal'],
    description: 'Execute shell commands',
    category: 'owner',
    ownerOnly: true,
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a command to execute!');
        }

        try {
            const { exec } = await import('child_process');
            const { promisify } = await import('util');
            const execAsync = promisify(exec);

            const { stdout, stderr } = await execAsync(fullArgs, { timeout: 30000 });

            const output = stdout || stderr || 'No output';
            await reply(`✅ *Output:*\n\`\`\`${output.slice(0, 4000)}\`\`\``);
        } catch (error) {
            await reply(`❌ *Error:*\n\`\`\`${error.message}\`\`\``);
        }
    }
};
