// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - SIMP RATE
// ═══════════════════════════════════════════

export default {
    command: 'simp',
    aliases: ['simprate'],
    description: 'Calculate simp percentage',
    category: 'fun',
    execute: async (ctx) => {
        const { reply, mentions, sender } = ctx;

        let target = sender.split('@')[0];
        if (mentions.length > 0) {
            target = mentions[0].split('@')[0];
        }

        const percentage = Math.floor(Math.random() * 100) + 1;
        let level = '';

        if (percentage > 80) level = '🥺 Certified Simp!';
        else if (percentage > 60) level = '😳 High Simp Level!';
        else if (percentage > 40) level = '🤔 Moderate Simp';
        else if (percentage > 20) level = '😎 Low Simp';
        else level = '💪 Simp Free!';

        await reply(`🥺 *SIMP RATE* 🥺\n\n👤 @${target}\n📊 Simp Level: ${percentage}%\n🏆 ${level}\n\n_Just for fun! 😄_`);
    }
};
