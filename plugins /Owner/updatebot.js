// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - UPDATE BOT
// ═══════════════════════════════════════════

export default {
    command: 'updatebot',
    aliases: ['update', 'upgrade'],
    description: 'Update bot from repository',
    category: 'owner',
    ownerOnly: true,
    execute: async (ctx) => {
        const { reply } = ctx;

        await reply('🔄 *Checking for updates...*');

        try {
            const { exec } = await import('child_process');
            const { promisify } = await import('util');
            const execAsync = promisify(exec);

            const { stdout } = await execAsync('git pull', { timeout: 60000 });

            if (stdout.includes('Already up to date')) {
                await reply('✅ Bot is already up to date!');
            } else {
                await reply(`✅ *Updated!*\n\`\`\`${stdout}\`\`\`\n\nRestarting...`);
                setTimeout(() => process.exit(0), 3000);
            }
        } catch (error) {
            await reply(`❌ Update failed: ${error.message}`);
        }
    }
};
