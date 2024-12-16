import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import React, {useEffect, useState} from 'react';
import clsx from 'clsx';

// Libs

// Icons
import { CheckIcon } from '@heroicons/react/20/solid';
import { useTranslation } from 'react-i18next';
import SVG from 'react-inlinesvg';
import { AssetsUtils } from '../../../game/core/utils/AssetsUtils.ts';

// Config

export default function CustomSelectLanguageUI({list: data, name = '', defaultItem, selectItem }) {
  const [selected, setSelected] = useState(data[0]);
  const { t } = useTranslation();

  useEffect(() => {
    if (!defaultItem) {
      return;
    }

    setSelected(defaultItem);
  }, [ defaultItem ])

  return (
    <Listbox value={ selected } onChange={ (value) => {
      selectItem(value);
      setSelected(value);
    } } name={ name }>
      { ({ open }) => (
        <div className="relative w-full">
          <ListboxButton className="containerButton uppercase py-[2vh] w-full">
            <div className="flex items-center">
                <span className="truncate">
                  { selected.code ? selected.name : t(selected.name) }
                </span>
            </div>
            <span className="pointer-events-none absolute inset-y-0 right-[1vh] flex items-center">
              <SVG
                src={ AssetsUtils.GetAssetURL('images/onboarding/chevron-down.svg') }
                className={ clsx("h-[3vh] w-[3vh]", open && "rotate-180") }
                aria-hidden="true"
              />
              </span>
          </ListboxButton>

          <ListboxOptions
            anchor="bottom"
            className="absolute z-[1000] text-black bg-[#D3B38E] rounded-[3vh] mt-1 py-[2vh] pl-[1vh] pr-[1vh] border border-white/15"
            style={ { width: 'var(--button-width)' } }
          >
            <div className="max-h-[30vh] w-full overflow-y-auto overflow-x-hidden">
              { data.map((element, index) => (
                <ListboxOption
                  key={ element.code || element.name }
                  className={ () =>
                    clsx(
                      "flex justify-between items-center gap-[1vh] cursor-pointer select-none py-[1vh] hover:scale-[102%]",
                      "duration-300 pl-[1vh]",
                    )
                  }
                  value={ element }
                >
                  { ({ selected }) => (
                    <>
                        <span
                          className={ clsx(
                            selected ? 'font-bold' : 'font-normal',
                            'block truncate text-left text-[2.5vh] leading-[1.2]',
                          ) }
                        >
                          { index === 0 ? t(element.name) : element.name }
                        </span>

                      <span className={ clsx("flex items-center pr-[1vw]", selected ? "opacity-100" : "opacity-0") }>
                          <CheckIcon className="h-[3vh] w-[3vh] font-bold text-black" aria-hidden="true" />
                        </span>
                    </>
                  ) }
                </ListboxOption>
              )) }
            </div>
          </ListboxOptions>
        </div>
      ) }
    </Listbox>
  );
}
