import { toast } from 'react-toastify';
import i18n from 'i18next';

export const validateSignupForm = (payload) => {
  if (!payload.username) {
    toast.error(i18n.t('Signup.Error.RequiredUsername'));
    return false;
  }

  if (!(/^[^\/@\(\[\]\)"]*$/.test(payload.username))) {
    toast.error(i18n.t('Signup.Error.UsernameIsInvalid'));
    return false;
  }

  return true;
}

export const handleSignupError = (error) => {
  const { status, message } = error;
  if (status === 400) {
    if (message === 'Code exceed max usage') {
      toast.error(i18n.t('Signup.Error.CodeExceedsMaxUsage'));
      return;
    }
    toast.error(message);
    return;
  }

  toast.error(i18n.t('Global.Error.Wrong'));
}
