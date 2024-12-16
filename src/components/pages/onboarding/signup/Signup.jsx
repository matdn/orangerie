import { useEffect } from 'react';
import { AppLoadingManager } from '../../../customUI/appLoading/AppLoadingManager';

const Signup = () => {
  useEffect(() => {
    AppLoadingManager.FinishLoading();
  }, [])
  return <></>;
};

export default Signup;
