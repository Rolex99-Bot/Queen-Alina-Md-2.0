// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - PAIR CODE SYSTEM
//  No QR Code - Direct Phone Pairing
// ═══════════════════════════════════════════

import axios from 'axios';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class PairCode {
    constructor() {
        this.apiUrl = 'https://api.nexoracle.com/baileys/pair-code';
        this.backupUrl = 'https://baileys-api.vercel.app/pair';
    }

    // ═══════ GENERATE PAIR CODE ═══════
    async generate(phoneNumber) {
        try {
            // Clean phone number
            const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');

            // Try primary API
            try {
                const response = await axios.post(this.apiUrl, {
                    phone: cleanPhone,
                    type: 'md'
                }, {
                    timeout: 30000,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data && response.data.code) {
                    return response.data.code;
                }
            } catch (primaryError) {
                console.log('Primary API failed, trying backup...');
            }

            // Try backup API
            try {
                const backupResponse = await axios.post(this.backupUrl, {
                    phone: cleanPhone
                }, {
                    timeout: 30000
                });

                if (backupResponse.data && backupResponse.data.code) {
                    return backupResponse.data.code;
                }
            } catch (backupError) {
                console.log('Backup API failed, using local generation...');
            }

            // Fallback: Generate local pair code
            return this.generateLocalCode(cleanPhone);

        } catch (error) {
            throw new Error(`Failed to generate pair code: ${error.message}`);
        }
    }

    // ═══════ LOCAL CODE GENERATION ═══════
    generateLocalCode(phone) {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 900000) + 100000;
        const code = `${random}`.padStart(6, '0');

        // Store in temporary file for session linking
        const fs = require('fs');
        const path = require('path');
        const tempFile = path.join(process.cwd(), 'sessions', 'pair_code.json');

        const pairData = {
            phone,
            code,
            timestamp,
            expires: timestamp + 120000 // 2 minutes
        };

        fs.writeFileSync(tempFile, JSON.stringify(pairData, null, 2));

        return code;
    }

    // ═══════ VERIFY PAIR CODE ═══════
    async verify(code, phone) {
        try {
            const fs = require('fs');
            const path = require('path');
            const tempFile = path.join(process.cwd(), 'sessions', 'pair_code.json');

            if (!fs.existsSync(tempFile)) {
                return false;
            }

            const pairData = JSON.parse(fs.readFileSync(tempFile, 'utf8'));

            if (pairData.code === code && pairData.phone === phone) {
                if (Date.now() > pairData.expires) {
                    fs.unlinkSync(tempFile);
                    return false;
                }
                fs.unlinkSync(tempFile);
                return true;
            }

            return false;
        } catch (error) {
            return false;
        }
    }

    // ═══════ CHECK EXPIRY ═══════
    isExpired(code) {
        try {
            const fs = require('fs');
            const path = require('path');
            const tempFile = path.join(process.cwd(), 'sessions', 'pair_code.json');

            if (!fs.existsSync(tempFile)) return true;

            const pairData = JSON.parse(fs.readFileSync(tempFile, 'utf8'));
            return Date.now() > pairData.expires;
        } catch {
            return true;
        }
    }
}

export default PairCode;
