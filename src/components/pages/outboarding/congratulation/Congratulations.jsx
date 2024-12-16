import { useEffect, useState } from 'react';

// Config
import { useAppState } from '../../../../state';

// Lib
import { Trans, useTranslation } from 'react-i18next';
import { AppLoadingManager } from '../../../customUI/appLoading/AppLoadingManager';

import PresenceAnimation from "../../../layout/presenceAnimation/PresenceAnimation";
import clsx from "clsx";
import {getRoomById} from "../../../../utils/room.api";
import {fetchSessionStorageRoom} from "../../../../utils/room.session-storage";

import EmeraudeFooter from "../../../utilityUI/fixedElements/EmeraudeFooter";
import Button from '../../../utilityUI/singleElements/Button';
import { redirect, useNavigate } from 'react-router-dom';
import { ClassStyleConfig } from '../../../../configs/style-config';
import OnboardingHeader from '../../../utilityUI/singleElements/OnboardingHeader';
import { fetchSessionStorageConfig } from '../../../../utils/app-config.session-storage';

const Congratulations = () => {
  const {t} = useTranslation();
  const { gameConfig } = useAppState();
  const [totalPoints, setTotalPoints] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    AppLoadingManager.FinishLoading();
  }, [])

  const fetchRoom = async () => {
    const {data} = await getRoomById(fetchSessionStorageRoom()._id);
    if (!data) {
      return;
    }
    setTotalPoints(data.users[0].totalPoints)
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  return (
    <PresenceAnimation>
      <div className="fixed inset-0 overflow-auto flex justify-center items-center">
        <div id="outboarding" className="w-full h-full z-10">
          {/* background image */}
          <div
            className={clsx(
              "w-full h-full overflow-auto bg-center bg-cover bg-no-repeat flex flex-col justify-between pb-[2%] items-center overflow-y-auto",
              ClassStyleConfig.onboarding.bgColor,
              )}
            style={{backgroundImage: `url('` + gameConfig.onboardingBgImage?.filename + `')`}}
          >
            <OnboardingHeader
              title={t('Global.Congratulations', 'Congratulations!')}
              paragraph={t(
                'Global.CongratulationsSubtitle',
                'You have finished this episode successfully!',
              )}
            />

            {/* content */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col justify-center items-center">
                <div className={ clsx("mb-4", gameConfig.theme === 'dark' ? 'text-white' : 'text-black') }>
                  <h3 className="m-0">
                    <Trans i18nKey={ gameConfig.scoreLabel || "Global.YourScore" }>Your score</Trans>
                  </h3>
                  <p className="font-bold text-2xl">
                    { totalPoints } <Trans i18nKey="Global.Points">points</Trans>
                  </p>
                </div>
              </div>

              <div className="flex justify-center items-center gap-8">
                <Button
                  onClick={() => navigate(`/rating-comment`)}
                  className="onboarding">
                  <Trans i18nKey="Global.Continue">Continue</Trans>
                </Button>
              </div>
            </div>

            {/* footer */}
            <EmeraudeFooter />
          </div>
        </div>
      </div>
    </PresenceAnimation>
  );
};

export async function loader() {
  const gameConfig = fetchSessionStorageConfig();
  if (!gameConfig) {
    return redirect('/start');
  }

  if (gameConfig.useOfflineMode) {
    return redirect('/end');
  }

  return null;
}

export async function action() {
  return null;
}

export default Congratulations;
