const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname);

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(srcDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Repair the <.div> tags that PowerShell corrupted
  let newContent = content.replace(/<(\/?)\.(div|section|img|h1|h2|p|span|a|button)/g, '<$1m.$2');
  
  // Convert any remaining <motion.tag> to <m.tag>
  newContent = newContent.replace(/<(\/?)motion\./g, '<$1m.');

  // Convert the import { motion } to import { m }
  newContent = newContent.replace(/import\s+\{([^}]*)motion([^}]*)\}\s+from\s+['"]framer-motion['"]/g, (match, p1, p2) => {
    return match.replace(/\bmotion\b/, 'm');
  });

  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log('Fixed:', file);
  }
});
