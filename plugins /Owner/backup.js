// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - BACKUP
// ═══════════════════════════════════════════

export default {
    command: 'backup',
    aliases: ['save'],
    description: 'Backup database',
    category: 'owner',
    ownerOnly: true,
    execute: async (ctx) => {
        const { database, reply } = ctx;

        try {
            const backupPath = await database.backup();
            await reply(`✅ *Database backed up!*\n\n📁 Path: ${backupPath}`);
        } catch (error) {
            await reply(`❌ Backup failed: ${error.message}`);
        }
    }
};
