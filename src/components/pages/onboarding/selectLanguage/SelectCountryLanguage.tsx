import i18next from 'i18next';
import { TextsProxy } from 'peppermill';
import { useEffect, useRef } from 'react';
import { Countries } from '../../../../configs/countries';
import { Languages } from '../../../../configs/languages';
import { getDefaultLanguage, getSupportedLanguages, updateLocalLanguage } from '../../../../utils/language-local.util';
import { Select } from '../../../utilityUI/singleElements/Select';

interface SelectProps {
  name: string;
  code: string;
  icon?: string;
}

export function SelectCountryLanguage({setValid}) {
  const schemaLanguages = getSupportedLanguages();
  const languages = Languages.filter(language => !language.code || schemaLanguages.includes(language.code));
  const languageRef = useRef<SelectProps>(getDefaultLanguage());
  const countryRef = useRef<SelectProps>(Countries[0]);

  const onSelectLanguage = async (language: SelectProps) => {
    languageRef.current = language;
    setValid(!!languageRef.current?.code && !!countryRef.current?.code);
    if (!language.code) {
      return;
    }
    updateLocalLanguage(language.code);
    await i18next.changeLanguage(language.code);
    TextsProxy.Init();
  }

  const onSelectCountry = (country: SelectProps) => {
    countryRef.current = country;
    setValid(!!languageRef.current?.code && !!countryRef.current?.code);
  }

  useEffect(() => {
    if (!languageRef.current?.code || !localStorage.getItem('i18nextLng')) {
      return;
    }
    onSelectLanguage(languageRef.current);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-[4vh] w-[350px] lg:w-[450px] max-w-[70vw]">
      <Select
        selectItem={ onSelectLanguage }
        options={languages}
        iconPath="assets/on-out/icons/flags/languages"
        defaultOption={languageRef.current}
      />

      <Select
        selectItem={ onSelectCountry }
        options={Countries}
        iconPath="assets/on-out/icons/flags/countries"
        defaultOption={countryRef.current}
      />
    </div>
  )
}
