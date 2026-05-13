// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - WEATHER
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'weather',
    aliases: ['forecast', 'climate'],
    description: 'Get weather information',
    category: 'search',
    execute: async (ctx) => {
        const { fullArgs, reply, config } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a city name!\n\nUsage: *.weather <city>*');
        }

        try {
            await reply('🌤️ *Getting weather...*');

            const apiKey = config.apiKeys.weather || 'YOUR_API_KEY';
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(fullArgs)}&appid=${apiKey}&units=metric`;

            const response = await axios.get(apiUrl, { timeout: 10000 });

            if (response.data) {
                const weather = response.data;
                const weatherText = `
🌤️ *WEATHER: ${weather.name}* 🌤️

🌡️ Temperature: ${weather.main.temp}°C
🌡️ Feels Like: ${weather.main.feels_like}°C
💧 Humidity: ${weather.main.humidity}%
🌬️ Wind: ${weather.wind.speed} m/s
☁️ Condition: ${weather.weather[0].description}

_Queen Alina MD 2.0_
`;

                await reply(weatherText);
            } else {
                await reply('❌ City not found!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
