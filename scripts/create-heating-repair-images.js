import fs from 'fs';
import path from 'path';
import https from 'https';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create directories if they don't exist
const outputDir = path.join(__dirname, '../public/images/optimized/heating-and-air');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to download image from URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${filepath}`);
        resolve(filepath);
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete the file if there's an error
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Function to convert image to WebP
async function convertToWebP(inputPath, outputPath) {
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
    return outputPath;
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error);
    throw error;
  }
}

// Images to download and convert
const images = [
  {
    name: 'heating-system-repair',
    url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
    alt: 'HVAC technician repairing a home heating system in Belton, TX'
  },
  {
    name: 'furnace-maintenance',
    url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    alt: 'HVAC technician performing professional heating system repair in Belton, TX'
  }
];

// Process all images
async function processAllImages() {
  for (const image of images) {
    const jpgPath = path.join(outputDir, `${image.name}.jpg`);
    const webpPath = path.join(outputDir, `${image.name}.webp`);
    
    try {
      // Download the image
      await downloadImage(image.url, jpgPath);
      
      // Convert to WebP
      await convertToWebP(jpgPath, webpPath);
      
      console.log(`Successfully processed: ${image.name}`);
    } catch (error) {
      console.error(`Error processing ${image.name}:`, error);
    }
  }
}

// Run the script
processAllImages()
  .then(() => console.log('All images processed successfully!'))
  .catch(err => console.error('Error during image processing:', err));
