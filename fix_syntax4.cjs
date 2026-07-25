const fs = require('fs');
let code = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

const lines = code.split('\n');
const startIdx = lines.findIndex(l => l.includes('Gagal memanggil hantu.*"'));
if (startIdx !== -1) {
    // line startIdx contains `await this.sock.sendMessage(...)`
    // line startIdx - 1 is `      } catch (e) {`
    // line startIdx + 1 is `        }`
    // line startIdx + 2 is `          } } else if`
    console.log("Removing lines around", startIdx);
    lines.splice(startIdx - 1, 3);
    fs.writeFileSync('src/services/whatsapp.ts', lines.join('\n'), 'utf8');
}
