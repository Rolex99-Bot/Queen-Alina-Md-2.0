// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - COUPLE PP
// ═══════════════════════════════════════════

export default {
    command: 'couplepp',
    aliases: ['matchingpp', 'pairpp'],
    description: 'Get matching couple profile pictures',
    category: 'fun',
    execute: async (ctx) => {
        const { reply, sock, from } = ctx;

        await reply('💑 *Generating couple profile pictures...*');

        // Send placeholder couple images
        await sock.sendMessage(from, {
            image: { url: 'https://i.waifu.im/search/?included_tags=couple' },
            caption: `💑 *Couple Profile Picture 1*\n\n_Matching set by Queen Alina MD 2.0_`
        });

        await sock.sendMessage(from, {
            image: { url: 'https://i.waifu.im/search/?included_tags=couple' },
            caption: `💑 *Couple Profile Picture 2*\n\n_Matching set by Queen Alina MD 2.0_`
        });
    }
};
