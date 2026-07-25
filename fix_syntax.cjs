const fs = require('fs');
let code = fs.readFileSync('src/services/whatsapp.ts', 'utf8');

code = code.replace(
  `} else if ((body.startsWith(".anime") || body.startsWith("anime")) && body !== ".animemenu" && body !== "animemenu") {`,
  `} } else if ((body.startsWith(".anime") || body.startsWith("anime")) && body !== ".animemenu" && body !== "animemenu") {`
);

fs.writeFileSync('src/services/whatsapp.ts', code, 'utf8');
