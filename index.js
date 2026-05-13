// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - MAIN ENTRY POINT
//  Owner: Abdul Azeez | 0775153939
//  24/7 Premium WhatsApp User Bot
// ═══════════════════════════════════════════

import { 
    default as makeWASocket, 
    DisconnectReason, 
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore,
    makeInMemoryStore,
    Browsers,
    PHONENUMBER_MCC
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import pino from 'pino';
import chalk from 'chalk';
import figlet from 'figlet';
import fs from 'fs-extra';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';
import NodeCache from 'node-cache';

import { config, strings } from './config.js';
import { TerminalUI } from './src/terminal.js';
import { PluginLoader } from './src/pluginLoader.js';
import { ButtonHandler } from './src/buttonHandler.js';
import { Security } from './src/security.js';
import { Database } from './src/database.js';
import { MessageHandler } from './src/messageHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ═══════ GLOBAL STATE ═══════
const msgRetryCounterCache = new NodeCache();
const store = makeInMemoryStore({ logger: pino({ level: 'silent' }) });
let sock = null;
let qrRetry = 0;
let startTime = Date.now();
let pairingCodeRequested = false;

// ═══════ TERMINAL UI INSTANCE ═══════
const terminal = new TerminalUI(config.terminal);

// ═══════ STARTUP BANNER ═══════
async function showBanner() {
    console.clear();
    const banner = figlet.textSync('QUEEN ALINA', {
        font: 'ANSI Shadow',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    });

    console.log(chalk.hex('#00D4FF')(banner));
    console.log(chalk.hex('#9D4EDD')('  ╔══════════════════════════════════════════╗'));
    console.log(chalk.hex('#9D4EDD')('  ║') + chalk.hex('#00FF88')('     MD 2.0 - PREMIUM WHATSAPP BOT      ') + chalk.hex('#9D4EDD')('║'));
    console.log(chalk.hex('#9D4EDD')('  ║') + chalk.hex('#FFD700')('     Owner: Abdul Azeez | 0775153939    ') + chalk.hex('#9D4EDD')('║'));
    console.log(chalk.hex('#9D4EDD')('  ║') + chalk.hex('#74B9FF')('     24/7 Running | Sinhala & English   ') + chalk.hex('#9D4EDD')('║'));
    console.log(chalk.hex('#9D4EDD')('  ╚══════════════════════════════════════════╝'));
    console.log();
}

// ═══════ READLINE QUESTION HELPER ═══════
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (text) => new Promise((resolve) => rl.question(text, resolve));

// ═══════ GET PHONE NUMBER ═══════
async function getPhoneNumber() {
    let phoneNumber = await question(chalk.hex('#00D4FF')('📱 Enter your WhatsApp number (with country code, e.g., 94775153939): '));
    phoneNumber = phoneNumber.replace(/[^0-9]/g, '');

    if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
        terminal.error('Invalid country code! Please include country code (e.g., 94775153939)');
        return getPhoneNumber();
    }

    return phoneNumber;
}

