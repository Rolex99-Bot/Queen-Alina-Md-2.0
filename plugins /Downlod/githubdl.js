// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - GITHUB DOWNLOADER
// ═══════════════════════════════════════════

import axios from 'axios';

export default {
    command: 'githubdl',
    aliases: ['gitdl', 'repo'],
    description: 'Download GitHub repository',
    category: 'download',
    execute: async (ctx) => {
        const { fullArgs, reply, sock, from } = ctx;

        if (!fullArgs) {
            return await reply('❌ Please provide a GitHub repository URL!\n\nUsage: *.githubdl <url>*');
        }

        try {
            await reply('⏳ Downloading GitHub repository...');

            // Convert to zip download URL
            const repoUrl = fullArgs.replace(/\.git$/, '').replace(/\/$/, '');
            const zipUrl = `${repoUrl}/archive/refs/heads/main.zip`;

            await sock.sendMessage(from, {
                document: { url: zipUrl },
                mimetype: 'application/zip',
                fileName: 'repository.zip',
                caption: `📥 *GitHub Repository*\n\n🔗 *URL:* ${repoUrl}\n\n_Downloaded by Queen Alina MD 2.0_`
            });
        } catch (error) {
            await reply(`❌ Error: ${error.message}`);
        }
    }
};
