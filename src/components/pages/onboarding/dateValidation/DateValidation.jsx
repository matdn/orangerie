import { clsx } from 'clsx';
import React, { useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../../../constants/common.constant';
import ButtonBase from '../../../../game/core/_engine/reacts/views/buttons/bases/ButtonBase';
import { EpisodesCommand } from '../../../../game/episode/commands/EpisodesCommand';
import { OnboardingManager } from '../../../../game/episode/managers/OnboardingManager';
import { RoomManager } from '../../../../game/episode/managers/RoomManager';
import { UserManager } from '../../../../game/episode/managers/UserManager';
import { RoomUserStatus } from '../../../../game/episode/models/User';
import { EpisodesProxy } from '../../../../game/episode/proxies/EpisodesProxy';
import { setAuthenticated } from '../../../../helpers/common.helpers';
import { fetchGameConfigData } from '../../../../helpers/gameConfig.helpers';
import { AppLoadingManager } from '../../../customUI/appLoading/AppLoadingManager';
import PresenceAnimation from '../../../layout/presenceAnimation/PresenceAnimation';

const BlockedByDate = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AppLoadingManager.FinishLoading();
  }, [])

  const onSelectGame = async () => {
    if (!UserManager.CurrentUser) {
      await UserManager.SignUp();
    }

    if (!UserManager.CurrentUser.episode) {
      await UserManager.UpdateEpisode(EpisodesProxy.FirstEpisode.name);
    }

    await RoomManager.CreateRoomSingle(EpisodesProxy.FirstEpisode.name);

    setAuthenticated(true);

    navigate(APP_ROUTES.GAME_BOARD);
  }

  const onSelectClassroom = () => {
    setAuthenticated(true);
    navigate(APP_ROUTES.CLASSROOM)
  }

  return (
    <PresenceAnimation>
      <div
        className={clsx(
          "fixed top-0 left-0 w-[100vw] h-[100dvh] bg-center bg-cover bg-no-repeat",
          "flex flex-col justify-center py-[4vh] items-center gap-[6vh]"
        )}
      >
        <ButtonBase
          className="button primary"
          onClick={onSelectGame}
        > GAME </ButtonBase>

        <ButtonBase
          className="button"
          onClick={onSelectClassroom}
        > CLASSROOM </ButtonBase>
      </div>
    </PresenceAnimation>
  );
};

export async function loader() {
  await fetchGameConfigData();
  EpisodesCommand.InitEpisodes();

  OnboardingManager.SaveQueryParamsSettings();

  await UserManager.Init();

  if (!UserManager.CurrentUser) {
    return null;
  }

  if (UserManager.CurrentUser?.roomId) {
    await RoomManager.Init(UserManager.CurrentUser.roomId);
  }

  if (RoomManager.CurrentRoom?.status === RoomUserStatus.PLAYING) {
    return redirect(APP_ROUTES.GAME_BOARD);
  }

  return null;
}

export default BlockedByDate;
