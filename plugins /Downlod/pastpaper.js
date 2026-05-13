// ═══════════════════════════════════════════
//  QUEEN ALINA MD 2.0 - PAST PAPER
//  Sri Lankan Exam Past Papers Download
// ═══════════════════════════════════════════

import axios from 'axios';

const pastPaperDB = {
    // O/L Past Papers
    ol: {
        maths: {
            2023: 'https://pastpapers.wiki/download/ol-maths-2023',
            2022: 'https://pastpapers.wiki/download/ol-maths-2022',
            2021: 'https://pastpapers.wiki/download/ol-maths-2021',
            2020: 'https://pastpapers.wiki/download/ol-maths-2020',
            2019: 'https://pastpapers.wiki/download/ol-maths-2019',
        },
        science: {
            2023: 'https://pastpapers.wiki/download/ol-science-2023',
            2022: 'https://pastpapers.wiki/download/ol-science-2022',
            2021: 'https://pastpapers.wiki/download/ol-science-2021',
            2020: 'https://pastpapers.wiki/download/ol-science-2020',
        },
        english: {
            2023: 'https://pastpapers.wiki/download/ol-english-2023',
            2022: 'https://pastpapers.wiki/download/ol-english-2022',
            2021: 'https://pastpapers.wiki/download/ol-english-2021',
        },
        sinhala: {
            2023: 'https://pastpapers.wiki/download/ol-sinhala-2023',
            2022: 'https://pastpapers.wiki/download/ol-sinhala-2022',
            2021: 'https://pastpapers.wiki/download/ol-sinhala-2021',
        },
        history: {
            2023: 'https://pastpapers.wiki/download/ol-history-2023',
            2022: 'https://pastpapers.wiki/download/ol-history-2022',
        },
        geography: {
            2023: 'https://pastpapers.wiki/download/ol-geography-2023',
            2022: 'https://pastpapers.wiki/download/ol-geography-2022',
        },
        commerce: {
            2023: 'https://pastpapers.wiki/download/ol-commerce-2023',
            2022: 'https://pastpapers.wiki/download/ol-commerce-2022',
        },
        ict: {
            2023: 'https://pastpapers.wiki/download/ol-ict-2023',
            2022: 'https://pastpapers.wiki/download/ol-ict-2022',
            2021: 'https://pastpapers.wiki/download/ol-ict-2021',
        }
    },

    // A/L Past Papers
    al: {
        maths: {
            2023: 'https://pastpapers.wiki/download/al-maths-2023',
            2022: 'https://pastpapers.wiki/download/al-maths-2022',
            2021: 'https://pastpapers.wiki/download/al-maths-2021',
            2020: 'https://pastpapers.wiki/download/al-maths-2020',
            2019: 'https://pastpapers.wiki/download/al-maths-2019',
        },
        biology: {
            2023: 'https://pastpapers.wiki/download/al-bio-2023',
            2022: 'https://pastpapers.wiki/download/al-bio-2022',
            2021: 'https://pastpapers.wiki/download/al-bio-2021',
        },
        physics: {
            2023: 'https://pastpapers.wiki/download/al-physics-2023',
            2022: 'https://pastpapers.wiki/download/al-physics-2022',
            2021: 'https://pastpapers.wiki/download/al-physics-2021',
        },
        chemistry: {
            2023: 'https://pastpapers.wiki/download/al-chemistry-2023',
            2022: 'https://pastpapers.wiki/download/al-chemistry-2022',
        },
        ict: {
            2023: 'https://pastpapers.wiki/download/al-ict-2023',
            2022: 'https://pastpapers.wiki/download/al-ict-2022',
            2021: 'https://pastpapers.wiki/download/al-ict-2021',
        },
        accounting: {
            2023: 'https://pastpapers.wiki/download/al-accounting-2023',
            2022: 'https://pastpapers.wiki/download/al-accounting-2022',
        },
        business: {
            2023: 'https://pastpapers.wiki/download/al-business-2023',
            2022: 'https://pastpapers.wiki/download/al-business-2022',
        },
        economics: {
            2023: 'https://pastpapers.wiki/download/al-economics-2023',
            2022: 'https://pastpapers.wiki/download/al-economics-2022',
        }
    },

    // Grade 5 Scholarship
    scholarship: {
        maths: {
            2023: 'https://pastpapers.wiki/download/scholarship-maths-2023',
            2022: 'https://pastpapers.wiki/download/scholarship-maths-2022',
            2021: 'https://pastpapers.wiki/download/scholarship-maths-2021',
        },
        iq: {
            2023: 'https://pastpapers.wiki/download/scholarship-iq-2023',
            2022: 'https://pastpapers.wiki/download/scholarship-iq-2022',
        }
    }
};

