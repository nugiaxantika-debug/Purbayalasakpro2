const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function test() {
    const cmd = 'fakedana';
    const nominal = '15.000.000';
    const templatePath = path.join(process.cwd(), 'public', 'templates', cmd + '.png');
    
    if (fs.existsSync(templatePath)) {
        const metadata = await sharp(templatePath).metadata();
        const width = metadata.width || 1080;
        const height = metadata.height || 1920;
        
        const textSvg = `
            <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                <text x="160" y="195" font-family="sans-serif" font-size="36" fill="white">Rp</text>
                <text x="220" y="200" font-family="sans-serif" font-size="64" fill="white" font-weight="bold">${nominal}</text>
            </svg>
        `;
        
        await sharp(templatePath)
            .composite([{ input: Buffer.from(textSvg), top: 0, left: 0 }])
            .png()
            .toBuffer();
            
        console.log("Success test");
    } else {
        console.log("Template not found");
    }
}
test().catch(console.error);
