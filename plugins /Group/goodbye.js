// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - GOODBYE
// ═══════════════════════════════════════════

export default {
    command: 'goodbye',
    aliases: ['leavemsg'],
    description: 'Toggle goodbye messages',
    category: 'group',
    groupOnly: true,
    adminOnly: true,
    execute: async (ctx) => {
        const { fullArgs, reply, from, database } = ctx;

        const status = fullArgs.toLowerCase();

        try {
            const groupData = await database.getGroup(from) || { groupId: from };

            if (status === 'on') {
                groupData.goodbye = true;
                await database.saveGroup(from, groupData);
                await reply('✅ *Goodbye* messages enabled!');
            } else if (status === 'off') {
                groupData.goodbye = false;
                await database.saveGroup(from, groupData);
                await reply('✅ *Goodbye* messages disabled!');
            } else {
                const current = groupData.goodbye ? 'ON ✅' : 'OFF ❌';
                await reply(`👋 Goodbye: ${current}\n\nUsage: *.goodbye on/off*`);
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
