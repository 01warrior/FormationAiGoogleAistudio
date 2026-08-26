const fs = require('fs');
let code = fs.readFileSync('src/vite-env.d.ts', 'utf8');

if (!code.includes('declare module \'virtual:pwa-register\'')) {
  code += `\n/// <reference types="vite-plugin-pwa/client" />\n`;
  fs.writeFileSync('src/vite-env.d.ts', code);
  console.log('patched types');
} else {
  console.log('already patched');
}
