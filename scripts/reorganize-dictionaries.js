const fs = require('fs');
const path = require('path');

const DICT_DIR = path.join(__dirname, '..', 'dictionaries');
const NEW_DICT_DIR = path.join(__dirname, '..', 'dictionaries-new');

console.log('Dictionary directory:', DICT_DIR);
console.log('New dictionary directory:', NEW_DICT_DIR);

// Create new dictionaries directory
if (!fs.existsSync(NEW_DICT_DIR)) {
  console.log('Creating new dictionary directory...');
  fs.mkdirSync(NEW_DICT_DIR);
}

function parseTsFile(filePath) {
  console.log(`Parsing file: ${filePath}`);
  const content = fs.readFileSync(filePath, 'utf8');
  try {
    // Extract the object literal between the curly braces
    const match = content.match(/const\s+\w+\s*=\s*({[\s\S]*})\s*as\s+const\s*;/);
    if (!match) {
      throw new Error('Could not find dictionary object in file');
    }
    console.log('Found dictionary object');
    const objectLiteral = match[1];
    
    // Evaluate the object literal
    const dict = eval('(' + objectLiteral + ')');
    console.log('Successfully parsed dictionary with keys:', Object.keys(dict));
    return dict;
  } catch (e) {
    console.error(`Error parsing ${filePath}: ${e.message}`);
    console.error('File content:', content.slice(0, 200) + '...');
    return null;
  }
}

// Get all dictionary files
const dictFiles = fs.readdirSync(DICT_DIR)
  .filter(file => file.endsWith('.ts'))
  .map(file => file.replace('.ts', ''));

console.log('Found dictionary files:', dictFiles);

dictFiles.forEach(lang => {
  console.log(`\nProcessing language: ${lang}`);
  
  // Create language directory
  const langDir = path.join(NEW_DICT_DIR, lang);
  if (!fs.existsSync(langDir)) {
    console.log(`Creating directory for ${lang}...`);
    fs.mkdirSync(langDir);
  }

  // Parse dictionary
  const dict = parseTsFile(path.join(DICT_DIR, `${lang}.ts`));
  if (!dict) {
    console.error(`Skipping ${lang} due to parsing error`);
    return;
  }

  // Extract top-level keys
  const topLevelKeys = Object.keys(dict);
  console.log(`Found top-level keys for ${lang}:`, topLevelKeys);

  // Process each top-level key
  topLevelKeys.forEach(key => {
    console.log(`Creating file for key: ${key}`);
    const content = `const ${key} = ${JSON.stringify(dict[key], null, 2)} as const;

export default ${key};`;

    const filePath = path.join(langDir, `${key}.ts`);
    fs.writeFileSync(filePath, content);
    console.log(`Created ${filePath}`);
  });

  // Create page-specific dictionaries using home as template
  const pageTypes = ['word', 'powerpoint', 'excel', 'pdf'];
  console.log(`Creating page-specific dictionaries for ${lang}...`);
  const homeDict = dict.home;

  pageTypes.forEach(pageType => {
    console.log(`Creating ${pageType} dictionary...`);
    const pageDict = {
      ...homeDict,
      title: dict.tools?.[pageType] || `${pageType.charAt(0).toUpperCase() + pageType.slice(1)} Image Extractor`,
      subtitle: `Free Online Tool to Extract Images from ${pageType.charAt(0).toUpperCase() + pageType.slice(1)} Documents`,
      description: `Extract images from ${pageType.toUpperCase()} files instantly. 100% free, secure, and works directly in your browser!`,
    };

    const content = `const ${pageType} = ${JSON.stringify(pageDict, null, 2)} as const;

export default ${pageType};`;

    const filePath = path.join(langDir, `${pageType}.ts`);
    fs.writeFileSync(filePath, content);
    console.log(`Created ${filePath}`);
  });

  // Create index.ts
  console.log(`Creating index.ts for ${lang}...`);
  const allKeys = [...topLevelKeys, ...pageTypes];
  const importStatements = allKeys
    .map(key => `import ${key} from './${key}'`)
    .join('\n');

  const exportContent = `${importStatements}

const dictionary = {
  ${allKeys.join(',\n  ')}
} as const;

export default dictionary;`;

  const indexPath = path.join(langDir, 'index.ts');
  fs.writeFileSync(indexPath, exportContent);
  console.log(`Created ${indexPath}`);
});

// Create root index.ts
console.log('\nCreating root index.ts...');
const langImports = dictFiles
  .map(lang => `import ${lang} from './${lang}'`)
  .join('\n');

const rootIndexContent = `${langImports}

export const dictionaries = {
  ${dictFiles.join(',\n  ')}
} as const;

export type Lang = keyof typeof dictionaries;
export type Dictionary = typeof dictionaries[Lang];

export default dictionaries;`;

const rootIndexPath = path.join(NEW_DICT_DIR, 'index.ts');
fs.writeFileSync(rootIndexPath, rootIndexContent);
console.log(`Created ${rootIndexPath}`);

console.log('\nDone!');
