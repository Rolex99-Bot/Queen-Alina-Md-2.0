// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - ANTI SPAM (GROUP)
// ═══════════════════════════════════════════

export default {
    command: 'antispam',
    aliases: ['nospam'],
    description: 'Toggle anti spam',
    category: 'group',
    groupOnly: true,
    adminOnly: true,
    execute: async (ctx) => {
        const { fullArgs, reply, from, database } = ctx;

        const status = fullArgs.toLowerCase();

        try {
            const groupData = await database.getGroup(from) || { groupId: from };

            if (status === 'on') {
                groupData.antiSpam = true;
                await database.saveGroup(from, groupData);
                await reply('✅ *Anti Spam* enabled!');
            } else if (status === 'off') {
                groupData.antiSpam = false;
                await database.saveGroup(from, groupData);
                await reply('✅ *Anti Spam* disabled!');
            } else {
                const current = groupData.antiSpam ? 'ON ✅' : 'OFF ❌';
                await reply(`🛡️ Anti Spam: ${current}\n\nUsage: *.antispam on/off*`);
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
