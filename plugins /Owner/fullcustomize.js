// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - FULL CUSTOMIZE
// ═══════════════════════════════════════════

export default {
    command: 'fullcustomize',
    aliases: ['customize', 'custom'],
    description: 'Fully customize bot appearance',
    category: 'owner',
    ownerOnly: true,
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply(`🎨 *Full Customize*\n\nUsage:\n*.fullcustomize name <name>*\n*.fullcustomize logo <url>*\n*.fullcustomize theme <color>*`);
        }

        const [type, ...value] = fullArgs.split(' ');
        const val = value.join(' ');

        switch(type.toLowerCase()) {
            case 'name':
                ctx.config.bot.name = val;
                await reply(`✅ Bot name changed to: *${val}*`);
                break;
            case 'logo':
                ctx.config.bot.logo = val;
                await reply(`✅ Bot logo updated!`);
                break;
            case 'theme':
                ctx.config.terminal.colors.primary = val;
                await reply(`✅ Theme color updated to: *${val}*`);
                break;
            default:
                await reply('❌ Invalid option! Use: name, logo, or theme');
        }
    }
};
