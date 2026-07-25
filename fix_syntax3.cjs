const fs = require('fs');
let code = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

const target = `        }
      } catch (e) {
           await this.sock.sendMessage(jid, { text: "❌ *Gagal memanggil hantu.*" }, { quoted: msg });
        }
          } } else if`;

const replacement = `        }
      } } else if`;

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('src/services/whatsapp.ts', code, 'utf8');
    console.log('Fixed syntax error!');
} else {
    console.log('Target not found!');
}
