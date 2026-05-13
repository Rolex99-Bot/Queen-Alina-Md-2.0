// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - QR CODE
// ═══════════════════════════════════════════

export default {
    command: 'qr',
    aliases: ['qrcode', 'barcode'],
    description: 'Generate QR code',
    category: 'utils',
    execute: async (ctx) => {
        const { fullArgs, reply, sock, from } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide text for QR code!\n\nUsage: *.qr <text>*');
        }

        try {
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(fullArgs)}`;

            await sock.sendMessage(from, {
                image: { url: qrUrl },
                caption: `📱 *QR Code* 📱\n\n📝 Content: ${fullArgs}\n\n_Queen Alina MD 2.0_`
            });
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
