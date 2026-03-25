import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, 'public/images/parceiros');

const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

for (const file of files) {
  const input = path.join(dir, file);
  const output = path.join(dir, file.replace('.png', '.webp'));
  try {
    sharp(input)
      .resize({ height: 80, fit: 'inside' })
      .webp({ quality: 80 })
      .toFile(output)
      .then(() => console.log(`Converted ${file}`))
      .catch(e => console.error(`Error converting ${file}: ${e.message}`));
  } catch (err) {
    console.error(err);
  }
}
