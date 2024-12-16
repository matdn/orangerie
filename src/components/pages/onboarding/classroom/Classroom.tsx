import { RoomManager } from '../../../../game/episode/managers/RoomManager';
import { EpisodesProxy } from '../../../../game/episode/proxies/EpisodesProxy';
import { AppLoadingManager } from '../../../customUI/appLoading/AppLoadingManager';
import PresenceAnimation from '../../../layout/presenceAnimation/PresenceAnimation';
import { clsx } from 'clsx';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { APP_ROUTES, GAME_PREPARATION } from '../../../../constants/common.constant';
import { useNavigate } from 'react-router-dom';
import EmeraudeFooter from '../../../utilityUI/fixedElements/EmeraudeFooter';
import { UserManager } from '../../../../game/episode/managers/UserManager';
import { setAuthenticated } from '../../../../helpers/common.helpers';
import Spinner from '../../../utilityUI/singleElements/spinner/Spinner';
import { SelectCountryLanguage } from '../selectLanguage/SelectCountryLanguage';
import { ClassroomModes } from './ClassroomModes';

export function Classroom() {
  const {t} = useTranslation();
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(1);
  const [isPreparation, setIsPreparation] = useState<boolean>(null);
  const [isValid, setValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const signUpUser = async () => {
    await UserManager.Init();
    if (!UserManager.CurrentUser) {
      await UserManager.SignUp();
    }
  }

  const onLanguageSelected = () => {
    setStep(2);
  }

  const onSelectMode = async () => {
    sessionStorage.setItem(GAME_PREPARATION, `${isPreparation}`);
    setLoading(true);
    if (!isPreparation) {
      await signUpUser();
      await RoomManager.CreateClassroom(EpisodesProxy.FirstEpisode.name);
    }
    setAuthenticated(true);
    navigate(APP_ROUTES.GAME_BOARD);
  }

  useEffect(() => {
    AppLoadingManager.FinishLoading();
  }, []);

  return (
    <PresenceAnimation>
      <div
        className={clsx(
          "fixed top-0 left-0 w-[100vw] h-[100dvh] bg-center bg-cover bg-no-repeat",
          "flex flex-col justify-between py-[4vh] items-center gap-[6vh]"
        )}
        // style={ { backgroundImage: `url('${ AssetsUtils.GetAssetURL("images/common/home-bg.png") }')` } }
      >
        <div />

        <div className="text-center uppercase font-bold text-[8vh] leading-none">
          { t('Global.Onboarding.Title') }
        </div>

        <div className={ clsx(
          "transition-all duration-500 w-[90vw] sm:w-[400px] 2xl:w-[600px] flex justify-center",
          step === 2 ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
        ) }>
          <SelectCountryLanguage setValid={setValid} />
        </div>

        <div className={ clsx("transition-all duration-500", step === 1 ? "opacity-0 h-0 overflow-hidden" : "opacity-100") }>
          <ClassroomModes isPreparation={ isPreparation } setIsPreparation={ setIsPreparation } />
        </div>

        <div className="flex flex-col items-center justify-center gap-[5vh]">
          <button
            type="button"
            disabled={ !isValid || (step === 2 && isPreparation === null) }
            className={ clsx("button", (!isValid || (step === 2 && isPreparation === null)) && "opacity-50 pointer-events-none") }
            onClick={ step === 1 ? onLanguageSelected : onSelectMode }
          >
            <Spinner isLoading={ loading }>
              <span>{ t('Global.Continue', 'Continue') } {isValid}</span>
            </Spinner>
          </button>

          <EmeraudeFooter />
        </div>
      </div>
    </PresenceAnimation>
  )
}
