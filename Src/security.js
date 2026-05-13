// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - SECURITY SYSTEM
//  Anti Bug, Anti Crash, Anti Spam, Anti Call
// ═══════════════════════════════════════════

import NodeCache from 'node-cache';

export class Security {
    constructor(config = {}) {
        this.config = config;
        this.spamCache = new NodeCache({ stdTTL: 60 });
        this.bugCache = new NodeCache({ stdTTL: 300 });
        this.blockedUsers = new Set();
        this.ownerNumber = config.ownerNumber || '94775153939';
    }

    // ═══════ ANTI SPAM ═══════
    checkSpam(userId) {
        if (!this.config.antiSpam) return { allowed: true };

        const key = `spam_${userId}`;
        const current = this.spamCache.get(key) || 0;

        if (current >= (this.config.spamThreshold || 5)) {
            return { 
                allowed: false, 
                reason: 'Spam detected! You are sending messages too quickly.',
                remaining: 0
            };
        }

        this.spamCache.set(key, current + 1);

        return { 
            allowed: true, 
            remaining: (this.config.spamThreshold || 5) - current - 1
        };
    }

    // ═══════ ANTI BUG ═══════
    checkBug(message) {
        if (!this.config.antiBug) return { safe: true };

        const bugPatterns = [
            /[\u200B-\u200D\uFEFF]/g,
            /[\u202A-\u202E]/g,
            /[\u2060-\u206F]/g,
            /[\uFFF0-\uFFFF]/g,
            /(.)\1{50,}/g,
            /[\u0E00-\u0E7F]{100,}/g,
            /[\u0600-\u06FF]{100,}/g,
            /[\u0900-\u097F]{100,}/g,
        ];

        let bugScore = 0;
        for (const pattern of bugPatterns) {
            const matches = message.match(pattern);
            if (matches) {
                bugScore += matches.length;
            }
        }

        if (bugScore > 10) {
            return { 
                safe: false, 
                reason: 'Bug/Exploit detected in message!',
                score: bugScore
            };
        }

        return { safe: true, score: bugScore };
    }

    // ═══════ ANTI TOXIC ═══════
    checkToxic(text) {
        if (!this.config.antiToxic) return { safe: true };

        const toxicWords = [
            'fuck', 'shit', 'bitch', 'asshole', 'bastard', 'damn',
            'nigga', 'nigger', 'fag', 'retard', 'cunt', 'dick',
            'slut', 'whore', 'hoe', 'trash', 'garbage', 'stupid'
        ];

        const lowerText = text.toLowerCase();
        let toxicScore = 0;
        const foundWords = [];

        for (const word of toxicWords) {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            const matches = lowerText.match(regex);
            if (matches) {
                toxicScore += matches.length;
                foundWords.push(word);
            }
        }

        if (toxicScore > 0) {
            return {
                safe: false,
                reason: 'Toxic language detected!',
                words: foundWords,
                score: toxicScore
            };
        }

        return { safe: true };
    }

    // ═══════ ANTI FOREIGN ═══════
    checkForeign(number) {
        if (!this.config.antiForeign) return { allowed: true };

        const allowedPrefixes = this.config.allowedPrefixes || ['94'];
        const cleanNumber = number.replace(/[^0-9]/g, '');

        for (const prefix of allowedPrefixes) {
            if (cleanNumber.startsWith(prefix)) {
                return { allowed: true };
            }
        }

        return {
            allowed: false,
            reason: 'Foreign numbers are not allowed in this bot.',
            number: cleanNumber
        };
    }

    // ═══════ ANTI FAKE ═══════
    checkFake(accountInfo) {
        if (!this.config.antiFake) return { real: true };

        const suspiciousPatterns = [
            /^(0|1){10,}$/,
            /^(\d)\1{9,}$/,
            /^[0-9]{1,5}$/,
            /[a-zA-Z]{10,}/,
        ];

        for (const pattern of suspiciousPatterns) {
            if (pattern.test(accountInfo)) {
                return {
                    real: false,
                    reason: 'Fake/suspicious account detected!'
                };
            }
        }

        return { real: true };
    }

    // ═══════ OWNER PROTECTION ═══════
    isOwner(userId) {
        return userId.includes(this.ownerNumber);
    }

    // ═══════ PERMISSION CHECK ═══════
    checkPermission(userId, command, isGroup = false, isAdmin = false) {
        if (this.isOwner(userId)) {
            return { allowed: true, level: 'owner' };
        }

        if (command.adminOnly && !isAdmin) {
            return { 
                allowed: false, 
                reason: 'This command requires admin privileges!' 
            };
        }

        if (command.groupOnly && !isGroup) {
            return { 
                allowed: false, 
                reason: 'This command only works in groups!' 
            };
        }

        if (command.privateOnly && isGroup) {
            return { 
                allowed: false, 
                reason: 'This command only works in private chat!' 
            };
        }

        return { allowed: true, level: isAdmin ? 'admin' : 'user' };
    }

    // ═══════ BLOCK USER ═══════
    blockUser(userId) {
        this.blockedUsers.add(userId);
        return true;
    }

    // ═══════ UNBLOCK USER ═══════
    unblockUser(userId) {
        this.blockedUsers.delete(userId);
        return true;
    }

    // ═══════ IS BLOCKED ═══════
    isBlocked(userId) {
        return this.blockedUsers.has(userId);
    }

    // ═══════ RATE LIMITING ═══════
    checkRateLimit(userId, command, limit = 5, window = 60000) {
        const key = `ratelimit_${userId}_${command}`;
        const current = this.spamCache.get(key) || 0;

        if (current >= limit) {
            return {
                allowed: false,
                reason: `Rate limit exceeded! Max ${limit} uses per ${window/1000}s.`,
                retryAfter: window
            };
        }

        this.spamCache.set(key, current + 1, window / 1000);
        return { allowed: true, remaining: limit - current - 1 };
    }

    // ═══════ MESSAGE VALIDATION ═══════
    validateMessage(message) {
        const text = message.message?.conversation || message.message?.extendedTextMessage?.text || '';
        const checks = {
            spam: this.checkSpam(message.key.remoteJid),
            bug: this.checkBug(text),
            toxic: this.checkToxic(text),
            blocked: !this.isBlocked(message.key.remoteJid)
        };

        const failed = Object.entries(checks).filter(([key, value]) => {
            if (key === 'blocked') return !value;
            return !value.allowed && !value.safe;
        });

        if (failed.length > 0) {
            return {
                valid: false,
                reason: failed.map(([key, value]) => value.reason || `${key} check failed`).join(', '),
                checks
            };
        }

        return { valid: true, checks };
    }
}

export default Security;
