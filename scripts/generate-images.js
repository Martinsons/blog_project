const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function generateImages() {
  const publicDir = path.join(__dirname, '..', 'public');
  
  // Create base icon buffer
  const iconBuffer = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 5, g: 150, b: 105, alpha: 1 }
    }
  })
  .composite([
    {
      input: Buffer.from(`
        <svg width="512" height="512" viewBox="0 0 512 512">
          <path d="M256 120C180 200 140 280 140 320C140 380 190 400 256 400C322 400 372 380 372 320C372 280 332 200 256 120ZM256 160C300 220 332 280 332 320C332 360 300 370 256 370C212 370 180 360 180 320C180 280 212 220 256 160Z" fill="white"/>
          <path d="M256 180C290 220 310 260 310 290C310 320 288 330 256 330C224 330 202 320 202 290C202 260 222 220 256 180Z" fill="rgba(255,255,255,0.2)"/>
        </svg>
      `),
      top: 0,
      left: 0
    }
  ])
  .png()
  .toBuffer();

  // Generate different sizes
  const sizes = [
    { size: 16, name: 'favicon-16.png' },
    { size: 32, name: 'favicon-32.png' },
    { size: 192, name: 'icon-192.png' },
    { size: 512, name: 'icon-512.png' },
    { size: 180, name: 'apple-touch-icon.png' }
  ];

  for (const { size, name } of sizes) {
    await sharp(iconBuffer)
      .resize(size, size)
      .toFile(path.join(publicDir, name));
  }

  // Create maskable icon with padding
  await sharp(iconBuffer)
    .resize(512, 512, { fit: 'contain', background: { r: 5, g: 150, b: 105, alpha: 1 } })
    .toFile(path.join(publicDir, 'icon-maskable.png'));

  // Create OG image
  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 5, g: 150, b: 105, alpha: 1 }
    }
  })
  .composite([
    {
      input: iconBuffer,
      top: 165,
      left: 50,
      width: 300,
      height: 300
    },
    {
      input: Buffer.from(`
        <svg width="800" height="400">
          <text x="0" y="80" font-family="Arial" font-size="80" font-weight="bold" fill="white">VeselībaTev</text>
          <text x="0" y="150" font-family="Arial" font-size="40" fill="white">Jūsu ceļvedis veselīgā dzīvesveidā</text>
        </svg>
      `),
      top: 165,
      left: 400
    }
  ])
  .toFile(path.join(publicDir, 'og-image.jpg'));

  console.log('All images generated successfully!');
}

generateImages().catch(console.error);
