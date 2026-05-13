// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - WELCOME
// ═══════════════════════════════════════════

export default {
    command: 'welcome',
    aliases: ['greet'],
    description: 'Toggle welcome messages',
    category: 'group',
    groupOnly: true,
    adminOnly: true,
    execute: async (ctx) => {
        const { fullArgs, reply, from, database } = ctx;

        const status = fullArgs.toLowerCase();

        try {
            const groupData = await database.getGroup(from) || { groupId: from };

            if (status === 'on') {
                groupData.welcome = true;
                await database.saveGroup(from, groupData);
                await reply('✅ *Welcome* messages enabled!');
            } else if (status === 'off') {
                groupData.welcome = false;
                await database.saveGroup(from, groupData);
                await reply('✅ *Welcome* messages disabled!');
            } else {
                const current = groupData.welcome ? 'ON ✅' : 'OFF ❌';
                await reply(`👋 Welcome: ${current}\n\nUsage: *.welcome on/off*`);
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
