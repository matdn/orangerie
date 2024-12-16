import { useEffect } from 'react';
import { redirect } from 'react-router-dom';
import { APP_ROUTES } from '../../constants/common.constant';
import { EpisodesCommand } from '../../game/episode/commands/EpisodesCommand';
import { RoomManager } from '../../game/episode/managers/RoomManager';
import { UserManager } from '../../game/episode/managers/UserManager';
import { RoomUserStatus } from '../../game/episode/models/User';
import { EpisodesProxy } from '../../game/episode/proxies/EpisodesProxy';
import { ProgressionProxy } from '../../game/episode/proxies/ProgressionProxy';
import GameReact from '../../game/GameReact';
import { isPreparation } from '../../helpers/common.helpers';
import { AppLoadingManager } from '../customUI/appLoading/AppLoadingManager';
import PresenceAnimation from "../layout/presenceAnimation/PresenceAnimation";

const Gameboard = () => {
  useEffect(() => {
    AppLoadingManager.FinishLoading();
  }, [])

  return (
    <PresenceAnimation>
      <div className="fixed inset-0">
        <GameReact />
      </div>
    </PresenceAnimation>
  );
};

export async function loader() {
  EpisodesCommand.InitEpisodes();

  if (isPreparation()) {
    return null;
  }

  ProgressionProxy.ClearProgressions();
  EpisodesProxy.ClearEpisodes();

  await UserManager.Init();

  if (!UserManager.CurrentUser) {
    return redirect(APP_ROUTES.START);
  }

  await RoomManager.Init(UserManager.CurrentUser.roomId, true);

  if (RoomManager.CurrentRoom?.currentUser?.status !== RoomUserStatus.PLAYING) {
    return redirect(APP_ROUTES.START);
  }

  RoomManager.ResetRoomProgression();
  EpisodesProxy.SetEpisodeProgress();

  return null;
}

export default Gameboard;
