import fs from 'fs';
import path from 'path';
const i18nDir = 'public/locales';
const schemaFile = 'schema.json';

const readJsonFile = p => JSON.parse(fs.readFileSync(p, { encoding: 'utf8' }));

const schema = readJsonFile(path.join(i18nDir, schemaFile));

const translationKeys = schema.schema.map(v => v.name).filter(v => v !== '__EOF__');

schema.supportedLanguages.forEach((language, index) => {
  console.log(
    `${index + 1}/${schema.supportedLanguages.length}`,
    `processing: ${language}`
  );
  const translationFile = path.join(i18nDir, `${language}.json`);
  const translations = translationKeys.reduce((pv, cv) => {
    pv[cv] = cv;
    return pv;
  }, {});

  try {
    const currentTranslations = readJsonFile(translationFile);
    const currentTranslationKeys = Object.keys(currentTranslations);
    if (translationKeys.length === currentTranslationKeys.length) {
      console.log(
        '--',
        `schemaKeyCount: ${translationKeys.length}, fileKeyCount: ${currentTranslationKeys.length}`
      );
    } else {
      console.warn(
        '--',
        `schemaKeyCount: ${translationKeys.length}, fileKeyCount: ${currentTranslationKeys.length}`
      );
    }
    Object.assign(translations, currentTranslations);
  } catch (error) {
    console.error(error.message);
  }

  const sortedTranslations = Object.keys(translations)
    .filter(key => key.trim().length > 0 && key !== 'undefined' && !key.includes('__EOF__'))
    .sort()
    .reduce((o, key) => ({ ...o, [key]: translations[key] }), {});

  fs.writeFileSync(translationFile, JSON.stringify(sortedTranslations, null, 2), {
    encoding: 'utf8',
  });
  console.log('--', 'write to', translationFile);
});
