// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - PREMIUM TERMINAL UI
//  Neon Blue/Purple Theme with Animations
// ═══════════════════════════════════════════

import chalk from 'chalk';
import ora from 'ora';
import os from 'os';

export class TerminalUI {
    constructor(config = {}) {
        this.config = config;
        this.colors = config.colors || {
            primary: '#00D4FF',
            secondary: '#9D4EDD',
            success: '#00FF88',
            warning: '#FFD700',
            error: '#FF4757',
            info: '#74B9FF'
        };
        this.startTime = Date.now();
    }

    // ═══════ NEON BOX ═══════
    neonBox(title, content, width = 50) {
        const line = '═'.repeat(width);
        const pad = ' '.repeat(Math.max(0, width - title.length - 2));

        console.log();
        console.log(chalk.hex(this.colors.primary)(`╔${line}╗`));
        console.log(chalk.hex(this.colors.primary)(`║ `) + chalk.bold.hex(this.colors.secondary)(title) + chalk.hex(this.colors.primary)(`${pad} ║`));
        console.log(chalk.hex(this.colors.primary)(`╠${line}╣`));

        const lines = content.split('\n');
        for (const line of lines) {
            const linePad = ' '.repeat(Math.max(0, width - line.length - 2));
            console.log(chalk.hex(this.colors.primary)(`║ `) + chalk.hex(this.colors.info)(line) + chalk.hex(this.colors.primary)(`${linePad} ║`));
        }

        console.log(chalk.hex(this.colors.primary)(`╚${line}╝`));
        console.log();
    }

    // ═══════ PAIR CODE DISPLAY ═══════
    showPairCode(code, phone) {
        const content = `Phone: ${phone}\n\n` +
                       `Your Pair Code:\n` +
                       `┌─────────────────────┐\n` +
                       `│   ${code}   │\n` +
                       `└─────────────────────┘\n\n` +
                       `1. Open WhatsApp on your phone\n` +
                       `2. Go to Settings > Linked Devices\n` +
                       `3. Tap "Link a Device"\n` +
                       `4. Enter the code above\n\n` +
                       `⏳ Code expires in 2 minutes`;

        this.neonBox('🔐 WHATSAPP PAIR CODE', content, 55);
    }

    // ═══════ STATUS MESSAGES ═══════
    connected(number) {
        const runtime = this.getRuntime();
        const ram = this.getRAMUsage();

        this.neonBox('✅ CONNECTED', 
            `Number: ${number}\n` +
            `Runtime: ${runtime}\n` +
            `RAM Usage: ${ram}\n` +
            `Status: ONLINE\n` +
            `Mode: ${this.config.mode || 'public'}`, 45);
    }

    disconnected() {
        this.neonBox('❌ DISCONNECTED', 
            'Connection lost!\n' +
            'Attempting to reconnect...\n' +
            `Time: ${new Date().toLocaleString()}`, 40);
    }

    reconnecting(attempt) {
        const spinner = ora({
            text: chalk.hex(this.colors.warning)(`Reconnecting... (Attempt ${attempt})`),
            spinner: 'dots',
            color: 'yellow'
        }).start();

        setTimeout(() => {
            spinner.stop();
        }, 2000);
    }

    // ═══════ LOG MESSAGES ═══════
    info(message) {
        const timestamp = new Date().toLocaleTimeString();
        console.log(
            chalk.hex(this.colors.primary)('[ℹ️]') + 
            chalk.hex(this.colors.info)(` [${timestamp}] `) + 
            chalk.white(message)
        );
    }

    success(message) {
        const timestamp = new Date().toLocaleTimeString();
        console.log(
            chalk.hex(this.colors.success)('[✅]') + 
            chalk.hex(this.colors.info)(` [${timestamp}] `) + 
            chalk.white(message)
        );
    }

    warning(message) {
        const timestamp = new Date().toLocaleTimeString();
        console.log(
            chalk.hex(this.colors.warning)('[⚠️]') + 
            chalk.hex(this.colors.info)(` [${timestamp}] `) + 
            chalk.white(message)
        );
    }

    error(message) {
        const timestamp = new Date().toLocaleTimeString();
        console.log(
            chalk.hex(this.colors.error)('[❌]') + 
            chalk.hex(this.colors.info)(` [${timestamp}] `) + 
            chalk.white(message)
        );
    }

    // ═══════ SYSTEM INFO ═══════
    getRuntime() {
        const diff = Date.now() - this.startTime;
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        return `${hours}h ${minutes}m ${seconds}s`;
    }

    getRAMUsage() {
        const used = process.memoryUsage();
        const total = os.totalmem();
        const free = os.freemem();
        const usedMB = Math.round(used.heapUsed / 1024 / 1024);
        const totalMB = Math.round(total / 1024 / 1024);
        return `${usedMB}MB / ${totalMB}MB`;
    }

    // ═══════ LOADING ANIMATION ═══════
    loading(text) {
        return ora({
            text: chalk.hex(this.colors.primary)(text),
            spinner: 'dots',
            color: 'cyan'
        });
    }

    // ═══════ PROGRESS BAR ═══════
    progressBar(current, total, width = 30) {
        const percentage = Math.round((current / total) * 100);
        const filled = Math.round((width * current) / total);
        const empty = width - filled;

        const bar = chalk.hex(this.colors.primary)('█'.repeat(filled)) + 
                   chalk.gray('░'.repeat(empty));

        return `[${bar}] ${percentage}%`;
    }

    // ═══════ COMMAND LOG ═══════
    logCommand(user, command, group = false) {
        const timestamp = new Date().toLocaleTimeString();
        const type = group ? '👥 GROUP' : '👤 PRIVATE';

        console.log(
            chalk.hex(this.colors.secondary)('[⚡]') +
            chalk.hex(this.colors.info)(` [${timestamp}] `) +
            chalk.hex(this.colors.warning)(`${type} `) +
            chalk.white(`${user}: `) +
            chalk.hex(this.colors.primary)(command)
        );
    }
}

export default TerminalUI;
