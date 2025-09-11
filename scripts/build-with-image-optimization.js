import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildWithImageOptimization() {
  try {
    console.log('🖼️  Starting image optimization...');
    
    // Run the image optimization script
    await execAsync('node scripts/optimize-images.js');
    
    console.log('🚀 Building the site...');
    
    // Run the Astro build command
    const { stdout, stderr } = await execAsync('npm run build');
    
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
    
    console.log('✅ Build completed successfully with optimized images!');
  } catch (error) {
    console.error('❌ Error during build process:', error);
    process.exit(1);
  }
}

// Run the build process
buildWithImageOptimization();
