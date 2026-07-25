import fs from "fs";
import path from "path";
import sharp from "sharp";

async function test() {
    const cmd = "fakedana";
    const nominal = "1.000.000";
    try {
            const extensions = ['.png', '.jpg', '.jpeg'];
            let templatePath = null;
            for (const ext of extensions) {
                const p = path.join(process.cwd(), 'public', 'templates', cmd + ext);
                if (fs.existsSync(p)) {
                    templatePath = p;
                    break;
                }
            }
            
            let buffer;
            if (templatePath) {
                console.log("Template found", templatePath);
                // Gunakan template asli
                const metadata = await sharp(templatePath).metadata();
                const width = metadata.width || 1080;
                const height = metadata.height || 1920;
                
                // Konfigurasi posisi teks (default di tengah, bisa disesuaikan per aplikasi)
                let textSvg = '';
                if (cmd === 'fakedana') {
                    // Dana: "Rp 1.000.000" biasanya di atas kiri
                    textSvg = `
                        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                            <text x="18%" y="7.5%" font-family="sans-serif" font-size="45" fill="white" font-weight="bold">Rp ${nominal}</text>
                        </svg>
                    `;
                } else if (cmd === 'fakegopay') {
                    textSvg = `
                        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                            <text x="15%" y="15%" font-family="sans-serif" font-size="50" fill="white" font-weight="bold">Rp${nominal}</text>
                        </svg>
                    `;
                } else {
                    // Default fallback for others
                    textSvg = `
                        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                            <text x="50%" y="20%" font-family="sans-serif" font-size="60" fill="black" text-anchor="middle" font-weight="bold">Rp ${nominal}</text>
                        </svg>
                    `;
                }
                
                buffer = await sharp(templatePath)
                    .composite([{ input: Buffer.from(textSvg), top: 0, left: 0 }])
                    .png()
                    .toBuffer();
            } else {
                console.log("Template not found");
                // Fallback jika tidak ada template
                const svgText = `
                    <svg width="600" height="1200" xmlns="http://www.w3.org/2000/svg">
                      <rect width="600" height="1200" fill="#118ee9"/>
                      <text x="50%" y="30%" font-family="Arial" font-size="60" fill="white" text-anchor="middle" font-weight="bold">Fake ${cmd.replace('fake', '').toUpperCase()}</text>
                      <text x="50%" y="40%" font-family="Arial" font-size="80" fill="white" text-anchor="middle" font-weight="bold">Rp ${nominal}</text>
                      <text x="50%" y="50%" font-family="Arial" font-size="40" fill="white" text-anchor="middle">Template ${cmd}.png tidak ditemukan!</text>
                      <text x="50%" y="55%" font-family="Arial" font-size="30" fill="white" text-anchor="middle">Upload foto ke folder public/templates/</text>
                    </svg>
                `;
                buffer = await sharp(Buffer.from(svgText)).png().toBuffer();
            }
            console.log("Success", buffer.length);
    } catch (e) {
        console.error("Error:", e);
    }
}
test();
