// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - IQ TEST
// ═══════════════════════════════════════════

export default {
    command: 'iqtest',
    aliases: ['iq', 'smart'],
    description: 'Test your IQ',
    category: 'fun',
    execute: async (ctx) => {
        const { reply, mentions } = ctx;

        const iq = Math.floor(Math.random() * 150) + 50;
        let level = '';

        if (iq > 140) level = '🧠 Genius!';
        else if (iq > 120) level = '🎓 Very Intelligent!';
        else if (iq > 100) level = '📚 Above Average!';
        else if (iq > 80) level = '😐 Average';
        else level = '😅 Below Average';

        let target = 'You';
        if (mentions.length > 0) {
            target = `@${mentions[0].split('@')[0]}`;
        }

        await reply(`🧠 *IQ TEST RESULT* 🧠\n\n👤 ${target}\n📊 IQ Score: ${iq}\n🏆 Level: ${level}\n\n_Just for fun! 😄_`);
    }
};
