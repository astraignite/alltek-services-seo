import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base directories
const baseImagesDir = path.join(__dirname, '../public/images');
const optimizedDir = path.join(__dirname, '../public/images-optimized');

// Create optimized images directory if it doesn't exist
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

// Function to recursively process images in a directory
async function processImagesInDirectory(directory) {
  // Skip the optimized directory to avoid infinite recursion
  if (directory.includes('optimized')) {
    return;
  }
  
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    
    if (entry.isDirectory()) {
      // Process images in subdirectory
      await processImagesInDirectory(fullPath);
    } else if (entry.isFile() && /\.(jpg|jpeg|png)$/i.test(entry.name)) {
      // Process image file
      const relativePath = path.relative(baseImagesDir, directory);
      const outputDir = path.join(optimizedDir, relativePath);
      
      // Create output directory if it doesn't exist
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      const outputPath = path.join(outputDir, entry.name.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
      
      try {
        // Get image dimensions
        const metadata = await sharp(fullPath).metadata();
        
        // Determine appropriate size based on usage
        // For hero images, keep them larger but still optimize
        const isHero = fullPath.includes('hero');
        const maxWidth = isHero ? 1920 : 800;
        
        // Resize and convert to WebP
        await sharp(fullPath)
          .resize({ 
            width: Math.min(metadata.width, maxWidth),
            withoutEnlargement: true
          })
          .webp({ quality: 80 })
          .toFile(outputPath);
        
        console.log(`Optimized: ${fullPath} -> ${outputPath}`);
      } catch (error) {
        console.error(`Error processing ${fullPath}:`, error);
      }
    }
  }
}

// Start processing from the images directory
processImagesInDirectory(baseImagesDir)
  .then(() => console.log('Image optimization complete!'))
  .catch(err => console.error('Error during image optimization:', err));
