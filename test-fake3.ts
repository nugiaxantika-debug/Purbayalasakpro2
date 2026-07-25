import sharp from "sharp";
import path from "path";
import fs from "fs";

async function run() {
    const cmd = "fakedana";
    const nominal = "10.000.000";
    
    // Simulate user image with nominal "14.841"
    const templateBuffer = fs.readFileSync('test_fakedana_fallback.png');
    
    const metadata = await sharp(templateBuffer).metadata();
    const width = metadata.width || 1080;
    const height = metadata.height || 1920;
    
    let textSvg = '';
    
    if (cmd === 'fakedana') {
        const boxX = Math.round(width * 0.10);
        const boxY = Math.round(height * 0.02);
        const boxW = Math.round(width * 0.50);
        const boxH = Math.round(height * 0.05);
        const fontSize = Math.round(width * 0.06);
        const rpFontSize = Math.round(width * 0.035);
        
        textSvg = `
            <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                <!-- Tutupi saldo lama dengan warna biru DANA -->
                <rect x="${boxX}" y="${boxY}" width="${boxW}" height="${boxH}" fill="#118EE9" />
                <!-- Teks baru -->
                <text x="${boxX + (width * 0.02)}" y="${boxY + (boxH * 0.7)}" font-family="sans-serif" font-size="${rpFontSize}" fill="white" font-weight="normal">Rp</text>
                <text x="${boxX + (width * 0.08)}" y="${boxY + (boxH * 0.7)}" font-family="sans-serif" font-size="${fontSize}" fill="white" font-weight="bold">${nominal}</text>
            </svg>
        `;
    }
    
    const buffer = await sharp(templateBuffer)
        .composite([{ input: Buffer.from(textSvg), top: 0, left: 0 }])
        .png()
        .toFile('test_fakedana_user.png');
    console.log("Created test_fakedana_user.png");
}
run();
