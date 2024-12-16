import { fetchData } from '../../../../helpers/sessionStorage.helpers.js';
import { redirect } from 'react-router-dom';
import { fetchSessionStorageConfig } from '../../../../utils/app-config.session-storage.js';
import { removeSessionStorageRoom } from '../../../../utils/room.session-storage.js';
import { removeSessionStorageUser, updateSessionStorageUser } from '../../../../utils/user.session-storage.js';
import { randomString } from '../../../../helpers/common.helpers.ts';
import { signUp } from '../../../../utils/user.api.js';
import { handleSignupError } from './signup.util.ts';

export async function signupLoader() {
  const gameConfig = fetchSessionStorageConfig();
  if (!gameConfig) {
    return redirect('/start');
  }

  const isAuthenticated = Boolean(fetchData('GameApp-isAuthenticated'));
  if (isAuthenticated) {
    return redirect(`/gameboard`);
  }

  removeSessionStorageRoom();
  removeSessionStorageUser();

  const randomName = randomString();
  const username = randomName;
  const name = randomName;
  const email = `${randomName}@emeraude.games`;

  const payload = {
    username,
    name,
    email,
    isConsent: true,
  };

  const { data, error } = await signUp(payload);
  if (error) {
    handleSignupError(error);
    return null;
  }

  const { refreshToken, token } = data;
  updateSessionStorageUser({
    refreshToken,
    token,
  });
  sessionStorage.setItem('GameApp-isAuthenticated', String(true));

  return redirect('/gameboard')
}
