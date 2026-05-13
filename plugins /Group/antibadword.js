// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - ANTI BAD WORD
// ═══════════════════════════════════════════

export default {
    command: 'antibadword',
    aliases: ['notoxic', 'cleanchat'],
    description: 'Toggle anti bad words',
    category: 'group',
    groupOnly: true,
    adminOnly: true,
    execute: async (ctx) => {
        const { fullArgs, reply, from, database } = ctx;

        const status = fullArgs.toLowerCase();

        try {
            const groupData = await database.getGroup(from) || { groupId: from };

            if (status === 'on') {
                groupData.antiBadWord = true;
                await database.saveGroup(from, groupData);
                await reply('✅ *Anti Bad Word* enabled! Toxic messages will be deleted.');
            } else if (status === 'off') {
                groupData.antiBadWord = false;
                await database.saveGroup(from, groupData);
                await reply('✅ *Anti Bad Word* disabled!');
            } else {
                const current = groupData.antiBadWord ? 'ON ✅' : 'OFF ❌';
                await reply(`🚫 Anti Bad Word: ${current}\n\nUsage: *.antibadword on/off*`);
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
