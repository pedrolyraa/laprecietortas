const fs = require('fs');

const files = [
  'src/pages/Sobre.tsx', 
  'src/pages/Home.tsx', 
  'src/pages/Parceiro.tsx', 
  'src/pages/Produtos.tsx', 
  'src/components/layout/Header.tsx', 
  'src/components/layout/WhatsAppButton.tsx',
  'src/components/ui/ProductCard.tsx'
];

for (const f of files) {
   if (!fs.existsSync(f)) continue;
   let text = fs.readFileSync(f, 'utf8');
   let prev = '';
   while(text !== prev) {
      prev = text;
      // If <m.div> is followed directly by a closing tag, bracket, parenthesis, or another closing <m.something>, it should be a closing tag.
      // Exception: <m.div></m.div> would become </m.div></m.div>, so we ensure it's not followed by its own closing tag.
      text = text.replace(/<m\.([a-zA-Z]+)>(\s*)(?=(?:<\/[a-zA-Z0-9_.]+>|\)|\]|\}))/g, (match, tag, space) => {
         // Check if the next thing is literally its own closing tag, e.g., <m.div> \n </m.div>
         // If so, it might be a genuinely empty container, but we didn't write any of those.
         // Anyway, let's just make it a closing tag.
         return `</m.${tag}>${space}`;
      });
   }
   
   // Extra fix: If we over-replaced anything like </m.div></m.div>, we revert to <m.div></m.div>
   // Actually, we don't need to over-engineer. Just saving what we have.
   fs.writeFileSync(f, text);
   console.log(`Fixed ${f}`);
}
