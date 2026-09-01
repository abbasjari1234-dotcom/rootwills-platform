import fs from 'fs';
import path from 'path';

let issues = [];

function checkFile(file) {
  const content = fs.readFileSync(file, 'utf8');

  // Check <select>
  const selectRegex = /<select\b([^>]*)>/g;
  let match;
  while ((match = selectRegex.exec(content)) !== null) {
    const attrs = match[1];
    const hasAriaLabel = /aria-label=/i.test(attrs);
    const idMatch = /id=["']([^"']+)["']/.exec(attrs);
    let hasMatchingLabel = false;
    if (idMatch) {
      const id = idMatch[1];
      const labelRegex = new RegExp(`<label[^>]*htmlFor=["']${id}["']`, 'i');
      if (labelRegex.test(content)) hasMatchingLabel = true;
    }
    if (!hasAriaLabel && !hasMatchingLabel) {
      const lineNum = content.substring(0, match.index).split('\n').length;
      issues.push({ file, type: 'select', lineNum, snippet: attrs.trim() });
    }
  }

  // Check <textarea>
  const textareaRegex = /<textarea\b([^>]*)>/g;
  while ((match = textareaRegex.exec(content)) !== null) {
    const attrs = match[1];
    const hasAriaLabel = /aria-label=/i.test(attrs);
    const idMatch = /id=["']([^"']+)["']/.exec(attrs);
    let hasMatchingLabel = false;
    if (idMatch) {
      const id = idMatch[1];
      const labelRegex = new RegExp(`<label[^>]*htmlFor=["']${id}["']`, 'i');
      if (labelRegex.test(content)) hasMatchingLabel = true;
    }
    if (!hasAriaLabel && !hasMatchingLabel) {
      const lineNum = content.substring(0, match.index).split('\n').length;
      issues.push({ file, type: 'textarea', lineNum, snippet: attrs.trim() });
    }
  }

  // Check <button> without text or aria-label
  const buttonRegex = /<button\b([^>]*)>([\s\S]*?)<\/button>/g;
  while ((match = buttonRegex.exec(content)) !== null) {
    const attrs = match[1];
    const body = match[2];
    const hasAriaLabel = /aria-label=/i.test(attrs);
    const hasTitle = /title=/i.test(attrs);
    
    // Check visible text
    const textOnly = body.replace(/<[^>]+>/g, '').replace(/\{[^}]+\}/g, '').replace(/\s+/g, ' ').trim();
    if (!hasAriaLabel && !hasTitle && textOnly.length === 0 && !body.includes('props.children') && !body.includes('children')) {
      const lineNum = content.substring(0, match.index).split('\n').length;
      issues.push({ file, type: 'icon-button', lineNum, snippet: body.replace(/\s+/g, ' ').trim().substring(0, 80) });
    }
  }
}

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (full.endsWith('.tsx') || full.endsWith('.jsx')) checkFile(full);
  }
}

walk('./src');

console.log('=== WCAG ACCESSIBILITY AUDIT REPORT ===');
console.log(`Total potential issues flagged: ${issues.length}`);
issues.forEach((issue) => {
  console.log(`[${issue.type.toUpperCase()}] ${issue.file}:${issue.lineNum} -> ${issue.snippet}`);
});