// ═══════ CONNECTION HANDLER ═══════
async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState(config.session.path);
    const { version, isLatest } = await fetchLatestBaileysVersion();

    terminal.info(`Using Baileys version: ${version.join('.')} (Latest: ${isLatest})`);

    // Use macOS Desktop browser for pairing code compatibility
    const browserConfig = Browsers.macOS('Chrome');

    sock = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' }))
        },
        msgRetryCounterCache,
        generateHighQualityLinkPreview: true,
        syncFullHistory: true,
        markOnlineOnConnect: true,
        keepAliveIntervalMs: 30000,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 60000,
        browser: browserConfig,
        shouldSyncHistoryMessage: () => false
    });

    store.bind(sock.ev);

    // Initialize handlers
    const pluginLoader = new PluginLoader(sock, config);
    const buttonHandler = new ButtonHandler(sock, config);
    const security = new Security(config.security);
    const database = new Database(config.database);
    const messageHandler = new MessageHandler(sock, config, pluginLoader, security, database, buttonHandler);

    await pluginLoader.loadAll();
    await database.connect();

    // ═══════ EVENT LISTENERS ═══════
    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        // Request pairing code when connecting/QR and not registered
        if ((connection === 'connecting' || !!qr) && !sock.authState.creds.registered && !pairingCodeRequested) {
            pairingCodeRequested = true;
            try {
                const phoneNumber = await getPhoneNumber();
                terminal.info(`Requesting pairing code for ${phoneNumber}...`);

                const code = await sock.requestPairingCode(phoneNumber);
                const formattedCode = code?.match(/.{1,4}/g)?.join('-') || code;

                // Display in neon box
                terminal.showPairCode(formattedCode, phoneNumber);

                terminal.info('Enter this code in your WhatsApp app:');
                terminal.info('Settings → Linked Devices → Link a Device → Link with phone number');
            } catch (error) {
                terminal.error(`Pairing code request failed: ${error.message}`);
                terminal.info('Please restart and try again.');
            }
        }

        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error instanceof Boom) && 
                lastDisconnect.error.output?.statusCode !== DisconnectReason.loggedOut;

            if (shouldReconnect && qrRetry < config.session.maxReconnectAttempts) {
                qrRetry++;
                terminal.reconnecting(qrRetry);
                setTimeout(connectToWhatsApp, config.session.reconnectDelay);
            } else {
                terminal.disconnected();
                if (lastDisconnect?.error instanceof Boom && 
                    lastDisconnect.error.output?.statusCode === DisconnectReason.loggedOut) {
                    terminal.error('Logged out! Please restart and login again.');
                    process.exit(0);
                }
            }
        } else if (connection === 'open') {
            qrRetry = 0;
            pairingCodeRequested = false;
            terminal.connected(sock.user?.id?.split(':')[0] || 'Unknown');

            // Send owner notification
            try {
                await sock.sendMessage(config.owner.number + '@s.whatsapp.net', {
                    text: `👑 *Queen Alina MD 2.0* is now online!\n\n` +
                          `⏰ Time: ${new Date().toLocaleString('en-US', { timeZone: config.bot.timezone })}\n` +
                          `📱 Number: ${sock.user?.id?.split(':')[0]}\n` +
                          `🌐 Platform: ${config.deployment.platform}\n` +
                          `⚡ Status: *ACTIVE*`
                });
            } catch (e) {
                terminal.warning('Failed to send owner notification');
            }
        }
    });

    // ═══════ MESSAGE HANDLER ═══════
    sock.ev.on('messages.upsert', async (m) => {
        if (m.type !== 'notify') return;

        for (const msg of m.messages) {
            if (!msg.message || msg.key.fromMe) continue;

            try {
                await messageHandler.handle(msg);
            } catch (error) {
                terminal.error(`Message handler error: ${error.message}`);
            }
        }
    });

    // ═══════ GROUP PARTICIPANTS UPDATE ═══════
    sock.ev.on('group-participants.update', async (update) => {
        try {
            const { id, participants, action } = update;

            if (action === 'add') {
                for (const participant of participants) {
                    await sock.sendMessage(id, {
                        text: `👋 *Welcome @${participant.split('@')[0]}!*\n\n` +
                              `Welcome to the group! I'm Queen Alina MD 2.0, your friendly assistant.\n` +
                              `Type *.menu* to see available commands.`,
                        mentions: [participant]
                    });
                }
            }

            if (action === 'remove') {
                for (const participant of participants) {
                    await sock.sendMessage(id, {
                        text: `👋 *Goodbye @${participant.split('@')[0]}!*\n\n` +
                              `We'll miss you! Take care!`,
                        mentions: [participant]
                    });
                }
            }
        } catch (error) {
            terminal.error(`Group update error: ${error.message}`);
        }
    });

    // ═══════ CALL HANDLER ═══════
    sock.ev.on('call', async (call) => {
        if (config.auto.rejectCall && call[0].status === 'offer') {
            await sock.rejectCall(call[0].id, call[0].from);
            await sock.sendMessage(call[0].from, {
                text: config.auto.callRejectMessage
            });
            terminal.info(`Rejected call from ${call[0].from}`);
        }
    });

    return sock;
}

// ═══════ MAIN FUNCTION ═══════
async function main() {
    await showBanner();

    // Check if session exists
    const sessionExists = await fs.pathExists(path.join(config.session.path, 'creds.json'));

    if (!sessionExists) {
        terminal.info('No session found! Starting Pair Code login...');
        terminal.info('You will be asked for your phone number when the connection starts.');
    } else {
        terminal.info('Session found! Restoring connection...');
    }

    await connectToWhatsApp();

    // Keep alive for deployment platforms
    if (config.deployment.keepAlive) {
        const express = await import('express');
        const app = express.default();

        app.get('/', (req, res) => {
            res.json({
                status: 'online',
                bot: config.bot.name,
                version: config.bot.version,
                owner: config.owner.name,
                uptime: process.uptime(),
                memory: process.memoryUsage(),
                platform: config.deployment.platform
            });
        });

        app.get('/ping', (req, res) => res.send('PONG'));

        app.listen(config.deployment.port, () => {
            terminal.info(`Keep-alive server running on port ${config.deployment.port}`);
        });
    }
}

// ═══════ ERROR HANDLING ═══════
process.on('uncaughtException', (err) => {
    terminal.error(`Uncaught Exception: ${err.message}`);
    console.error(err);
});

process.on('unhandledRejection', (reason, promise) => {
    terminal.error(`Unhandled Rejection at: ${promise}`);
    console.error(reason);
});

// ═══════ START ═══════
main().catch(err => {
    terminal.error(`Fatal error: ${err.message}`);
    process.exit(1);
});

export { sock, startTime };
