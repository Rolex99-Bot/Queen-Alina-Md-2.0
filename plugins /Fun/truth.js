// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - TRUTH
// ═══════════════════════════════════════════

const truths = [
    "What's the most embarrassing thing you've done?",
    "Have you ever lied to your best friend?",
    "What's your biggest fear?",
    "Who was your first crush?",
    "What's the worst gift you've received?",
    "Have you ever cheated in a test?",
    "What's your most annoying habit?",
    "What's the weirdest dream you've had?",
    "Have you ever stalked someone on social media?",
    "What's your guilty pleasure?"
];

export default {
    command: 'truth',
    aliases: ['t'],
    description: 'Get a truth question',
    category: 'fun',
    execute: async (ctx) => {
        const { reply } = ctx;
        const truth = truths[Math.floor(Math.random() * truths.length)];

        await reply(`🎯 *TRUTH* 🎯\n\n${truth}\n\nBe honest! 😏`);
    }
};
