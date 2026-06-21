import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../public');
const THUMBNAILS_DIR = path.join(PUBLIC_DIR, 'thumbnails');

const DIRS_TO_PROCESS = [PUBLIC_DIR, THUMBNAILS_DIR];
const ALLOWED_EXTS = ['.png', '.jpg', '.jpeg'];

async function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return;

  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      
      if (ALLOWED_EXTS.includes(ext)) {
        const basename = path.basename(file, path.extname(file));
        const webpPath = path.join(dirPath, `${basename}.webp`);
        
        // Skip if webp already exists
        if (fs.existsSync(webpPath)) {
          console.log(`Skipping: ${file} (WebP already exists)`);
          continue;
        }

        console.log(`Processing: ${file} -> ${basename}.webp`);
        
        try {
          await sharp(fullPath)
            .webp({ quality: 80, effort: 6 })
            .toFile(webpPath);
          console.log(`  Successfully created ${basename}.webp`);
        } catch (err) {
          console.error(`  Error processing ${file}:`, err);
        }
      }
    }
  }
}

async function run() {
  console.log('Starting image compression...');
  for (const dir of DIRS_TO_PROCESS) {
    console.log(`\nScanning directory: ${dir}`);
    await processDirectory(dir);
  }
  console.log('\nFinished image compression!');
}

run();
