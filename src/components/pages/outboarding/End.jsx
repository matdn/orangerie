import { useNavigate } from 'react-router-dom';

// Libs
import { Trans, useTranslation } from 'react-i18next';
import { ScormService } from '../../../game/episode/services/ScormService';

// Configs
import { useAppState } from '../../../state';
import { AppLoadingManager } from '../../customUI/appLoading/AppLoadingManager';

// Components
import { OnboardingHeader } from '../../utilityUI/singleElements/OnboardingHeader';
import EmeraudeFooter from "../../utilityUI/fixedElements/EmeraudeFooter.jsx";
import React, { useEffect, useState } from 'react';
import PresenceAnimation from "../../layout/presenceAnimation/PresenceAnimation";
import clsx from "clsx";
import { removeSessionStorageRoom } from '../../../utils/room.session-storage';
import { ClassStyleConfig } from '../../../configs/style-config';
import Button from '../../utilityUI/singleElements/Button';
import Spinner from '../../utilityUI/singleElements/spinner/Spinner';
import { isScorm } from '../../../helpers/scorm.helper';

const End = () => {
  const navigate = useNavigate();
  const { gameConfig } = useAppState();
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(false)

  const handleBackMenu = () => {
    removeSessionStorageRoom();
    setLoading(true);
    navigate('/gameboard');
  };

  const handleQuitScorm = async () => {
    setLoading(true);
    removeSessionStorageRoom();
    ScormService.CloseScorm()
    setTimeout(() => window.close());
  };

  useEffect(() => {
    AppLoadingManager.FinishLoading();
  }, [])

  return (
    <PresenceAnimation>
      <div
        className={clsx(
          "fixed inset-0 overflow-auto bg-center bg-cover bg-no-repeat flex flex-col justify-between items-center pb-[2%]",
          ClassStyleConfig.onboarding.bgColor,
        )}
        style={{
          backgroundImage: `url('` + gameConfig.onboardingBgImage?.filename + `')`,
        }}
      >
        <OnboardingHeader title={t('Global.ThanksForPlaying', 'Thanks for playing!')} />
        {/* content */}
        <div className="w-full h-full flex justify-center items-center gap-4">
          {/*<Spinner isLoading={isLoading}>*/}
          {/*  <Button onClick={handleBackMenu}>*/}
          {/*    <Trans i18nKey="Global.ReturnToMenu">Return to Menu</Trans>*/}
          {/*  </Button>*/}
          {/*</Spinner>*/}

          {
            isScorm() && (
              <Button onClick={handleQuitScorm()}>
                <Trans i18nKey="Global.Quit">Quit</Trans>
              </Button>
            )
          }
        </div>

        {/* footer */}
        <EmeraudeFooter />
      </div>
    </PresenceAnimation>
  );
};

export default End;
