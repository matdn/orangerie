import fs from 'fs';
import path from 'path';
const i18nPath = 'public/locales';
const enPath = 'public/locales/en.json';
const paramsPattern = /{{(.*?)}}/g;

function main() {
  console.log('Starting to generate schema from json file');
  const enFile = fs.readFileSync(enPath, 'utf8');
  const data = JSON.parse(enFile);
  console.log('Generating schema ...');
  const schema = _generateSchema(data);
  console.log('Writing schema ...');
  _writeSchema(schema);
  console.log('Finished');
}
const getFilesRecursively = (
  directoryPath: string,
  filesNames: string[]
): string[] => {
  const filesInDirectory = fs.readdirSync(directoryPath);
  for (const file of filesInDirectory) {
    const absolute = path.join(directoryPath, file);
    if (fs.statSync(absolute).isDirectory()) {
      getFilesRecursively(absolute, filesNames);
    } else {
      filesNames.push(absolute);
    }
  }

  return filesNames;
};

function _generateSchema(data) {
  const schema = {};
  const filesNames: string[] = [];

  const filesPath = getFilesRecursively('public/locales', filesNames)
    .map(filePath => filePath.replace('public/locales/', ''))
  ;
  const languages = [];
  let mainLanguage;
  for (const fileName of filesPath) {
    const splittedFiledName = fileName.split('.');
    const name = splittedFiledName[0];
    const extension = splittedFiledName[1];
    if (extension == 'json' && name != 'schema') {
      languages.push(name);
    }
    if (!mainLanguage && name.startsWith('en')) {
      mainLanguage = name;
    }
  }
  schema['supportedLanguages'] = languages;
  schema['activeLanguages'] = languages;
  schema['mainLanguage'] = mainLanguage;

  const content = [];
  Object.entries(data).forEach(([key, value]: [string, string]) => {
    if (key === '__EOF__') {
      return;
    }
    let keySchema: {name: string, variables?: string[]} = {
      name: key,
    };
    const variables = [];
    let match;
    // eslint-disable-next-line no-cond-assign
    while (match = paramsPattern.exec(value)) {
      variables.push(match[1].trim());
    }
    if (variables.length) {
      keySchema = {
        ...keySchema,
        variables,
      };
    }
    content.push(keySchema);
  });
  schema['schema'] = content;

  return schema;
}

function _writeSchema(schemaData) {
  const filePath = path.join(i18nPath, `schema.json`);
  fs.writeFileSync(filePath, JSON.stringify(schemaData, null, 2), {
    encoding: 'utf8',
  });
}

main();
