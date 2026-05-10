const fs = require('fs');
const files = [
  'C:/Projects/EcomX-website/src/pages/Dashboard.tsx',
  'C:/Projects/EcomX-website/src/pages/Explore.tsx',
  'C:/Projects/EcomX-website/src/pages/ProductDetails.tsx'
];

for (const file of files) {
  try {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\\\\\\`/g, '`'); // this is getting confusing. Let's just match escaped backticks.
    content = content.replace(/\\\\\\$/g, '$');
    
    // Actually, looking at the read_file output:
    // id: \`prod-\${i + 1}\`,
    
    content = content.replace(/\\`/g, '`');
    content = content.replace(/\\\$/g, '$');
    
    fs.writeFileSync(file, content);
    console.log('Fixed', file);
  } catch (e) {
    console.error(e);
  }
}
