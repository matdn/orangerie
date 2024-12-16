import { createBrowserRouter, createHashRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Body from '../components/layout/body/Body.jsx';
import { Classroom } from '../components/pages/onboarding/classroom/Classroom';
import BlockedByDate, { loader as dateValidationLoader } from '../components/pages/onboarding/dateValidation/DateValidation.jsx';
import Signup from '../components/pages/onboarding/signup/Signup.jsx';
import { signupLoader } from '../components/pages/onboarding/signup/signup-loader.ts';
import Gameboard, { loader as gameBoardLoader } from '../components/gameboard/Gameboard.jsx';
import Congratulations, {
  action as congratulationsAction, loader as congratulationsLoader
} from '../components/pages/outboarding/congratulation/Congratulations.jsx';
import RatingComment, { loader as ratingCommentLoader } from '../components/pages/outboarding/ratingComment/RatingComment.jsx';
import Leaderboard, { leaderboardLoader } from '../components/pages/outboarding/leaderboard/Leaderboard.jsx';
import End from '../components/pages/outboarding/End.jsx';
import { APP_ROUTES } from '../constants/common.constant';
import { isElectron } from '../helpers/common.helpers';
import { isScorm } from '../helpers/scorm.helper.ts';

const routes = createRoutesFromElements(
  <Route element={<Body />} >
    <Route path="/" element={<BlockedByDate />} loader={dateValidationLoader} />
    <Route path={APP_ROUTES.START} element={<BlockedByDate />} loader={dateValidationLoader} />
    <Route path={APP_ROUTES.CLASSROOM} element={<Classroom />} />
    <Route path={APP_ROUTES.SIGNUP} element={<Signup />} loader={signupLoader} />
    <Route path={APP_ROUTES.GAME_BOARD + '/*'} element={<Gameboard />} loader={gameBoardLoader} />
    <Route
      path={APP_ROUTES.CONGRATULATIONS}
      element={<Congratulations />}
      action={congratulationsAction}
      loader={congratulationsLoader}
    />
    <Route path={APP_ROUTES.CONGRATULATIONS} element={<RatingComment />} loader={ratingCommentLoader} />
    <Route path={APP_ROUTES.LEADER_BOARD} element={<Leaderboard />} loader={leaderboardLoader} />
    <Route path={APP_ROUTES.END} element={<End />} />
  </Route>,
);

// Router
const router = (isScorm() || isElectron()) ? createHashRouter(routes) : createBrowserRouter(routes);

export default router;
