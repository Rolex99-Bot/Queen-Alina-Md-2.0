// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - PAIR COMMAND
//  WhatsApp Pair Code Option
// ═══════════════════════════════════════════

import { PHONENUMBER_MCC } from '@whiskeysockets/baileys';

export default {
    command: 'pair',
    aliases: ['link', 'connect', 'login'],
    description: 'Generate new WhatsApp pair code',
    category: 'owner',
    ownerOnly: true,
    execute: async (ctx) => {
        const { fullArgs, reply, sock, from, config } = ctx;

        let phoneNumber = fullArgs;

        // If no number provided, ask for it
        if (!phoneNumber) {
            await reply(`🔐 *WHATSAPP PAIR CODE* 🔐\n\n📱 Please provide your phone number with country code.\n\nUsage: *.pair 94775153939*\n\n_Queen Alina MD 2.0_`);
            return;
        }

        // Clean number
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '');

        // Validate country code
        if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            return await reply(`❌ *Invalid Number!*\n\nPlease include country code.\nExample: 94775153939\n\n_Queen Alina MD 2.0_`);
        }

        try {
            await reply(`⏳ *Generating pair code for ${phoneNumber}...*`);

            // Request pairing code from Baileys
            const code = await sock.requestPairingCode(phoneNumber);
            const formattedCode = code?.match(/.{1,4}/g)?.join('-') || code;

            const pairText = `
🔐 *WHATSAPP PAIR CODE* 🔐

📱 Number: ${phoneNumber}
🔑 Code: *${formattedCode}*

📋 *Instructions:*
1️⃣ Open WhatsApp on your phone
2️⃣ Go to Settings → Linked Devices
3️⃣ Tap "Link a Device"
4️⃣ Select "Link with phone number"
5️⃣ Enter the code above

⏳ Code expires in 2 minutes

_Queen Alina MD 2.0_
`;

            await reply(pairText);

            // Also send as separate message for easy copying
            await reply(`🔑 *Copy Code:* \`\`\`${formattedCode}\`\`\``);

        } catch (error) {
            await reply(`❌ *Failed to generate pair code!*\n\nError: ${error.message}\n\nPlease try again or restart the bot.`);
        }
    }
};
