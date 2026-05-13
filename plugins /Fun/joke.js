// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - JOKE
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'joke',
    aliases: ['funny', 'laugh'],
    description: 'Get a random joke',
    category: 'fun',
    execute: async (ctx) => {
        const { reply } = ctx;

        try {
            const response = await axios.get('https://official-joke-api.appspot.com/random_joke', { timeout: 10000 });

            if (response.data) {
                await reply(`😂 *JOKE* 😂\n\n${response.data.setup}\n\n${response.data.punchline}\n\n🤣`);
            } else {
                await reply('❌ Failed to fetch joke!');
            }
        } catch (error) {
            const jokes = [
                "Why don't scientists trust atoms? Because they make up everything!",
                "Why did the scarecrow win an award? He was outstanding in his field!",
                "Why don't eggs tell jokes? They'd crack each other up!"
            ];
            await reply(`😂 *JOKE* 😂\n\n${jokes[Math.floor(Math.random() * jokes.length)]}\n\n🤣`);
        }
    }
};
