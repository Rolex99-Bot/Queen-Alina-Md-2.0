// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - LOVE TEST
// ═══════════════════════════════════════════

export default {
    command: 'lovetest',
    aliases: ['love', 'lovecalc'],
    description: 'Calculate love percentage',
    category: 'fun',
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide two names!\n\nUsage: *.lovetest <name1> <name2>*');
        }

        const names = fullArgs.split(' ');
        if (names.length < 2) {
            return await reply('❌ Please provide two names!');
        }

        const percentage = Math.floor(Math.random() * 100) + 1;
        let emoji = '💔';

        if (percentage > 80) emoji = '❤️';
        else if (percentage > 60) emoji = '💕';
        else if (percentage > 40) emoji = '💛';
        else if (percentage > 20) emoji = '💚';

        await reply(`${emoji} *LOVE TEST* ${emoji}\n\n💑 ${names[0]} + ${names[1]}\n❤️ ${percentage}% Match\n\n_Just for fun! 💖_`);
    }
};
