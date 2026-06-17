import fs from 'fs';
import path from 'path';

const featuresDir = './src/features';

function removeTag(content, tagPrefix) {
  let startIdx = content.indexOf(tagPrefix);
  if (startIdx === -1) return content;
  
  let openCount = 0;
  let idx = startIdx;
  
  let tagName = tagPrefix.substring(1).split(/[ >]/)[0];
  let openTagPattern = `<${tagName}`;
  let closeTagPattern = `</${tagName}>`;
  
  while (idx < content.length) {
    if (content.substring(idx, idx + openTagPattern.length) === openTagPattern) {
      openCount++;
    } else if (content.substring(idx, idx + closeTagPattern.length) === closeTagPattern) {
      openCount--;
      if (openCount === 0) {
        let endIdx = idx + closeTagPattern.length;
        return content.substring(0, startIdx) + content.substring(endIdx);
      }
    }
    idx++;
  }
  return content;
}

function replaceMainTag(content) {
  let mainIdx = content.indexOf('<main');
  if (mainIdx === -1) return content;
  
  let endOpenIdx = content.indexOf('>', mainIdx);
  if (endOpenIdx === -1) return content;
  
  let mainTag = content.substring(mainIdx, endOpenIdx + 1);
  
  // Detect if page has right sidebar (fixed right-0)
  let hasRightSidebar = content.includes('fixed right-0') || content.includes('id="ai-assistant"');
  let extraPadding = hasRightSidebar ? ' xl:pr-80' : '';
  
  let newTag = '';
  if (mainTag.includes('flex')) {
    newTag = `<div className="flex gap-6${extraPadding}">`;
    if (mainTag.includes('flex-col')) {
      newTag = `<div className="flex flex-col h-full relative${extraPadding}">`;
    }
  } else {
    newTag = `<div className="space-y-6${extraPadding}">`;
  }
  
  content = content.substring(0, mainIdx) + newTag + content.substring(endOpenIdx + 1);
  
  let closeMainIdx = content.lastIndexOf('</main>');
  if (closeMainIdx !== -1) {
    content = content.substring(0, closeMainIdx) + '</div>' + content.substring(closeMainIdx + 7);
  }
  
  return content;
}

function processFile(filePath) {
  if (filePath.includes('LoginPage.tsx')) {
    console.log(`Skipping: ${filePath}`);
    return;
  }
  
  console.log(`Processing: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. Remove left sidebar
  content = removeTag(content, '<aside className="fixed left-0');
  
  // 2. Remove top header
  content = removeTag(content, '<header className="fixed top-0 right-0');
  content = removeTag(content, '<header className="h-16 bg-surface-bright');
  
  // 3. Replace main container tag with div
  content = replaceMainTag(content);
  
  fs.writeFileSync(filePath, content, 'utf8');
}

function walkDir(dir) {
  let files = fs.readdirSync(dir);
  for (let file of files) {
    let fullPath = path.join(dir, file);
    let stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (stat.isFile() && file.endsWith('.tsx')) {
      processFile(fullPath);
    }
  }
}

walkDir(featuresDir);
console.log('Cleanup completed successfully.');
