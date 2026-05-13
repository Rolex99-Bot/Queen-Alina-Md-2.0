// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - PLUGIN LOADER
//  Dynamic Command Loading System
// ═══════════════════════════════════════════

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class PluginLoader {
    constructor(sock, config) {
        this.sock = sock;
        this.config = config;
        this.commands = new Map();
        this.aliases = new Map();
        this.categories = new Map();
        this.pluginsDir = path.join(__dirname, '..', 'plugins');
    }

    // ═══════ LOAD ALL PLUGINS ═══════
    async loadAll() {
        console.log(chalk.hex('#00D4FF')('\n📦 Loading plugins...'));

        const categories = [
            'owner', 'group', 'download', 'ai', 'fun', 
            'cricket', 'anime', 'media', 'search', 'security', 'utils'
        ];

        let totalCommands = 0;

        for (const category of categories) {
            const categoryPath = path.join(this.pluginsDir, category);

            if (!await fs.pathExists(categoryPath)) {
                await fs.ensureDir(categoryPath);
                continue;
            }

            const files = await fs.readdir(categoryPath);
            const jsFiles = files.filter(f => f.endsWith('.js'));

            for (const file of jsFiles) {
                try {
                    const filePath = path.join(categoryPath, file);
                    const fileUrl = 'file://' + filePath;

                    // Clear require cache for hot reload
                    const module = await import(fileUrl + '?t=' + Date.now());

                    if (module.default && typeof module.default === 'object') {
                        const plugin = module.default;

                        if (plugin.command && plugin.execute) {
                            // Register command
                            this.commands.set(plugin.command, {
                                ...plugin,
                                category,
                                file: filePath
                            });

                            // Register aliases
                            if (plugin.aliases) {
                                for (const alias of plugin.aliases) {
                                    this.aliases.set(alias, plugin.command);
                                }
                            }

                            // Add to category
                            if (!this.categories.has(category)) {
                                this.categories.set(category, []);
                            }
                            this.categories.get(category).push(plugin.command);

                            totalCommands++;
                        }
                    }
                } catch (error) {
                    console.log(chalk.hex('#FF4757')(`❌ Failed to load ${file}: ${error.message}`));
                }
            }
        }

        console.log(chalk.hex('#00FF88')(`✅ Loaded ${totalCommands} commands from ${this.categories.size} categories\n`));
        return totalCommands;
    }

    // ═══════ GET COMMAND ═══════
    getCommand(name) {
        // Check direct command
        if (this.commands.has(name)) {
            return this.commands.get(name);
        }

        // Check alias
        const mainCommand = this.aliases.get(name);
        if (mainCommand && this.commands.has(mainCommand)) {
            return this.commands.get(mainCommand);
        }

        return null;
    }

    // ═══════ GET ALL COMMANDS ═══════
    getAllCommands() {
        return Array.from(this.commands.values());
    }

    // ═══════ GET COMMANDS BY CATEGORY ═══════
    getCommandsByCategory(category) {
        return this.categories.get(category) || [];
    }

    // ═══════ GET CATEGORIES ═══════
    getCategories() {
        return Array.from(this.categories.keys());
    }

    // ═══════ RELOAD PLUGIN ═══════
    async reload(command) {
        const plugin = this.commands.get(command);
        if (!plugin) return false;

        try {
            const fileUrl = 'file://' + plugin.file + '?t=' + Date.now();
            const module = await import(fileUrl);

            if (module.default) {
                this.commands.set(command, {
                    ...module.default,
                    category: plugin.category,
                    file: plugin.file
                });
                return true;
            }
        } catch (error) {
            console.log(chalk.hex('#FF4757')(`❌ Failed to reload ${command}: ${error.message}`));
        }

        return false;
    }

    // ═══════ HOT RELOAD ALL ═══════
    async hotReload() {
        this.commands.clear();
        this.aliases.clear();
        this.categories.clear();
        return await this.loadAll();
    }
}

export default PluginLoader;
