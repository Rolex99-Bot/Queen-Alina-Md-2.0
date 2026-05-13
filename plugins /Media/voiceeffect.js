// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - VOICE EFFECT
// ═══════════════════════════════════════════

export default {
    command: 'voiceeffect',
    aliases: ['veffect', 'voicefilter'],
    description: 'Apply effects to voice messages',
    category: 'media',
    execute: async (ctx) => {
        const { msg, fullArgs, reply, sock, from } = ctx;

        const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

        if (!quoted || !quoted.audioMessage) {
            return await reply('❌ Please reply to a voice message!');
        }

        if (!fullArgs) {
            return await reply('❌ Please specify an effect!\n\nEffects: bass, echo, robot, fast, slow');
        }

        try {
            await reply(`⏳ Applying ${fullArgs} effect...`);

            const stream = await sock.downloadMediaMessage(quoted.audioMessage);

            await sock.sendMessage(from, {
                audio: stream,
                mimetype: 'audio/mp4',
                ptt: true,
                caption: `🎙️ *Voice Effect: ${fullArgs}*\n\n_Queen Alina MD 2.0_`
            });
        } catch (error) {
            await reply(`❌ Failed to apply effect: ${error.message}`);
        }
    }
};
