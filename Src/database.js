// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - DATABASE SYSTEM
//  MongoDB + JSON Database Support
// ═══════════════════════════════════════════

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Database {
    constructor(config = {}) {
        this.config = config;
        this.type = config.type || 'json';
        this.mongoose = null;
        this.connected = false;
        this.jsonPath = config.json?.path || path.join(__dirname, '..', 'database', 'json');
        this.cache = new Map();
    }

    // ═══════ CONNECT ═══════
    async connect() {
        if (this.type === 'mongodb') {
            return await this.connectMongoDB();
        } else {
            return await this.connectJSON();
        }
    }

    // ═══════ MONGODB CONNECTION ═══════
    async connectMongoDB() {
        try {
            const { default: mongoose } = await import('mongoose');
            this.mongoose = mongoose;

            await mongoose.connect(this.config.mongodb?.uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                maxPoolSize: 10
            });

            this.connected = true;
            console.log('[✅] MongoDB connected successfully');
            return true;
        } catch (error) {
            console.log('[⚠️] MongoDB connection failed, falling back to JSON database');
            this.type = 'json';
            return await this.connectJSON();
        }
    }

    // ═══════ JSON DATABASE ═══════
    async connectJSON() {
        await fs.ensureDir(this.jsonPath);
        this.connected = true;
        console.log('[✅] JSON database initialized');
        return true;
    }

    // ═══════ GET COLLECTION/FILE ═══════
    async getCollection(name) {
        if (this.type === 'mongodb') {
            return this.mongoose.connection.collection(name);
        } else {
            const filePath = path.join(this.jsonPath, `${name}.json`);
            if (!await fs.pathExists(filePath)) {
                await fs.writeJson(filePath, []);
            }
            return filePath;
        }
    }

    // ═══════ INSERT ═══════
    async insert(collection, data) {
        if (this.type === 'mongodb') {
            const col = await this.getCollection(collection);
            return await col.insertOne({ ...data, createdAt: new Date() });
        } else {
            const filePath = await this.getCollection(collection);
            const existing = await fs.readJson(filePath);
            existing.push({ ...data, _id: Date.now().toString(), createdAt: new Date() });
            await fs.writeJson(filePath, existing, { spaces: 2 });
            return { insertedId: data._id || Date.now().toString() };
        }
    }

    // ═══════ FIND ═══════
    async find(collection, query = {}) {
        if (this.type === 'mongodb') {
            const col = await this.getCollection(collection);
            return await col.find(query).toArray();
        } else {
            const filePath = await this.getCollection(collection);
            const data = await fs.readJson(filePath);

            if (Object.keys(query).length === 0) return data;

            return data.filter(item => {
                for (const [key, value] of Object.entries(query)) {
                    if (item[key] !== value) return false;
                }
                return true;
            });
        }
    }

    // ═══════ FIND ONE ═══════
    async findOne(collection, query = {}) {
        const results = await this.find(collection, query);
        return results[0] || null;
    }

    // ═══════ UPDATE ═══════
    async update(collection, query, update) {
        if (this.type === 'mongodb') {
            const col = await this.getCollection(collection);
            return await col.updateOne(query, { $set: update });
        } else {
            const filePath = await this.getCollection(collection);
            const data = await fs.readJson(filePath);

            const index = data.findIndex(item => {
                for (const [key, value] of Object.entries(query)) {
                    if (item[key] !== value) return false;
                }
                return true;
            });

            if (index !== -1) {
                data[index] = { ...data[index], ...update, updatedAt: new Date() };
                await fs.writeJson(filePath, data, { spaces: 2 });
                return { modifiedCount: 1 };
            }

            return { modifiedCount: 0 };
        }
    }

    // ═══════ DELETE ═══════
    async delete(collection, query) {
        if (this.type === 'mongodb') {
            const col = await this.getCollection(collection);
            return await col.deleteOne(query);
        } else {
            const filePath = await this.getCollection(collection);
            const data = await fs.readJson(filePath);

            const initialLength = data.length;
            const filtered = data.filter(item => {
                for (const [key, value] of Object.entries(query)) {
                    if (item[key] === value) return false;
                }
                return true;
            });

            await fs.writeJson(filePath, filtered, { spaces: 2 });
            return { deletedCount: initialLength - filtered.length };
        }
    }

    // ═══════ SAVE USER DATA ═══════
    async saveUser(userId, data) {
        const existing = await this.findOne('users', { userId });

        if (existing) {
            return await this.update('users', { userId }, { ...data, updatedAt: new Date() });
        } else {
            return await this.insert('users', { userId, ...data, createdAt: new Date() });
        }
    }

    // ═══════ GET USER DATA ═══════
    async getUser(userId) {
        return await this.findOne('users', { userId });
    }

    // ═══════ SAVE GROUP DATA ═══════
    async saveGroup(groupId, data) {
        const existing = await this.findOne('groups', { groupId });

        if (existing) {
            return await this.update('groups', { groupId }, { ...data, updatedAt: new Date() });
        } else {
            return await this.insert('groups', { groupId, ...data, createdAt: new Date() });
        }
    }

    // ═══════ GET GROUP DATA ═══════
    async getGroup(groupId) {
        return await this.findOne('groups', { groupId });
    }

    // ═══════ LOG COMMAND ═══════
    async logCommand(userId, command, groupId = null) {
        return await this.insert('command_logs', {
            userId,
            command,
            groupId,
            timestamp: new Date()
        });
    }

    // ═══════ GET COMMAND STATS ═══════
    async getCommandStats() {
        const logs = await this.find('command_logs');
        const stats = {};

        for (const log of logs) {
            stats[log.command] = (stats[log.command] || 0) + 1;
        }

        return stats;
    }

    // ═══════ BACKUP ═══════
    async backup() {
        const backupDir = path.join(__dirname, '..', 'database', 'backups');
        await fs.ensureDir(backupDir);

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupPath = path.join(backupDir, `backup_${timestamp}.json`);

        const collections = ['users', 'groups', 'command_logs', 'settings'];
        const backup = {};

        for (const collection of collections) {
            backup[collection] = await this.find(collection);
        }

        await fs.writeJson(backupPath, backup, { spaces: 2 });
        return backupPath;
    }

    // ═══════ RESTORE ═══════
    async restore(backupPath) {
        if (!await fs.pathExists(backupPath)) {
            throw new Error('Backup file not found');
        }

        const backup = await fs.readJson(backupPath);

        for (const [collection, data] of Object.entries(backup)) {
            const filePath = path.join(this.jsonPath, `${collection}.json`);
            await fs.writeJson(filePath, data, { spaces: 2 });
        }

        return true;
    }
}

export default Database;
