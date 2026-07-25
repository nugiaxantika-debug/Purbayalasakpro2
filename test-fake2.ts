import sharp from "sharp";
import path from "path";
import fs from "fs";

async function run() {
    const cmd = "fakedana";
    const nominal = "1.000.000";
    
    // Simulate user sending no image -> uses fallback template
    const templatePath = path.join(process.cwd(), 'public', 'templates', cmd + '.png');
    if (fs.existsSync(templatePath)) {
        const metadata = await sharp(templatePath).metadata();
        const width = metadata.width || 1080;
        const height = metadata.height || 1920;
        
        let textColor = 'white';
        if (cmd === 'fakelivin') textColor = 'black';
        
        let textSvg = `
            <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                <text x="100" y="240" font-family="sans-serif" font-size="40" fill="${textColor}">Rp</text>
                <text x="160" y="240" font-family="sans-serif" font-size="70" fill="${textColor}" font-weight="bold">${nominal}</text>
            </svg>
        `;
        
        const buffer = await sharp(templatePath)
            .composite([{ input: Buffer.from(textSvg), top: 0, left: 0 }])
            .png()
            .toFile('test_fakedana_fallback.png');
        console.log("Created test_fakedana_fallback.png");
    }
}
run();
