// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - MESSAGE HANDLER
//  Command Processing & Response System
//  With Sinhala & English Language Support
// ═══════════════════════════════════════════

import { config } from '../config.js';
import { getString, detectLanguage, getUserLanguage, setUserLanguage } from './languages.js';

export class MessageHandler {
    constructor(sock, config, pluginLoader, security, database, buttonHandler) {
        this.sock = sock;
        this.config = config;
        this.plugins = pluginLoader;
        this.security = security;
        this.database = database;
        this.buttons = buttonHandler;
        this.startTime = Date.now();
    }

    // ═══════ EXTRACT MESSAGE DATA ═══════
    extractMessage(msg) {
        const message = msg.message;
        const from = msg.key.remoteJid;
        const sender = msg.key.participant || from;
        const isGroup = from.endsWith('@g.us');
        const isOwner = this.security.isOwner(sender);

        let text = '';
        let type = 'text';

        if (message.conversation) {
            text = message.conversation;
        } else if (message.extendedTextMessage?.text) {
            text = message.extendedTextMessage.text;
        } else if (message.imageMessage?.caption) {
            text = message.imageMessage.caption;
            type = 'image';
        } else if (message.videoMessage?.caption) {
            text = message.videoMessage.caption;
            type = 'video';
        } else if (message.documentMessage?.caption) {
            text = message.documentMessage.caption;
            type = 'document';
        } else if (message.buttonsResponseMessage?.selectedButtonId) {
            text = message.buttonsResponseMessage.selectedButtonId;
            type = 'button';
        } else if (message.listResponseMessage?.title) {
            text = message.listResponseMessage.title;
            type = 'list';
        }

        return {
            msg,
            from,
            sender,
            isGroup,
            isOwner,
            text,
            type,
            quoted: message.extendedTextMessage?.contextInfo?.quotedMessage || null,
            mentions: message.extendedTextMessage?.contextInfo?.mentionedJid || []
        };
    }

    // ═══════ PARSE COMMAND ═══════
    parseCommand(text) {
        const prefix = this.config.bot.prefix;

        if (!text.startsWith(prefix)) return null;

        const args = text.slice(prefix.length).trim().split(/\s+/);
        const command = args.shift().toLowerCase();
        const fullArgs = args.join(' ');

        return { command, args, fullArgs };
    }

    // ═══════ CHECK ADMIN STATUS ═══════
    async isAdmin(jid, userId) {
        if (!jid.endsWith('@g.us')) return false;

        try {
            const groupMetadata = await this.sock.groupMetadata(jid);
            const participant = groupMetadata.participants.find(p => p.id === userId);
            return participant && (participant.admin === 'admin' || participant.admin === 'superadmin');
        } catch {
            return false;
        }
    }

    // ═══════ CHECK BOT ADMIN ═══════
    async isBotAdmin(jid) {
        if (!jid.endsWith('@g.us')) return false;

        try {
            const groupMetadata = await this.sock.groupMetadata(jid);
            const botId = this.sock.user.id;
            const participant = groupMetadata.participants.find(p => p.id === botId);
            return participant && (participant.admin === 'admin' || participant.admin === 'superadmin');
        } catch {
            return false;
        }
    }

