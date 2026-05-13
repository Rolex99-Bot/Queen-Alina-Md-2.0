// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - RESTORE
// ═══════════════════════════════════════════

export default {
    command: 'restore',
    aliases: ['load'],
    description: 'Restore database from backup',
    category: 'owner',
    ownerOnly: true,
    execute: async (ctx) => {
        const { fullArgs, database, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide backup file path!\n\nUsage: *.restore <path>*');
        }

        try {
            await database.restore(fullArgs);
            await reply('✅ *Database restored successfully!*');
        } catch (error) {
            await reply(`❌ Restore failed: ${error.message}`);
        }
    }
};
