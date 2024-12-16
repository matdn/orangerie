import { useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { UtilImage } from './UtilImage';

export function Select({ selectItem, options, iconPath, defaultOption }) {
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const { t } = useTranslation();

  const getFlagIcon = (code: string) => {
    let icon = options[0].icon;
    if (!code) {
      return `${iconPath}/${icon}`;
    }

    icon = options.find(lang => lang.code === code)?.icon;

    if (!icon) {
      return `${iconPath}/${icon}`;
    }

    return `${iconPath}/${icon}`;
  }

  return (
    <Listbox value={ selectedOption } onChange={ (value) => {
      setSelectedOption(value);
      selectItem(value);
    } } name="select language">
      { ({ open }) => (
        <div className="relative w-full">
          <ListboxButton
            className={clsx(
              "w-full border-2 border-black rounded-full bg-white px-[3vh] py-[2vh]",
              "transition-all duration-300 hover:shadow-[0_1px_4px_0px_rgba(0,0,0,0.5)]"
            )}
          >
            <div className="flex items-center gap-4">
              <UtilImage src={getFlagIcon(selectedOption.code)} className="rounded-full h-[3vh]" />
              <span className="truncate text-[2.5vh] leading-[1.2]">
                { selectedOption.code ? selectedOption.name : t(selectedOption.name) }
              </span>
            </div>

            <span className="pointer-events-none absolute inset-y-0 right-[3vh] flex items-center">
              <UtilImage src="/assets/on-out/icons/common/chevron-up.svg" className={ clsx("h-[3vh] w-[3vh] transition-all duration-300", !open && "rotate-180") } />
            </span>
          </ListboxButton>

          <ListboxOptions
            anchor="bottom"
            className= "absolute z-[1000] text-[#344054] bg-white rounded-[3vh] mt-1 border-2 border-black overflow-hidden"
            style={ { width: 'var(--button-width)' } }
          >
            <div className="max-h-[30vh] w-full overflow-y-auto overflow-x-hidden">
              { options.map((element, index) => (
                <ListboxOption
                  key={ element.code || element.name }
                  className={ () =>
                    clsx(
                      "flex justify-between items-center gap-[1vh] cursor-pointer select-none py-[2vh] pl-[3vh]",
                      "hover:bg-[#344054] hover:text-white transition-all duration-300 text-[2.5vh] leading-[1.2]",
                      element.code === selectedOption.code ? "bg-[#344054] text-white" : "bg-white",
                      index < options.length - 1 && "border-b"
                    )
                  }
                  value={ element }
                >
                  { ({ selected }) => (
                    <>
                      <div className="flex justify-start items-center gap-4">
                        <UtilImage src={getFlagIcon(element.code)} className="rounded-full h-[3vh]" />

                        <span
                          className={ clsx(selected ? 'font-bold' : 'font-normal', 'block truncate text-left text-[2.5vh] leading-[1.2]') }>
                        { index === 0 ? t(element.name) : element.name }
                      </span>
                      </div>

                      <span className={ clsx('flex items-center pr-2', selected ? 'opacity-100' : 'opacity-0') }>
                        <UtilImage src="/assets/on-out/icons/common/check.svg" className="h-[3vh]" />
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
