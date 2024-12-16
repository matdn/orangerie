import React, {useEffect, useState} from "react";
import { callApiGet } from '../../../helpers/api.helpers.ts';
import { useTranslation } from 'react-i18next';
import Button from '../../utilityUI/singleElements/Button.jsx';
import EmeraudeFooter from '../../utilityUI/fixedElements/EmeraudeFooter.jsx';
import { useAppState } from '../../../state';
import clsx from "clsx";
import { AssetsUtils } from '../../../game/core/utils/AssetsUtils';
import PresenceAnimation from '../../layout/presenceAnimation/PresenceAnimation';

const GIT_REVISION_KEY = 'GIT_REVISION';

export default function OutdatedVersion() {
  const { gameConfig, setIsOutdatedVersionPopupOpened } = useAppState();
  const [gitRevision, setGitRevision] = useState(sessionStorage.getItem(GIT_REVISION_KEY));
  const [ isOutdatedVersion, setIsOutdatedVersion ] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    let intervalVersionCheck = setInterval(async () => {
      const apiUrl = `jsons/version-info.json?t=${new Date().getTime()}`;
      const {data} = await callApiGet(apiUrl, {skipToken: true});
      if (!data) {
        return;
      }
      sessionStorage.setItem(GIT_REVISION_KEY, data.gitRevision);
      if (!!gitRevision && !!data.gitRevision && gitRevision !== data.gitRevision && !gameConfig.gameSkipVersionCheck) {
        setIsOutdatedVersion(true);
        setIsOutdatedVersionPopupOpened(true);
        clearInterval(intervalVersionCheck);
        intervalVersionCheck = null;
      }
      setGitRevision(data.gitRevision);
    }, 15000);

    return () => {
      if (intervalVersionCheck) {
        clearInterval(intervalVersionCheck);
      }
    };
  }, []);

  return (
    <>
      {
        isOutdatedVersion && (
          <PresenceAnimation>
            <div
              className={clsx(
                'fixed inset-0 z-[1000] w-full h-screen overflow-y-auto-auto bg-center bg-cover bg-no-repeat flex flex-col justify-between pt-[10vh] pb-[2vh] items-center overflow-y-auto font-[Roboto]',
              )} style={{ backgroundImage: `url('${AssetsUtils.GetAssetURL('images/onboarding/bg.png')}')` }}
            >
              <span className="uppercase whitespace-pre-line text-[10vh] leading-[1.2] font-bold font-['Archivo Narrow']">
                {gameConfig.gameTitle}
              </span>

              <div
                className="font-boldtext-[4vh] leading-[1.2] text-center w-[90vw] xl:w-[60vw]"
                dangerouslySetInnerHTML={{ __html: t('Global.Version.Description') }}
              ></div>

              <div className="flex flex-col gap-[15vh] items-center">
                <Button onClick={() => window.location.reload()}>
                  <span className="uppercase font-semibold !text-[4vh] leading-none">
                    {t('Experience.Buttons.Continue')}
                  </span>
                </Button>

                <EmeraudeFooter />
              </div>
            </div>
          </PresenceAnimation>
        )
      }
    </>
  )
}
