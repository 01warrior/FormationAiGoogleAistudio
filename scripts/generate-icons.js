import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputPath = path.resolve('public/logo.jpg');
const sizes = [144, 192, 512];

async function generate() {
  if (!fs.existsSync(inputPath)) {
    console.error('logo.jpg not found');
    return;
  }
  for (const size of sizes) {
    const outPath = path.resolve(`public/icon-${size}.png`);
    await sharp(inputPath)
      .resize(size, size)
      .png()
      .toFile(outPath);
    console.log(`Generated icon-${size}.png`);
  }
}
generate();
