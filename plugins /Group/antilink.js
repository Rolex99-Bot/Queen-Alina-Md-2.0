// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - ANTI LINK
// ═══════════════════════════════════════════

export default {
    command: 'antilink',
    aliases: ['nolink', 'linkblock'],
    description: 'Toggle anti link',
    category: 'group',
    groupOnly: true,
    adminOnly: true,
    execute: async (ctx) => {
        const { fullArgs, reply, from, database } = ctx;

        const status = fullArgs.toLowerCase();

        try {
            const groupData = await database.getGroup(from) || { groupId: from };

            if (status === 'on') {
                groupData.antiLink = true;
                await database.saveGroup(from, groupData);
                await reply('✅ *Anti Link* enabled! Links will be deleted.');
            } else if (status === 'off') {
                groupData.antiLink = false;
                await database.saveGroup(from, groupData);
                await reply('✅ *Anti Link* disabled!');
            } else {
                const current = groupData.antiLink ? 'ON ✅' : 'OFF ❌';
                await reply(`📎 Anti Link: ${current}\n\nUsage: *.antilink on/off*`);
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
