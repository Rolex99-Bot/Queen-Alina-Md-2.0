// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - NPM
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'npm',
    aliases: ['node', 'package'],
    description: 'Search NPM packages',
    category: 'search',
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a package name!\n\nUsage: *.npm <package>*');
        }

        try {
            await reply('📦 *Searching NPM...*');

            const response = await axios.get(`https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(fullArgs)}&size=5`, { 
                timeout: 10000 
            });

            if (response.data && response.data.objects) {
                let npmText = `📦 *NPM Search: ${fullArgs}* 📦\n\n`;

                for (const pkg of response.data.objects) {
                    npmText += `📦 ${pkg.package.name}\n`;
                    npmText += `📊 Version: ${pkg.package.version}\n`;
                    npmText += `📝 ${pkg.package.description || 'No description'}\n`;
                    npmText += `🔗 ${pkg.package.links.npm}\n\n`;
                }

                await reply(npmText + '_Queen Alina MD 2.0_');
            } else {
                await reply('❌ No packages found!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
