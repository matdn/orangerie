import fs from 'fs';
import { glob } from 'glob';

const boilerplateI18nDir = 'public/locales';
const projectI18nDir = 'public/locales-project';

const readJsonFile = (filePath: string) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }));
  } catch (e) {
    return {};
  }
};

const mergeTranslations = (filePath: string, boilerplateFilePath: string): object => {
  const gameTranslations = readJsonFile(filePath);
  const boilerplateTranslations = readJsonFile(boilerplateFilePath);
  const translations = {
    ...boilerplateTranslations,
    ...gameTranslations,
  }

  return Object.keys(translations).sort().reduce((o, key) => ({...o, [key]: translations[key]}), {});
}

const writeTranslations = (boilerplateFilePath: string, gameTranslationFilePath: string) => {
  fs.writeFileSync(boilerplateFilePath, JSON.stringify(mergeTranslations(gameTranslationFilePath, boilerplateFilePath), null, 2));
}

const getDirectories = (src: string) => {
  glob(`${src}/**/*.json`).then((paths) => {
    paths.filter(projectTranslationFilePath =>
      projectTranslationFilePath.endsWith('.json') && !projectTranslationFilePath.includes('schema') && !projectTranslationFilePath.includes('audio')
    ).forEach(projectTranslationFilePath => {
      const boilerplateTranslationsFilePath = projectTranslationFilePath.replace(projectI18nDir, boilerplateI18nDir);
      writeTranslations(boilerplateTranslationsFilePath, projectTranslationFilePath);
    });
  });
};

getDirectories(projectI18nDir);
