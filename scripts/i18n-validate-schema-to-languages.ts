import fs from 'fs';
import path from 'path';

const i18nPath = 'public/locales';
const schemaPath = 'public/locales/schema.json';
const errors = [];

function _validateLanguageKeyFromSchema(schema, language, languageData) {
  schema.forEach(translation => {
    // For each key of the schema, check if it exists in the json in parameter.

    // add key and value = key if translation in schema does not exist in language Json file
    if (!languageData[translation.name]) {
      errors.push(`Missing  key ${translation.name} in ${language}.json`);
    }

    const variablePattern = /{{(.*?)}}/g;
    const patterns = [];
    let match;
    // tslint:disable-next-line:no-conditional-assignment
    while ((match = variablePattern.exec(languageData[translation.name]))) {
      patterns.push(match[1]); // match[1] hold the value from the exec regex
    }

    if (patterns.length) {
      patterns.forEach(pattern => {
        if (
          !translation.variables ||
          !translation.variables.find(
            variable => variable.trim() === pattern.trim()
          )
        ) {
          // Throw error if the variable in the translation not existed in the schema
          errors.push(
            `Variable for ${pattern} from ${language}.json at key ${translation.name} not defined in schema`
          );
        }
      });
      // Skip case checking missing variables for now
      // translation.variables.forEach(variable => {
      // if (languageData[translation.name] !== translation.name && !languageData[translation.name].includes(variable)) {
      //     throw new Error(`Param missing from ${language}.json at key ${translation.name}`);
      // }
      // });
    }
  });

  return languageData;
}

function _validateSchema(schemaData) {
  const data = [];
  schemaData.supportedLanguages.forEach(language => {
    // For each language defined in schema, validate corresponding json.
    let json;
    try {
      json = fs.readFileSync(path.join(i18nPath, `${language}.json`), 'utf8');
    } catch (e) {
      json = '{}';
      console.log(`New language generated: ${language}`);
    }
    const languageData = JSON.parse(json);
    const validatedLanguageData = _validateLanguageKeyFromSchema(
      schemaData.schema,
      language,
      languageData
    );
    data.push({
      language,
      validatedLanguageData,
    });
  });
  return data;
}

function _validateJsonFiles(schemaData, validatedSchema) {
  JSON.parse(JSON.stringify(validatedSchema)).forEach(
    (validatedLanguageSchema) => {
      // Foe each JSON, validate if the key are correct against schema
      Object.keys(validatedLanguageSchema.validatedLanguageData).forEach(
        key => {
          if (!schemaData.find(data => data.name === key)) {
            errors.push(
              `Key ${key} is not in schema. Pls update translation schema.`
            );
          }
        }
      );
    }
  );
}

function main() {
  try {
    console.log('Starting to validate json files from the schema');
    const schemaFile = fs.readFileSync(schemaPath, 'utf8');
    const data = JSON.parse(schemaFile);
    console.log('Validating schema ...');
    const validatedSchema = _validateSchema(data);
    console.log('Validating Json files ...');
    _validateJsonFiles(data.schema, validatedSchema);
    if (errors.length > 0) {
      console.log('Errors found:');
      console.log([...new Set(errors)]);
      process.exit(1);
    }
    console.log('Finished');
  } catch (error) {
    console.error(error);
  }
}

main();
