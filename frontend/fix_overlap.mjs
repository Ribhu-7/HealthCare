import fs from 'fs';
import path from 'path';

const dir = 'src/features';

function fixFiles(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixFiles(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      
      // Check if file has the right-side AI assistant panel
      const hasRightSidebar = content.includes('fixed right-0 top-16') && content.includes('w-80');
      
      if (hasRightSidebar) {
        // If it has a right sidebar, the main container should also have mr-80
        content = content.replace(/ml-\[280px\](?!.*mr-80)/g, 'ml-[280px] mr-80');
      }
      
      fs.writeFileSync(fullPath, content);
      if (hasRightSidebar) console.log('Fixed overlap in', fullPath);
    }
  }
}

fixFiles(dir);
