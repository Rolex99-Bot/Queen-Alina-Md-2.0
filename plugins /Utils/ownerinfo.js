// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - OWNER INFO
// ═══════════════════════════════════════════

export default {
    command: 'ownerinfo',
    aliases: ['owner', 'creator'],
    description: 'Get owner information',
    category: 'utils',
    execute: async (ctx) => {
        const { reply, config } = ctx;

        await reply(`👑 *OWNER INFORMATION* 👑\n\n👤 Name: ${config.owner.name}\n📱 Number: ${config.owner.number}\n📝 Caption: ${config.owner.caption}\n🙏 Thanks To: ${config.owner.thanks}\n\n📞 Contact: wa.me/${config.owner.number}\n\n_Queen Alina MD 2.0_`);
    }
};