export default {
    command: 'pastpaper',
    aliases: ['paper', 'exam', 'pastpapers', 'පසුපත්‍රය'],
    description: 'Download Sri Lankan exam past papers',
    category: 'download',
    execute: async (ctx) => {
        const { fullArgs, reply, buttons, from, sock } = ctx;

        if (!fullArgs) {
            // Show available subjects and years
            const helpText = `
📚 *SRI LANKAN PAST PAPERS* 📚

🎓 *Exam Types:*
• O/L (Ordinary Level)
• A/L (Advanced Level)
• Scholarship (Grade 5)

📖 *O/L Subjects:*
maths, science, english, sinhala, history, geography, commerce, ict

📖 *A/L Subjects:*
maths, biology, physics, chemistry, ict, accounting, business, economics

📖 *Scholarship:*
maths, iq

📝 *Usage:*
*.pastpaper ol maths 2023*
*.pastpaper al physics 2022*
*.pastpaper scholarship maths 2023*

_Queen Alina MD 2.0_
`;

            const categoryButtons = [
                { text: '📚 O/L Papers', id: 'pastpaper_ol' },
                { text: '🎓 A/L Papers', id: 'pastpaper_al' },
                { text: '🏆 Scholarship', id: 'pastpaper_scholarship' }
            ];

            await buttons.sendReplyButtons(from, helpText, categoryButtons);
            return;
        }

        const args = fullArgs.toLowerCase().split(' ');
        const examType = args[0]; // ol, al, scholarship
        const subject = args[1];  // maths, science, etc.
        const year = args[2];     // 2023, 2022, etc.

        if (!examType || !subject || !year) {
            return await reply(`❌ *Invalid Format!*\n\nUsage: *.pastpaper <type> <subject> <year>*\nExample: *.pastpaper ol maths 2023*\n\n_Queen Alina MD 2.0_`);
        }

        // Check if exam type exists
        if (!pastPaperDB[examType]) {
            return await reply(`❌ *Invalid Exam Type!*\n\nAvailable: ol, al, scholarship\n\n_Queen Alina MD 2.0_`);
        }

        // Check if subject exists
        if (!pastPaperDB[examType][subject]) {
            const availableSubjects = Object.keys(pastPaperDB[examType]).join(', ');
            return await reply(`❌ *Subject not found!*\n\nAvailable subjects for ${examType.toUpperCase()}: ${availableSubjects}\n\n_Queen Alina MD 2.0_`);
        }

        // Check if year exists
        if (!pastPaperDB[examType][subject][year]) {
            const availableYears = Object.keys(pastPaperDB[examType][subject]).join(', ');
            return await reply(`❌ *Year not found!*\n\nAvailable years for ${subject}: ${availableYears}\n\n_Queen Alina MD 2.0_`);
        }

        const paperUrl = pastPaperDB[examType][subject][year];

        try {
            await reply(`⏳ *Downloading ${examType.toUpperCase()} ${subject.toUpperCase()} ${year} Past Paper...*`);

            // Send paper as document
            await sock.sendMessage(from, {
                document: { url: paperUrl },
                mimetype: 'application/pdf',
                fileName: `${examType.toUpperCase()}_${subject.toUpperCase()}_${year}_Past_Paper.pdf`,
                caption: `📚 *${examType.toUpperCase()} ${subject.toUpperCase()} ${year} Past Paper*\n\n✅ Downloaded by Queen Alina MD 2.0\n🌐 Source: pastpapers.wiki`
            });

        } catch (error) {
            // If direct download fails, send link
            await reply(`📚 *${examType.toUpperCase()} ${subject.toUpperCase()} ${year} Past Paper*\n\n🔗 Download Link: ${paperUrl}\n\n⚠️ Click the link to download directly\n\n_Queen Alina MD 2.0_`);
        }
    }
};
