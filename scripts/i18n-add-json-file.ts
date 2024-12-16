import fs from 'fs';
import path from 'path';

const i18nPath = 'public/locales';

async function main() {
  console.log('Starting to generate missing json files from schema definition');
  const schemaFilePath = path.join(i18nPath, `schema.json`);
  const schemaContent = fs.readFileSync(schemaFilePath, 'utf8');
  const schemaData = JSON.parse(schemaContent);

  const keys = schemaData['schema'];
  const content = {};
  for (const key of keys) {
    content[key.name] = '';
  }

  const supportedLanguages = schemaData['supportedLanguages'];
  for (const supportedLanguage of supportedLanguages) {
    const languageFilePath = i18nPath + '/' + supportedLanguage + '.json';
    if (!fs.existsSync(languageFilePath)) {
      console.log('Generating json file ', languageFilePath);
      fs.writeFileSync(languageFilePath, JSON.stringify(content, null, 2), {
        encoding: 'utf8',
      });
    }
  }
  console.log('Finished');
}

main();
