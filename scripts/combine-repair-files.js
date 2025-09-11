import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define file paths
const mainFilePath = path.join(__dirname, '../src/pages/heating-and-air/heating-and-air-repair.astro');
const part2FilePath = path.join(__dirname, '../src/pages/heating-and-air/heating-and-air-repair-part2.astro');
const outputFilePath = mainFilePath;

// Read the content of both files
const mainContent = fs.readFileSync(mainFilePath, 'utf8');
const part2Content = fs.readFileSync(part2FilePath, 'utf8');

// Find the position where we need to insert the part2 content
// This is right after the Cooling Repair section opening div
const insertPosition = mainContent.indexOf('<div class="bg-lightgray p-8 rounded-lg shadow-md">') + 
                       '<div class="bg-lightgray p-8 rounded-lg shadow-md">'.length;

// Create the combined content
const combinedContent = mainContent.slice(0, insertPosition) + 
                        part2Content;

// Write the combined content back to the main file
fs.writeFileSync(outputFilePath, combinedContent, 'utf8');

console.log('Files combined successfully!');
