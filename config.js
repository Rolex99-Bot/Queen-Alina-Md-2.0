// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - CONFIGURATION
//  Owner: Abdul Azeez | 0775153939
//  Premium WhatsApp User Bot
// ═══════════════════════════════════════════

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config = {
    // ═══════ OWNER INFO ═══════
    owner: {
        name: process.env.OWNER_NAME || 'Abdul Azeez',
        number: process.env.OWNER_NUMBER || '94775153939',
        caption: process.env.CAPTION || 'Queen Alina 2.0',
        thanks: 'Queen Alina Team'
    },

    // ═══════ BOT INFO ═══════
    bot: {
        name: process.env.BOT_NAME || 'Queen Alina MD 2.0',
        version: '2.0.0',
        prefix: process.env.PREFIX || '.',
        mode: process.env.MODE || 'public', // public | private
        languages: (process.env.LANGUAGE || 'si,en').split(','),
        defaultLanguage: 'en',
        timezone: 'Asia/Colombo'
    },

    // ═══════ SESSION ═══════
    session: {
        name: process.env.SESSION_NAME || 'QueenAlinaSession',
        path: path.join(__dirname, 'sessions'),
        encryptionKey: process.env.SESSION_ENCRYPTION_KEY || 'QueenAlinaSecureKey2024',
        autoReconnect: process.env.AUTO_RECONNECT === 'true',
        sessionRestore: process.env.SESSION_RESTORE === 'true',
        maxReconnectAttempts: 10,
        reconnectDelay: 5000
    },

    // ═══════ DATABASE ═══════
    database: {
        type: process.env.DATABASE_TYPE || 'json',
        mongodb: {
            uri: process.env.MONGODB_URI || '',
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                maxPoolSize: 10
            }
        },
        json: {
            path: process.env.JSON_DB_PATH || path.join(__dirname, 'database', 'json')
        }
    },

    // ═══════ API KEYS ═══════
    apiKeys: {
        openai: process.env.OPENAI_API_KEY || '',
        gemini: process.env.GOOGLE_GEMINI_API_KEY || '',
        removeBg: process.env.REMOVE_BG_API_KEY || '',
        weather: process.env.WEATHER_API_KEY || '',
        news: process.env.NEWS_API_KEY || '',
        imdb: process.env.IMDB_API_KEY || '',
        spotify: {
            clientId: process.env.SPOTIFY_CLIENT_ID || '',
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET || ''
        }
    },

    // ═══════ SECURITY ═══════
    security: {
        antiSpam: process.env.ANTI_SPAM === 'true',
        antiCall: process.env.ANTI_CALL === 'true',
        antiBug: process.env.ANTI_BUG === 'true',
        antiCrash: process.env.ANTI_CRASH === 'true',
        antiToxic: process.env.ANTI_TOXIC === 'true',
        antiForeign: process.env.ANTI_FOREIGN === 'true',
        antiFake: process.env.ANTI_FAKE === 'true',
        ownerProtection: process.env.OWNER_PROTECTION === 'true',
        spamThreshold: 5,
        spamWindow: 60000, // 1 minute
        blockedCountries: [],
        allowedPrefixes: ['94']
    },

    // ═══════ AUTO FEATURES ═══════
    auto: {
        read: process.env.AUTO_READ === 'true',
        status: process.env.AUTO_STATUS === 'true',
        reply: process.env.AUTO_REPLY === 'true',
        saveContacts: process.env.AUTO_SAVE_CONTACTS === 'true',
        rejectCall: process.env.AUTO_REJECT_CALL === 'true',
        callRejectMessage: '⚠️ Queen Alina does not accept calls. Please send a message instead. 📩'
    },

    // ═══════ TERMINAL UI ═══════
    terminal: {
        theme: process.env.TERMINAL_THEME || 'neon',
        showRam: process.env.SHOW_RAM_USAGE === 'true',
        showRuntime: process.env.SHOW_RUNTIME === 'true',
        showSpeed: process.env.SHOW_SPEED === 'true',
        colors: {
            primary: '#00D4FF',
            secondary: '#9D4EDD',
            success: '#00FF88',
            warning: '#FFD700',
            error: '#FF4757',
            info: '#74B9FF'
        }
    },

    // ═══════ BUTTON STYLES ═══════
    buttons: {
        styles: {
            primary: {
                header: '💠 QUEEN ALINA MD 2.0 💠',
                footer: '© Abdul Azeez | 0775153939',
                color: '#00D4FF'
            },
            menu: {
                animatedSymbols: ['✨', '💫', '⭐', '🌟', '⚡', '🔥', '💎', '👑'],
                fonts: {
                    bold: '*',
                    italic: '_',
                    strikethrough: '~',
                    monospace: '```'
                }
            }
        }
    },

    // ═══════ DEPLOYMENT ═══════
    deployment: {
        platform: process.env.PLATFORM || 'railway',
        port: parseInt(process.env.PORT) || 3000,
        keepAlive: true
    }
};

export default config;
