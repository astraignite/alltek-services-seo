import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Input and output paths
const inputPath = path.join(__dirname, '../public/images/optimized/heating-and-air/belton-tx-hvac-technician.jpg');
const outputPath = path.join(__dirname, '../public/images/optimized/heating-and-air/belton-tx-hvac-technician.webp');

async function convertImage() {
  try {
    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    
    // Resize and convert to WebP
    await sharp(inputPath)
      .resize({ 
        width: Math.min(metadata.width, 800),
        withoutEnlargement: true
      })
      .webp({ quality: 80 })
      .toFile(outputPath);
    
    console.log(`Optimized: ${inputPath} -> ${outputPath}`);
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error);
  }
}

// Convert the image
convertImage()
  .then(() => console.log('Image conversion complete!'))
  .catch(err => console.error('Error during image conversion:', err));
