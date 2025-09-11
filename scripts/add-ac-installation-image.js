import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define file paths
const filePath = path.join(__dirname, '../src/pages/air-conditioning-services/air-conditioning-installation.astro');

// Read the content of the file
const content = fs.readFileSync(filePath, 'utf8');

// Check if the image div already exists
if (content.includes('/images/optimized/air-conditioning-services/ac-installation.webp')) {
  console.log('Image div already exists in the file.');
  process.exit(0);
}

// Find the position where we need to insert the image div
// This is in the Service Overview section, inside the grid
const serviceOverviewSection = content.indexOf('<section class="py-16 md:py-24 bg-white">');
if (serviceOverviewSection === -1) {
  console.error('Could not find Service Overview section.');
  process.exit(1);
}

// Find the grid div
const gridDiv = content.indexOf('<div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">', serviceOverviewSection);
if (gridDiv === -1) {
  console.error('Could not find grid div in Service Overview section.');
  process.exit(1);
}

// Find the end of the first div in the grid (which contains the text content)
const firstDivEnd = content.indexOf('</div>', gridDiv) + 6;
if (firstDivEnd === -1) {
  console.error('Could not find end of first div in grid.');
  process.exit(1);
}

// Create the image div
const imageDiv = `
            <div>
              <img
                src="/images/optimized/air-conditioning-services/ac-installation.webp"
                alt="HVAC technician installing an air conditioning unit"
                class="rounded-lg shadow-xl w-full h-auto object-cover"
                width="600"
                height="400"
              />
            </div>`;

// Insert the image div after the first div
const updatedContent = content.slice(0, firstDivEnd) + imageDiv + content.slice(firstDivEnd);

// Write the updated content back to the file
fs.writeFileSync(filePath, updatedContent, 'utf8');

console.log('Image div added successfully to air-conditioning-installation.astro');
