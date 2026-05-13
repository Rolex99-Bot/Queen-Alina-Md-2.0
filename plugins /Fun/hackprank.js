// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - HACK PRANK
// ═══════════════════════════════════════════

export default {
    command: 'hackprank',
    aliases: ['hack', 'prank'],
    description: 'Fake hacking prank',
    category: 'fun',
    execute: async (ctx) => {
        const { reply, mentions } = ctx;

        let target = 'You';
        if (mentions.length > 0) {
            target = `@${mentions[0].split('@')[0]}`;
        }

        await reply(`💻 *HACKING ${target}...* 💻\n\n🔍 Scanning device...\n📡 Connecting to server...\n🔓 Bypassing security...\n📁 Accessing files...\n\n😂 Just kidding! This is a prank!\n\n_Queen Alina MD 2.0_`);
    }
};
