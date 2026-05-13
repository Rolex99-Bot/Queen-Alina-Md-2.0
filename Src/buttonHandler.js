// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - PREMIUM BUTTON SYSTEM
//  Queen Amdi Style Interactive Buttons
// ═══════════════════════════════════════════

export class ButtonHandler {
    constructor(sock, config) {
        this.sock = sock;
        this.config = config;
        this.symbols = ['✨', '💫', '⭐', '🌟', '⚡', '🔥', '💎', '👑', '🎭', '🎪'];
    }

    getRandomSymbol() {
        return this.symbols[Math.floor(Math.random() * this.symbols.length)];
    }

    // ═══════ CREATE REPLY BUTTONS ═══════
    async sendReplyButtons(jid, text, buttons, options = {}) {
        const header = options.header || this.config.buttons?.styles?.primary?.header || '💠 QUEEN ALINA MD 2.0 💠';
        const footer = options.footer || this.config.buttons?.styles?.primary?.footer || '© Abdul Azeez | 0775153939';

        const buttonMessage = {
            text: `${header}\n\n${text}\n\n${footer}`,
            footer: footer,
            buttons: buttons.map((btn, i) => ({
                buttonId: btn.id || `btn_${i}`,
                buttonText: { displayText: `${this.getRandomSymbol()} ${btn.text}` },
                type: 1
            })),
            headerType: 1
        };

        return await this.sock.sendMessage(jid, buttonMessage);
    }

    // ═══════ CREATE LIST BUTTONS ═══════
    async sendListButtons(jid, title, description, sections, options = {}) {
        const header = options.header || '💠 QUEEN ALINA MD 2.0 💠';
        const footer = options.footer || '© Abdul Azeez | 0775153939';

        const listMessage = {
            text: `${header}\n\n*${title}*\n_${description}_\n\n${footer}`,
            footer: footer,
            title: title,
            buttonText: options.buttonText || 'Tap Here 👆',
            sections: sections.map((section, i) => ({
                title: `${this.getRandomSymbol()} ${section.title}`,
                rows: section.rows.map((row, j) => ({
                    title: row.title,
                    rowId: row.id || `row_${i}_${j}`,
                    description: row.description || ''
                }))
            }))
        };

        return await this.sock.sendMessage(jid, listMessage);
    }

    // ═══════ CREATE URL BUTTONS ═══════
    async sendUrlButtons(jid, text, buttons, options = {}) {
        const header = options.header || '💠 QUEEN ALINA MD 2.0 💠';
        const footer = options.footer || '© Abdul Azeez | 0775153939';

        // URL buttons using template message
        const templateMessage = {
            viewOnceMessage: {
                message: {
                    templateMessage: {
                        hydratedTemplate: {
                            hydratedContentText: `${header}\n\n${text}\n\n${footer}`,
                            hydratedFooterText: footer,
                            hydratedButtons: buttons.map(btn => {
                                if (btn.type === 'url') {
                                    return {
                                        urlButton: {
                                            displayText: `${this.getRandomSymbol()} ${btn.text}`,
                                            url: btn.url
                                        }
                                    };
                                } else if (btn.type === 'call') {
                                    return {
                                        callButton: {
                                            displayText: `${this.getRandomSymbol()} ${btn.text}`,
                                            phoneNumber: btn.phone
                                        }
                                    };
                                } else {
                                    return {
                                        quickReplyButton: {
                                            displayText: `${this.getRandomSymbol()} ${btn.text}`,
                                            id: btn.id || `qr_${Date.now()}`
                                        }
                                    };
                                }
                            })
                        }
                    }
                }
            }
        };

        return await this.sock.sendMessage(jid, templateMessage);
    }

    // ═══════ CREATE QUICK REPLY BUTTONS ═══════
    async sendQuickReply(jid, text, buttons, options = {}) {
        return await this.sendReplyButtons(jid, text, buttons, options);
    }

    // ═══════ CREATE PAGINATION BUTTONS ═══════
    async sendPagination(jid, text, currentPage, totalPages, options = {}) {
        const buttons = [];

        if (currentPage > 1) {
            buttons.push({ text: '⬅️ Previous', id: `page_${currentPage - 1}` });
        }

        buttons.push({ text: `📄 ${currentPage}/${totalPages}`, id: 'current_page' });

        if (currentPage < totalPages) {
            buttons.push({ text: 'Next ➡️', id: `page_${currentPage + 1}` });
        }

        return await this.sendReplyButtons(jid, text, buttons, options);
    }

    // ═══════ CREATE CATEGORY BUTTONS ═══════
    async sendCategoryButtons(jid, categories, options = {}) {
        const sections = categories.map(cat => ({
            title: cat.name,
            rows: cat.commands.map(cmd => ({
                title: `${this.config.bot.prefix}${cmd.name}`,
                description: cmd.description,
                id: `cmd_${cmd.name}`
            }))
        }));

        return await this.sendListButtons(
            jid, 
            '📂 Command Categories', 
            'Select a category to explore commands', 
            sections, 
            options
        );
    }

    // ═══════ CREATE COPY CODE BUTTONS ═══════
    async sendCopyCode(jid, text, code, options = {}) {
        const message = {
            text: `${text}\n\n\`\`\`${code}\`\`\``,
            contextInfo: {
                externalAdReply: {
                    title: options.title || '💠 QUEEN ALINA MD 2.0',
                    body: 'Click to copy code',
                    mediaType: 1
                }
            }
        };

        return await this.sock.sendMessage(jid, message);
    }

    // ═══════ CREATE FOOTER BUTTONS ═══════
    async sendWithFooter(jid, text, footerButtons, options = {}) {
        const header = options.header || '💠 QUEEN ALINA MD 2.0 💠';
        const footer = options.footer || '© Abdul Azeez | 0775153939';

        const buttons = footerButtons.map((btn, i) => ({
            buttonId: btn.id || `footer_${i}`,
            buttonText: { displayText: btn.text },
            type: 1
        }));

        const buttonMessage = {
            text: `${header}\n\n${text}\n\n${footer}`,
            footer: footer,
            buttons: buttons,
            headerType: 1
        };

        return await this.sock.sendMessage(jid, buttonMessage);
    }

    // ═══════ DYNAMIC MENU BUTTONS ═══════
    async sendDynamicMenu(jid, menuData, options = {}) {
        const { title, description, items } = menuData;

        const sections = items.map((item, i) => ({
            title: `${this.getRandomSymbol()} ${item.category}`,
            rows: item.commands.map((cmd, j) => ({
                title: `${this.config.bot.prefix}${cmd.name}`,
                description: `${cmd.description} ${cmd.premium ? '👑' : ''}`,
                id: `menu_${cmd.name}`
            }))
        }));

        return await this.sendListButtons(jid, title, description, sections, {
            ...options,
            buttonText: '📋 Open Menu'
        });
    }

    // ═══════ INTERACTIVE POLL ═══════
    async sendPoll(jid, question, options, optionsConfig = {}) {
        const pollMessage = {
            poll: {
                name: question,
                values: options,
                selectableCount: optionsConfig.selectableCount || 1
            }
        };

        return await this.sock.sendMessage(jid, pollMessage);
    }
}

export default ButtonHandler;
