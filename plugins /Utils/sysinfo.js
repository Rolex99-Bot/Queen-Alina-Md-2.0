// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - SYSTEM INFO
// ═══════════════════════════════════════════

import os from 'os';

export default {
    command: 'sysinfo',
    aliases: ['system', 'stats'],
    description: 'Get system information',
    category: 'utils',
    execute: async (ctx) => {
        const { reply } = ctx;

        const totalMem = Math.round(os.totalmem() / 1024 / 1024);
        const freeMem = Math.round(os.freemem() / 1024 / 1024);
        const usedMem = totalMem - freeMem;

        await reply(`💻 *SYSTEM INFORMATION* 💻\n\n🖥️ Platform: ${os.platform()}\n⚙️ Architecture: ${os.arch()}\n🧠 CPU Cores: ${os.cpus().length}\n💾 Total RAM: ${totalMem}MB\n💾 Used RAM: ${usedMem}MB\n💾 Free RAM: ${freeMem}MB\n⏰ Uptime: ${Math.round(os.uptime() / 3600)}h\n\n_Queen Alina MD 2.0_`);
    }
};
