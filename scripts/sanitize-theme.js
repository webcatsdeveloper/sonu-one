const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const WORKSPACE_DIR = '/Users/jay/Downloads/getsonu';
const SECTIONS_DIR = path.join(WORKSPACE_DIR, 'sections');
const ASSETS_DIR = path.join(WORKSPACE_DIR, 'assets');
const TEMPLATES_DIR = path.join(WORKSPACE_DIR, 'templates');

const PREFIXES = ['sonu-', 'custom-', 'spatial-'];
const TARGET_PREFIX = 'sonu-';

// Helper to run git commands
function runGitCommand(cmd) {
  try {
    execSync(cmd, { cwd: WORKSPACE_DIR, stdio: 'pipe' });
    return true;
  } catch (e) {
    console.error(`Git command failed: ${cmd}`, e.message);
    return false;
  }
}

// Extract {% schema %} content from liquid
function extractSchema(content) {
  const match = content.match(/{%\s*schema\s*%}([\s\S]*?){%\s*endschema\s*%}/);
  if (!match) return null;
  try {
    return JSON.parse(match[1].trim());
  } catch (e) {
    // Fallback if there are comments or malformed JSON
    return null;
  }
}

// Check if section is custom by examining its schema content
function isCustomSection(filename, content) {
  // If it's already prefixed, it's custom and sanitized
  if (PREFIXES.some(p => filename.startsWith(p))) {
    return false;
  }

  // Check file content for specific indicators or search schema presets
  const schema = extractSchema(content);
  if (!schema) {
    // If we can't parse schema, do a regex search for presets name containing keywords
    const presetsMatch = content.match(/"presets"\s*:\s*\[([\s\S]*?)\]/);
    if (presetsMatch) {
      const lower = presetsMatch[1].toLowerCase();
      return lower.includes('sonu') || lower.includes('spatial') || lower.includes('custom-');
    }
    return false;
  }

  // Check presets names
  if (schema.presets && Array.isArray(schema.presets)) {
    for (const preset of schema.presets) {
      if (preset.name) {
        const lowerName = preset.name.toLowerCase();
        if (lowerName.includes('sonu') || lowerName.includes('spatial') || lowerName.includes('custom')) {
          return true;
        }
      }
    }
  }

  return false;
}

function sanitize() {
  console.log('Starting theme sanitization check...');
  
  if (!fs.existsSync(SECTIONS_DIR)) {
    console.error('Sections directory not found.');
    return;
  }

  const files = fs.readdirSync(SECTIONS_DIR).filter(f => f.endsWith('.liquid'));
  const pendingSanitization = [];

  for (const file of files) {
    const filePath = path.join(SECTIONS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    if (isCustomSection(file, content)) {
      pendingSanitization.push({
        file: file,
        path: filePath,
        baseName: file.replace('.liquid', '')
      });
    }
  }

  if (pendingSanitization.length === 0) {
    console.log('✨ All custom sections are already sanitized and prefixed correctly!');
    return;
  }

  console.log(`Found ${pendingSanitization.length} unsanitized section(s):`);
  for (const item of pendingSanitization) {
    const oldName = item.baseName;
    const newName = TARGET_PREFIX + oldName;
    
    console.log(`- Renaming [${oldName}] to [${newName}]...`);

    // 1. Rename liquid section file using git mv
    const oldLiquidPath = path.join('sections', `${oldName}.liquid`);
    const newLiquidPath = path.join('sections', `${newName}.liquid`);
    runGitCommand(`git mv ${oldLiquidPath} ${newLiquidPath}`);

    // 2. Check if a supporting asset JS file exists
    const oldJsFile = `${oldName}.js`;
    const newJsFile = `${newName}.js`;
    const oldJsPath = path.join(ASSETS_DIR, oldJsFile);
    if (fs.existsSync(oldJsPath)) {
      console.log(`  - Renaming asset [${oldJsFile}] to [${newJsFile}]...`);
      runGitCommand(`git mv assets/${oldJsFile} assets/${newJsFile}`);
    }

    // 3. Update asset loading references inside the newly renamed liquid file
    const newLiquidFullPath = path.join(SECTIONS_DIR, `${newName}.liquid`);
    let liquidContent = fs.readFileSync(newLiquidFullPath, 'utf8');
    
    // Replace script/style tags loading the old JS/CSS files
    const jsRegex = new RegExp(`'${oldName}\\.js'`, 'g');
    const cssRegex = new RegExp(`'${oldName}\\.css'`, 'g');
    liquidContent = liquidContent.replace(jsRegex, `'${newName}.js'`).replace(cssRegex, `'${newName}.css'`);
    fs.writeFileSync(newLiquidFullPath, liquidContent, 'utf8');
    runGitCommand(`git add ${newLiquidPath}`);

    // 4. Update JSON templates references
    const templates = fs.readdirSync(TEMPLATES_DIR).filter(f => f.endsWith('.json'));
    for (const template of templates) {
      const templatePath = path.join(TEMPLATES_DIR, template);
      let templateContent = fs.readFileSync(templatePath, 'utf8');
      
      const typeRegex = new RegExp(`"type"\\s*:\\s*"${oldName}"`, 'g');
      if (typeRegex.test(templateContent)) {
        console.log(`  - Updating references in template [${template}]...`);
        templateContent = templateContent.replace(typeRegex, `"type": "${newName}"`);
        fs.writeFileSync(templatePath, templateContent, 'utf8');
        runGitCommand(`git add templates/${template}`);
      }
    }
  }

  console.log('✅ Sanitization complete. All changes have been staged in Git.');
}

sanitize();
