// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - SHIP
// ═══════════════════════════════════════════

export default {
    command: 'ship',
    aliases: ['lovematch', 'couple'],
    description: 'Calculate love compatibility',
    category: 'fun',
    execute: async (ctx) => {
        const { args, reply, mentions, sender } = ctx;

        let person1 = sender.split('@')[0];
        let person2 = '';

        if (mentions.length >= 2) {
            person1 = mentions[0].split('@')[0];
            person2 = mentions[1].split('@')[0];
        } else if (mentions.length === 1) {
            person2 = mentions[0].split('@')[0];
        } else if (args[0]) {
            person2 = args[0].replace(/[^0-9]/g, '');
        }

        if (!person2) {
            return await reply('❌ Please mention two people or provide a number!\n\nUsage: *.ship @user1 @user2*');
        }

        const percentage = Math.floor(Math.random() * 100) + 1;
        let emoji = '💔';
        let text = 'Not meant to be...';

        if (percentage > 80) { emoji = '❤️'; text = 'Perfect match!'; }
        else if (percentage > 60) { emoji = '💕'; text = 'Great compatibility!'; }
        else if (percentage > 40) { emoji = '💛'; text = 'Could work with effort!'; }
        else if (percentage > 20) { emoji = '💚'; text = 'Maybe as friends...'; }

        await reply(`${emoji} *SHIP CALCULATOR* ${emoji}\n\n👤 ${person1}\n❤️ ${percentage}%\n👤 ${person2}\n\n${text}\n\n_Queen Alina MD 2.0_`);
    }
};
