import Jimp from 'jimp';

async function generate() {
  try {
    const img192 = new Jimp(192, 192, '#2563EB');
    await img192.writeAsync('public/icon-192.png');
    
    const img512 = new Jimp(512, 512, '#2563EB');
    await img512.writeAsync('public/icon-512.png');
    
    const img144 = new Jimp(144, 144, '#2563EB');
    await img144.writeAsync('public/icon-144.png');
    
    console.log('Successfully generated default PWA icons');
  } catch (err) {
    console.error('Error generating icons:', err);
  }
}

generate();
