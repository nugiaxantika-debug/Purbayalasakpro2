const fs = require('fs');
let code = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

const regex = /      \} catch \(e\) \{\n           await this\.sock\.sendMessage\(jid, \{ text: "❌ \*Gagal memanggil hantu\.\*" \}, \{ quoted: msg \}\);\n        \}\n          \} \} else if/g;

code = code.replace(regex, '      } } else if');

fs.writeFileSync('src/services/whatsapp.ts', code, 'utf8');
console.log('Replaced?', code.includes('} catch (e) {') ? 'Still has catches' : 'No catches', 'did regex match:', code.includes('Gagal memanggil hantu') === false);
