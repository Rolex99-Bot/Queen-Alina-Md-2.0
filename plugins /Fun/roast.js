// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - ROAST
// ═══════════════════════════════════════════

const roasts = [
    "You're like a cloud. When you disappear, it's a beautiful day!",
    "I'd agree with you but then we'd both be wrong.",
    "You're not stupid; you just have bad luck thinking.",
    "I'm jealous of people who don't know you.",
    "You're proof that evolution can go in reverse.",
    "I'd explain it to you, but I left my crayons at home.",
    "You're not dumb. You just have bad luck when it comes to thinking.",
    "I'm not saying I hate you, but I would unplug your life support to charge my phone.",
    "You're like a software update. Whenever I see you, I think 'Not now.'",
    "I'd roast you, but my mom said I'm not allowed to burn trash."
];

export default {
    command: 'roast',
    aliases: ['burn', 'insult'],
    description: 'Roast someone',
    category: 'fun',
    execute: async (ctx) => {
        const { args, reply, mentions } = ctx;

        let target = '';
        if (mentions.length > 0) {
            target = `@${mentions[0].split('@')[0]} `;
        } else if (args[0]) {
            target = args[0] + ' ';
        }

        const roast = roasts[Math.floor(Math.random() * roasts.length)];

        await reply(`🔥 *ROAST* 🔥\n\n${target}${roast}\n\n😂😂😂`);
    }
};
