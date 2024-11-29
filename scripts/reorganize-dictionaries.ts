import * as fs from 'fs'
import * as path from 'path'

const DICT_DIR = path.join(__dirname, '..', 'dictionaries')
const NEW_DICT_DIR = path.join(__dirname, '..', 'dictionaries-new')

// Create new dictionaries directory
if (!fs.existsSync(NEW_DICT_DIR)) {
  fs.mkdirSync(NEW_DICT_DIR)
}

// Get all dictionary files
const dictFiles = fs.readdirSync(DICT_DIR)
  .filter(file => file.endsWith('.ts'))
  .map(file => file.replace('.ts', ''))

dictFiles.forEach(lang => {
  // Create language directory
  const langDir = path.join(NEW_DICT_DIR, lang)
  if (!fs.existsSync(langDir)) {
    fs.mkdirSync(langDir)
  }

  // Import dictionary
  const dict = require(path.join(DICT_DIR, `${lang}.ts`)).default

  // Extract top-level keys
  const topLevelKeys = Object.keys(dict)

  // Process each top-level key
  topLevelKeys.forEach(key => {
    const content = `const ${key} = ${JSON.stringify(dict[key], null, 2)} as const;

export default ${key};`

    fs.writeFileSync(
      path.join(langDir, `${key}.ts`),
      content
    )
  })

  // Create page-specific dictionaries using home as template
  const pageTypes = ['word', 'powerpoint', 'excel', 'pdf']
  const homeDict = dict.home

  pageTypes.forEach(pageType => {
    const pageDict = {
      ...homeDict,
      title: dict.tools?.[pageType] || `${pageType.charAt(0).toUpperCase() + pageType.slice(1)} Image Extractor`,
      subtitle: `Free Online Tool to Extract Images from ${pageType.charAt(0).toUpperCase() + pageType.slice(1)} Documents`,
      description: `Extract images from ${pageType.toUpperCase()} files instantly. 100% free, secure, and works directly in your browser!`,
    }

    const content = `const ${pageType} = ${JSON.stringify(pageDict, null, 2)} as const;

export default ${pageType};`

    fs.writeFileSync(
      path.join(langDir, `${pageType}.ts`),
      content
    )
  })

  // Create index.ts
  const allKeys = [...topLevelKeys, ...pageTypes]
  const importStatements = allKeys
    .map(key => `import ${key} from './${key}'`)
    .join('\n')

  const exportContent = `${importStatements}

const dictionary = {
  ${allKeys.join(',\n  ')}
} as const;

export default dictionary;`

  fs.writeFileSync(
    path.join(langDir, 'index.ts'),
    exportContent
  )
})

// Create root index.ts
const langImports = dictFiles
  .map(lang => `import ${lang} from './${lang}'`)
  .join('\n')

const rootIndexContent = `${langImports}

export const dictionaries = {
  ${dictFiles.join(',\n  ')}
} as const;

export type Lang = keyof typeof dictionaries;
export type Dictionary = typeof dictionaries[Lang];

export default dictionaries;`

fs.writeFileSync(
  path.join(NEW_DICT_DIR, 'index.ts'),
  rootIndexContent
)
