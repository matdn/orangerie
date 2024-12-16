import i18next from 'i18next';
import { toast } from 'react-toastify';
import { GAME_CLASSROOM, GAME_HOST, TRANSLATION_MODE_KEY, USER_TEAM } from '../../../constants/common.constant';
import { setAuthenticated } from '../../../helpers/common.helpers';
import { updateLocalLanguage } from '../../../utils/language-local.util';
import { updateSessionStorageUser } from '../../../utils/user.session-storage';
import { UserManager } from './UserManager';

export class OnboardingManager {
  public static async SaveQueryParamsSettings() {
    const {searchParams} = new URL(window.location.href);

    const [language, token, translationMode, teamId, host, classroom ] = [
      searchParams.get('language'),
      searchParams.get('token'),
      searchParams.get('translationMode'),
      searchParams.get('teamId'),
      searchParams.get('host'),
      searchParams.get('classroom'),
    ];

    if (language) {
      updateLocalLanguage(language);
      i18next.changeLanguage(language);
    }

    if (host) {
      sessionStorage.setItem(GAME_HOST, host);
    }

    if (translationMode) {
      sessionStorage.setItem(TRANSLATION_MODE_KEY, translationMode);
    }

    if (classroom) {
      sessionStorage.setItem(GAME_CLASSROOM, classroom);
    }

    if (teamId) {
      sessionStorage.setItem(USER_TEAM, teamId);
    }

    if (token) {
      updateSessionStorageUser({ token });
      setAuthenticated(true);
      await UserManager.Init();

      if (UserManager.CurrentUser) {
        toast.error('Token is not valid');
      }
    }
  }
}
