// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - GITHUB
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'github',
    aliases: ['git', 'gh'],
    description: 'Search GitHub repositories',
    category: 'search',
    execute: async (ctx) => {
        const { fullArgs, reply } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a repository name!\n\nUsage: *.github <repo>*');
        }

        try {
            await reply('💻 *Searching GitHub...*');

            const response = await axios.get(`https://api.github.com/search/repositories?q=${encodeURIComponent(fullArgs)}&per_page=5`, { 
                timeout: 10000 
            });

            if (response.data && response.data.items) {
                let githubText = `💻 *GitHub Search: ${fullArgs}* 💻\n\n`;

                for (const repo of response.data.items) {
                    githubText += `📦 ${repo.name}\n`;
                    githubText += `👤 ${repo.owner.login}\n`;
                    githubText += `⭐ ${repo.stargazers_count} stars\n`;
                    githubText += `📝 ${repo.description || 'No description'}\n`;
                    githubText += `🔗 ${repo.html_url}\n\n`;
                }

                await reply(githubText + '_Queen Alina MD 2.0_');
            } else {
                await reply('❌ No repositories found!');
            }
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
