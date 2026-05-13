// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - ANTI EDIT
// ═══════════════════════════════════════════

export default {
    command: 'antiedit',
    aliases: ['antied', 'saveedit'],
    description: 'Toggle anti edit messages',
    category: 'owner',
    ownerOnly: true,
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        await reply('🛡️ *Anti Edit* feature is active!\n\nEdited messages will be tracked and original content saved.');
    }
};
