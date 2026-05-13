// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - DARE
// ═══════════════════════════════════════════

const dares = [
    "Send a funny selfie to the group!",
    "Sing a song for 30 seconds!",
    "Do 10 push-ups right now!",
    "Tell a joke that makes everyone laugh!",
    "Change your profile picture to something funny for 1 hour!",
    "Send 'I love you' to your last contact!",
    "Dance for 15 seconds and send a video!",
    "Speak in an accent for the next 5 messages!",
    "Share your most recent search history!",
    "Call someone and sing Happy Birthday!"
];

export default {
    command: 'dare',
    aliases: ['d'],
    description: 'Get a dare challenge',
    category: 'fun',
    execute: async (ctx) => {
        const { reply } = ctx;
        const dare = dares[Math.floor(Math.random() * dares.length)];

        await reply(`😈 *DARE* 😈\n\n${dare}\n\nYou must do it! 💪`);
    }
};
