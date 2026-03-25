const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/pages/Sobre.tsx',
  'src/pages/Home.tsx',
  'src/pages/Parceiro.tsx',
  'src/components/layout/Header.tsx'
];

filesToFix.forEach(relPath => {
  const file = path.join(__dirname, relPath);
  if (!fs.existsSync(file)) return;
  
  let content = fs.readFileSync(file, 'utf8');
  
  // Heuristic: `<m.div>` that is followed by white-space and then a closing tag `</...`, `)`, `}`, or another `<m.div>` that is meant to be a closing tag. 
  // It's safest to look for <m.div> \s* <\/
  // We'll run it a few times in case there are nested ones.
  let prevContent = '';
  while (content !== prevContent) {
    prevContent = content;
    content = content.replace(/<m\.div>(\s*)(?=<\/[a-zA-Z0-9_.]+>|\)|\]|\})|($))/g, '</m.div>$1');
  }

  // Also fix `<m.section>` and `<m.span>` if any
  content = content.replace(/<m\.section>(\s*)(?=<\/[a-zA-Z0-9_.]+>|\)|\]|\})|($))/g, '</m.section>$1');
  content = content.replace(/<m\.span>(\s*)(?=<\/[a-zA-Z0-9_.]+>|\)|\]|\})|($))/g, '</m.span>$1');

  // Specific fix for Header.tsx AnimatePresence missing import if happened
  if (relPath.includes('Header') && !content.includes('AnimatePresence')) {
     content = content.replace(/import\s+\{\s*m\s*\}\s+from\s+['"]framer-motion['"]/, "import { m, AnimatePresence } from 'framer-motion'");
  }

  fs.writeFileSync(file, content);
  console.log('Healed closing tags securely in:', relPath);
});
