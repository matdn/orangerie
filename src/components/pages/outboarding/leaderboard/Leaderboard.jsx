import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Configs
import { useAppState } from '../../../../state';
import { AppLoadingManager } from '../../../customUI/appLoading/AppLoadingManager';

import PresenceAnimation from "../../../layout/presenceAnimation/PresenceAnimation";
import clsx from "clsx";
import { Trans, useTranslation } from 'react-i18next';
import EmeraudeFooter from '../../../utilityUI/fixedElements/EmeraudeFooter';
import OnboardingHeader from '../../../utilityUI/singleElements/OnboardingHeader';
import { ClassStyleConfig } from '../../../../configs/style-config';
import { getScoresUsers } from '../../../../utils/score.api';
import { toast } from 'react-toastify';
import { fetchSessionStorageUser, removeSessionStorageUserKeys } from '../../../../utils/user.session-storage';
import { getScoreList } from './score.util';
import { removeSessionStorageRoom } from '../../../../utils/room.session-storage';
import Rank from './Rank';
import Button from '../../../utilityUI/singleElements/Button';

const Leaderboard = () => {
  const { gameConfig } = useAppState();
  const {t} = useTranslation();
  const navigate = useNavigate();
  const { _id, episode } = fetchSessionStorageUser();
  const [players, setPlayers] = useState(null);
  const [userRank, setUserRank] = useState(null);
  const [totalPlayers, setTotalPlayers] = useState(null);

  const fetchScores = async (userId) => {
    const { data: allPlayerScores, error: allPlayerScoresError } = await getScoresUsers({
      episode
    });
    if (allPlayerScoresError) {
      toast.error(allPlayerScoresError.message)
      return;
    }

    const {data: playerScore, error: playerScoreError} = await getScoresUsers({userId, episode});
    if (playerScoreError) {
      toast(playerScoreError.message)
      return;
    }

    setTotalPlayers(allPlayerScores.total);
    setUserRank(playerScore.items[0].rank);
    setPlayers(getScoreList(playerScore.items[0], allPlayerScores.items));
    removeSessionStorageUserKeys(['episode']);
    removeSessionStorageRoom();
  }

  useEffect(() => {
    AppLoadingManager.FinishLoading();
  }, [])

  useEffect(() => {
    fetchScores(_id);
  }, []);


  return (
    <PresenceAnimation>
      <div
        className={clsx(
          "fixed inset-0 overflow-auto bg-center bg-cover bg-no-repeat flex justify-between items-center",
          "flex-col pb-4",
          ClassStyleConfig.onboarding.bgColor
        )}
        style={{backgroundImage: `url('` + gameConfig.onboardingBgImage?.filename + `')`}}
      >

        {/* header */}
        <OnboardingHeader
          title={t('Global.YourPersonalScore', 'Your personal score')}
          subtitle={t('Global.YourPersonalScoreSubtitle', 'How did you do compared to your colleagues?')}
        />
        {/* content */}
        <div className="w-full max-w-2xl">
          <div className="mb-16 text-white text-center text-[34px] font-normal">
            <Rank userRank={userRank} totalPlayers={totalPlayers} />
          </div>

          {userRank && totalPlayers && players && (
            <div
              className="w-full overflow-auto shadow ring-1 ring-primary-base ring-opacity-5 sm:rounded-lg mb-4 max-h-[55vh]">
              <table className="min-w-full">
                {players &&
                  players.map((player) => (
                    <tr key={player.userId} className="bg-gray-700 text-white font-medium">
                      <td
                        className="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-semibold leading-6 sm:pl-6">
                        {player.rank}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm sm:pr-6">
                        {player.name}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-6">
                        {player.totalPoints}
                      </td>
                    </tr>
                  ))}
              </table>
            </div>
          )}

          <div className="flex justify-center items-center w-full gap-4">
            <Button onClick={() => navigate('/end')}>
              <Trans i18nKey="Global.Continue">Continue</Trans>
            </Button>
          </div>
        </div>

        {/* footer */}
        <EmeraudeFooter />
      </div>
    </PresenceAnimation>
  );
};


export const leaderboardLoader = async () => {
  return null;
}

export default Leaderboard;
