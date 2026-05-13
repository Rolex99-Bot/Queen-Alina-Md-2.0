// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - GAY RATE
// ═══════════════════════════════════════════

export default {
    command: 'gayrate',
    aliases: ['gay', 'gaycalc'],
    description: 'Calculate gay percentage (fun)',
    category: 'fun',
    execute: async (ctx) => {
        const { reply, mentions, sender } = ctx;

        let target = sender.split('@')[0];
        if (mentions.length > 0) {
            target = mentions[0].split('@')[0];
        }

        const percentage = Math.floor(Math.random() * 100) + 1;
        let emoji = '🌈';

        await reply(`${emoji} *GAY RATE* ${emoji}\n\n👤 @${target}\n📊 Rate: ${percentage}%\n\n_Just for fun! Love is love! 🏳️‍🌈_`);
    }
};
