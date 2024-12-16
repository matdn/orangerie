import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../../constants/common.constant';
import { EpisodesCommand } from '../../../game/episode/commands/EpisodesCommand.ts';
import Button from '../../utilityUI/singleElements/Button';
import Spinner from '../../utilityUI/singleElements/spinner/Spinner';

export function EpisodeTest() {
  const navigate = useNavigate();

  const [loadingSendPoint1, setLoadingSendPoint1] = useState<boolean>(false);
  const [loadingSendPoint2, setLoadingSendPoint2] = useState<boolean>(false);
  const [loadingFinish, setLoadingFinish] = useState<boolean>(false);

  const sendPoints1 = async (points: number) => {
    setLoadingSendPoint1(true);
    await EpisodesCommand.SendScore('SCENE1', 'ELEMENT1', points);
    setLoadingSendPoint1(false);
  }

  const sendPoints2 = async (points: number) => {
    setLoadingSendPoint2(true);
    await EpisodesCommand.SendScore('SCENE2', 'ELEMENT1', points);
    setLoadingSendPoint2(false);
  }

  const completeTheater = async () => {
    setLoadingFinish(true);
    await EpisodesCommand.FinishGame();

    navigate(APP_ROUTES.END);
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-[4vh] px-[10vw] py-[10vh]">
      <>
        <Spinner isLoading={loadingSendPoint1}>
          <Button onClick={() => sendPoints1(10)}>Send points game 1</Button>
        </Spinner>

        <Spinner isLoading={loadingSendPoint2}>
          <Button onClick={() => sendPoints2(10)}>Send points game 2</Button>
        </Spinner>

        <Spinner isLoading={loadingFinish}>
          {/*<a*/}
          {/*  href="https://tom-webapp.teachonmars.com/deeplink?name=trainingCourseRegistration&code=CLCC&training=test-pp-onboarding"*/}
          {/*  target="_blank"*/}
          {/*  onClick={completeTheater}*/}
          {/*>*/}
            <Button onClick={completeTheater}>Finish</Button>
          {/*</a>*/}
        </Spinner>
      </>
    </div>
  );
}
