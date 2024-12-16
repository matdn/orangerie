import React, {useEffect, useState} from 'react';
import {redirect, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';


// Configs
import { useAppState } from '../../../../state';

// Libs
import { sendFeedback } from '../../../../utils/feedback.api';
import i18n from 'i18next';
import { AppLoadingManager } from '../../../customUI/appLoading/AppLoadingManager';
import PresenceAnimation from "../../../layout/presenceAnimation/PresenceAnimation";
import clsx from "clsx";
import { Trans, useTranslation } from 'react-i18next';
import { getRoomById } from '../../../../utils/room.api';
import EmeraudeFooter from '../../../utilityUI/fixedElements/EmeraudeFooter';
import { fetchSessionStorageUser } from '../../../../utils/user.session-storage';
import { ClassStyleConfig } from '../../../../configs/style-config';
import OnboardingHeader from '../../../utilityUI/singleElements/OnboardingHeader';
import SVG from 'react-inlinesvg';
import Button from '../../../utilityUI/singleElements/Button';
import Spinner from '../../../utilityUI/singleElements/spinner/Spinner';
import { getAssetUrl } from '../../../../helpers/common.helpers';

const RatingComment = () => {
  const { gameConfig } = useAppState();
  const { t } = useTranslation();

  const rating = [1, 2, 3, 4, 5];

  const [isSubmitBtnEnabled, setSubmitBtnEnabled] = useState(true);

  const onCommentChanged = (value) => {
    setComment(value);
  }

  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [selectedRating, setSelectedRating] = useState(5);
  const [comment, setComment] = useState(null);

  useEffect(() => {
    AppLoadingManager.FinishLoading();
  }, [])

  useEffect(() => {
    if (!!comment && isSubmitBtnEnabled) {
      return;
    }
    setSubmitBtnEnabled(!(gameConfig.gameCommentIsRequired && !comment))
  }, [gameConfig.gameCommentIsRequired, comment, isSubmitBtnEnabled]);

  const onSubmit = async () => {
    if (selectedRating === 0) {
      toast.error(i18n.t('RatingComment.Error.RequiredRating'));
      return;
    }

    const payload = {
      rating: selectedRating,
      comment,
    };

    setLoading(true);
    await sendFeedback(payload);
    navigate(`/leaderboard`);
  }

  return (
    <PresenceAnimation>
      <div
        className={clsx(
          "fixed inset-0 overflow-auto min-h-screen bg-center bg-cover bg-no-repeat flex flex-col justify-between items-center pb-[2%]",
          ClassStyleConfig.onboarding.bgColor,
        )}
        style={{backgroundImage: `url('` + gameConfig.onboardingBgImage?.filename + `')`}}
      >

        <OnboardingHeader
          title={t('Global.TellUsWhatYouThink', 'Tell us what you think!')}
          subtitle={t(
            'Global.TellUsWhatYouThinkSubtitle',
            'Feel free to share what you liked and disliked in this episode and how to improve it!',
          )}
        />

        {/* body */}
        <div className="w-full h-full flex flex-col justify-between items-center max-w-2xl">
          {/* content */}
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="flex items-center justify-center mb-6 gap-6">
              {rating.map((key) => {
                return (
                  <div
                    key={`rating-key-${key}`}
                    className="flex flex-col items-center gap-2 cursor-pointer text-[#1CB3FF]"
                    onClick={() => {
                      setSelectedRating(key);
                    }}
                  >
                    <span>{key}</span>
                    <div
                      className={clsx('star--bouncing hover:scale-105', key <= selectedRating ? 'text-[#1CB3FF]' : 'text-transparent')}>
                      <SVG src={getAssetUrl('/assets/rating/rating-star.svg')} title="star" />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="w-full mb-4">
                  <textarea
                    className="w-full h-32 border border-primary-base rounded-md p-2 focus:ring-inset focus:ring-primary-base"
                    placeholder={t('Global.WriteYourCommentHere', 'Write your comment here...')}
                    name="comment"
                    onChange={(changeEvent) => onCommentChanged(changeEvent.target.value)}
                  ></textarea>
            </div>
          </div>
          <Spinner isLoading={isLoading}>
            <Button disabled={!isSubmitBtnEnabled} onClick={onSubmit}>
              <Trans i18nKey="Global.RateMyExperience">Rate my experience</Trans>
            </Button>
          </Spinner>
        </div>

        {/* footer */}
        <EmeraudeFooter classes="mt-4 xl:mt-16" />
      </div>
    </PresenceAnimation>
  );
};

export async function loader(){
  const user = fetchSessionStorageUser();
  if (!user) {
    return redirect('/start');
  }
  if (user.currentRoomId) {
    const {data: room} = await getRoomById(user.currentRoomId);

    if (!room) {
      return redirect('/gameboard');
    }

    const { isFeedback } = room.users[0];
    if (isFeedback) {
      return redirect('/leaderboard');
    }
  }
  return null;
}

export default RatingComment;
