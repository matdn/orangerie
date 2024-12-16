import { readFileSync } from 'fs';
import fs from 'fs';
import { glob } from 'glob';

const schemaFile = 'public/locales/schema.json';
const enFile = 'public/locales/fr.json';
const readJsonFile = p => JSON.parse(readFileSync(p, { encoding: 'utf8' }));
const schema = readJsonFile(schemaFile);
const enTranslations = Object.keys(readJsonFile(enFile));

const translationKeys = schema.schema.map(v => v.name);
const appliedKeys = new Set<string>();
const missingSchemaKey = [];

const validateEnTranslations = () => {
  if (enTranslations.length !== translationKeys.length) {
    console.log('fr translation no.keys', enTranslations.length);
    console.log('schema no. keys', translationKeys.length);
  }

  enTranslations.forEach(translation => {
    if (!translationKeys.includes(translation)) {
      missingSchemaKey.push(translation);
    }
  });

  if (missingSchemaKey.length) {
    console.log('missingSchemaKey: ', missingSchemaKey);
  }
};

const validateFile = (filePath: string) => {
  const data = fs.readFileSync(filePath, 'utf-8');

  translationKeys.forEach(key => {
    if (data.includes(key)) {
      appliedKeys.add(key);
    }
  });
};

const validateTranslationKeys = () => {
  translationKeys.forEach(key => {
    if (!appliedKeys.has(key)) {
      console.log('not used key: ', key);
    }
  });
};

const getDirectories = (src: string) => {
  glob(`${src}/**/*`).then((paths) => {
    paths.forEach(filePath => {
      if (filePath.includes('.html') || filePath.includes('.ts')) {
        validateFile(filePath);
      }
    });

    validateTranslationKeys();
  });
};

getDirectories('./src');

validateEnTranslations();
