import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment } from 'react';
import { Trans } from 'react-i18next';
import { useAppState } from '../../../state';
import { fetchSessionStorageConfig, STYLES } from '../../../utils/app-config.session-storage';

const CustomRotationDialogUI = ({openCustomApp, setOpenCustomApp}) => {
  const { gameConfig } = useAppState();
  const { landscapeRotationDialog } = fetchSessionStorageConfig(STYLES);
  const turnScreenStyles = landscapeRotationDialog?.find(styles => styles.id === 'turnScreen');
  const landscapeStyles = landscapeRotationDialog?.find(styles => styles.id === 'landscape');
  const icon = landscapeRotationDialog?.find(styles => styles.component === 'Image');

  return (
    <Transition.Root show={openCustomApp} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpenCustomApp}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <Dialog.Panel
            className={clsx(
              "fixed inset-0 transform bg-white bg-center bg-cover bg-no-repeat px-4 pb-4 pt-5 transition-all flex flex-col justify-center items-center",
            )}
            style={{
              backgroundImage: `url('` + gameConfig.onboardingBgImage?.filename + `')`,
            }}
          >
            <div className='flex h-full max-h-[80vh] w-full m-10 overflow-y-auto'>
              <div className="flex flex-col flex-1 justify-center items-center w-full  h-fulltext-center uppercase font-[Roboto] text-white">
                <img
                  src={icon?.src?.filename || 'https://a.storyblok.com/f/242060/293x274/c1b987103b/rotate-to-landscape.svg'}
                  style={{
                    width: icon?.width || "auto",
                    height: icon?.height || "15vh",
                  }}
                />

                <div
                  className="mt-[3vh]"
                  style={{
                    fontFamily: turnScreenStyles?.fontFamily || 'Roboto',
                    fontSize: turnScreenStyles?.fontSize || '3vh',
                    color: turnScreenStyles?.textColor || '#344054',
                    lineHeight: turnScreenStyles?.lineHeight || '1',
                    fontWeight: turnScreenStyles?.fontWeight || 'normal',
                  }}
                >
                  <Trans i18nKey={turnScreenStyles?.translationKey || "Global.RotateScreen.Text"}>Turn your screen to</Trans>
                </div>

                <div
                  className="font-semibold text-[4vh]"
                  style={{
                    fontFamily: landscapeStyles?.fontFamily || 'Roboto',
                    fontSize: landscapeStyles?.fontSize || '4vh',
                    color: landscapeStyles?.textColor || '#344054',
                    lineHeight: landscapeStyles?.lineHeight || '1',
                    fontWeight: landscapeStyles?.fontWeight || 'bold',
                  }}
                >
                  <Trans i18nKey={ landscapeStyles?.translationKey || "Global.RotateScreen.Landscape" }>Landscape mode</Trans>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}

export default CustomRotationDialogUI;