    // ═══════ HANDLE MESSAGE ═══════
    async handle(msg) {
        const data = this.extractMessage(msg);

        // Skip if no text
        if (!data.text) return;

        // Detect language from message
        const detectedLang = detectLanguage(data.text);

        // Get user's preferred language from database
        let userLang = await getUserLanguage(data.sender, this.database);
        if (!userLang) {
            userLang = detectedLang || this.config.bot.defaultLanguage;
            await setUserLanguage(data.sender, userLang, this.database);
        }

        // Security checks
        const validation = this.security.validateMessage(msg);
        if (!validation.valid) {
            if (validation.checks.spam?.allowed === false) {
                await this.sock.sendMessage(data.from, {
                    text: `⚠️ ${getString('spamDetected', userLang)}`
                });
            }
            return;
        }

        // Parse command
        const parsed = this.parseCommand(data.text);
        if (!parsed) {
            // Handle auto-replies for non-commands
            if (this.config.auto.reply) {
                await this.handleAutoReply(data, userLang);
            }
            return;
        }

        const { command, args, fullArgs } = parsed;

        // Language switch command
        if (command === 'lang' || command === 'language' || command === 'භාෂාව') {
            const newLang = args[0]?.toLowerCase();
            if (newLang === 'si' || newLang === 'sinhala' || newLang === 'සිංහල') {
                await setUserLanguage(data.sender, 'si', this.database);
                await this.sock.sendMessage(data.from, {
                    text: `✅ *භාෂාව සිංහලට වෙනස් විය!*\n\nදැන් මම සිංහලෙන් ප්‍රතිචාර දක්වන්නෙමි.\n\n_Queen Alina MD 2.0_`
                });
            } else if (newLang === 'en' || newLang === 'english') {
                await setUserLanguage(data.sender, 'en', this.database);
                await this.sock.sendMessage(data.from, {
                    text: `✅ *Language changed to English!*\n\nI will now respond in English.\n\n_Queen Alina MD 2.0_`
                });
            } else {
                await this.sock.sendMessage(data.from, {
                    text: `🌐 *Language / භාෂාව*\n\nCurrent / දැන්: ${userLang === 'si' ? 'සිංහල' : 'English'}\n\nUsage:\n*.lang si* - සිංහල\n*.lang en* - English\n\n_Queen Alina MD 2.0_`
                });
            }
            return;
        }

        // Find command
        const plugin = this.plugins.getCommand(command);
        if (!plugin) {
            // Check if it's a menu navigation button
            if (command.startsWith('menu_') || command.startsWith('page_')) {
                await this.handleMenuNavigation(data, command);
                return;
            }

            await this.sock.sendMessage(data.from, {
                text: `❓ ${getString('notFound', userLang)}: *${command}*\n\n${getString('autoReplyHelp', userLang)}`
            });
            return;
        }

        // Check permissions
        const isAdmin = await this.isAdmin(data.from, data.sender);
        const permission = this.security.checkPermission(
            data.sender, 
            plugin, 
            data.isGroup, 
            isAdmin
        );

        if (!permission.allowed) {
            await this.sock.sendMessage(data.from, {
                text: `⛔ ${permission.reason}`
            });
            return;
        }

        // Check rate limit
        const rateLimit = this.security.checkRateLimit(data.sender, command);
        if (!rateLimit.allowed) {
            await this.sock.sendMessage(data.from, {
                text: `⏳ ${rateLimit.reason}`
            });
            return;
        }

        // Execute command
        try {
            // Log command
            await this.database.logCommand(data.sender, command, data.isGroup ? data.from : null);

            // Create context with language support
            const context = {
                sock: this.sock,
                msg: data.msg,
                from: data.from,
                sender: data.sender,
                isGroup: data.isGroup,
                isOwner: data.isOwner,
                isAdmin,
                isBotAdmin: await this.isBotAdmin(data.from),
                args,
                fullArgs,
                quoted: data.quoted,
                mentions: data.mentions,
                config: this.config,
                database: this.database,
                buttons: this.buttons,
                security: this.security,
                plugins: this.plugins,
                lang: userLang, // Pass language to plugins
                getString: (key) => getString(key, userLang), // Language helper
                reply: async (text) => {
                    return await this.sock.sendMessage(data.from, { text }, { quoted: data.msg });
                },
                send: async (content) => {
                    return await this.sock.sendMessage(data.from, content);
                },
                react: async (emoji) => {
                    return await this.sock.sendMessage(data.from, {
                        react: { text: emoji, key: data.msg.key }
                    });
                },
                getRuntime: () => {
                    const diff = Date.now() - this.startTime;
                    const hours = Math.floor(diff / 3600000);
                    const minutes = Math.floor((diff % 3600000) / 60000);
                    const seconds = Math.floor((diff % 60000) / 1000);
                    return `${hours}h ${minutes}m ${seconds}s`;
                },
                getPing: async () => {
                    const start = Date.now();
                    await this.sock.sendMessage(data.from, { text: 'Pong!' });
                    return Date.now() - start;
                }
            };

            // Execute
            await plugin.execute(context);

        } catch (error) {
            console.error(`Command error (${command}):`, error);
            await this.sock.sendMessage(data.from, {
                text: `❌ ${getString('error', userLang)} *${command}*:\n\n${error.message}`
            });
        }
    }

    // ═══════ HANDLE AUTO REPLY ═══════
    async handleAutoReply(data, lang = 'en') {
        const text = data.text.toLowerCase();

        const autoReplies = {
            'hello': getString('autoReplyHello', lang),
            'hi': getString('autoReplyHello', lang),
            'hey': getString('autoReplyHello', lang),
            'good morning': getString('autoReplyMorning', lang),
            'good night': getString('autoReplyNight', lang),
            'how are you': getString('autoReplyHowAreYou', lang),
            'thank you': getString('thanks', lang),
            'thanks': getString('thanks', lang),
            'owner': getString('autoReplyOwner', lang),
            'bot': getString('welcome', lang),
            'help': getString('autoReplyHelp', lang),
            // Sinhala triggers
            'හෙලෝ': getString('autoReplyHello', 'si'),
            'හායි': getString('autoReplyHello', 'si'),
            'සුභ උදෑසනක්': getString('autoReplyMorning', 'si'),
            'සුභ රාත්‍රියක්': getString('autoReplyNight', 'si'),
            'කොහොමද': getString('autoReplyHowAreYou', 'si'),
            'ස්තුතියි': getString('thanks', 'si'),
            'අයිතිකරු': getString('autoReplyOwner', 'si'),
            'බොට්': getString('welcome', 'si'),
            'උදව්': getString('autoReplyHelp', 'si'),
        };

        for (const [trigger, response] of Object.entries(autoReplies)) {
            if (text.includes(trigger)) {
                await this.sock.sendMessage(data.from, { text: response });
                return;
            }
        }
    }

    // ═══════ HANDLE MENU NAVIGATION ═══════
    async handleMenuNavigation(data, command) {
        if (command.startsWith('menu_')) {
            const cmdName = command.replace('menu_', '');
            const plugin = this.plugins.getCommand(cmdName);

            if (plugin && plugin.menu) {
                await this.sock.sendMessage(data.from, {
                    text: plugin.menu
                });
            }
        } else if (command.startsWith('page_')) {
            const page = parseInt(command.replace('page_', ''));
            await this.sock.sendMessage(data.from, {
                text: `📄 Page ${page} - Use *.menu* to see full menu`
            });
        }
    }
}

export default MessageHandler;
