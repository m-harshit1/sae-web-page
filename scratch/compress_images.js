const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const imagesToCompress = [
  'baja_atv_race.png',
  'outreach_mentorship.png',
  'team_workshop.png',
  'event_baja_drift.png',
  'event_baja_jump.png',
  'event_baja_lineup.png'
];

async function compressImage(filename) {
  const filePath = path.join(publicDir, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filename}`);
    return;
  }

  const originalSize = fs.statSync(filePath).size;
  console.log(`Compressing ${filename} (${(originalSize / 1024).toFixed(1)} KB)...`);

  const tempPath = filePath + '.tmp';
  
  try {
    // Resize to max width 1200px and compress quality
    await sharp(filePath)
      .resize({ width: 1200, withoutEnlargement: true })
      .png({ quality: 80, compressionLevel: 8 })
      .toFile(tempPath);

    const newSize = fs.statSync(tempPath).size;
    
    if (newSize < originalSize) {
      fs.renameSync(tempPath, filePath);
      console.log(`✓ Compressed ${filename} to ${(newSize / 1024).toFixed(1)} KB (${((1 - newSize / originalSize) * 100).toFixed(1)}% savings)`);
    } else {
      fs.unlinkSync(tempPath);
      console.log(`- Compression did not yield savings for ${filename}, kept original`);
    }
  } catch (error) {
    console.error(`Error compressing ${filename}:`, error);
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
  }
}

async function run() {
  console.log('Starting image compression shakedown...');
  for (const img of imagesToCompress) {
    await compressImage(img);
  }
  console.log('Image compression shakedown completed!');
}

run();
