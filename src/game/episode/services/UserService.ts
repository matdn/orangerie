// import { getCurrentUser, signUp, updateUserProfile } from '../../../utils/user.api';
// import { User } from '../models/User.ts';
// import { normalizeUsername, randomString, setAuthenticated } from '../../../helpers/common.helpers';
// import { isScorm } from '../../../helpers/scorm.helper';
// import { handleSignupError } from '../../../components/pages/onboarding/signup/signup.util';
// import { updateSessionStorageUser } from '../../../utils/user.session-storage';


// export class UserService {
//   public static async Load(): Promise<User | null> {
//     const { data } = await getCurrentUser();
//     if (!data) {
//       return null;
//     }

//     return new User(data);
//   }

//   public static async SignUp(name: string, email: string, emailSuffix: string): Promise<User> {
//     const randomName = randomString();
//     name = name || randomName;
//     email = email || `${randomName}${emailSuffix}`;
//     let username = randomName;

//     if (isScorm()) {
//       // eslint-disable-next-line prefer-const
//       let {learnerId, learnerName} = globalThis.app.scorm || {};
//       learnerId = learnerId || learnerName;
//       name = learnerName;
//       username = learnerId;
//       email = `${learnerId}${emailSuffix}`;
//       if (learnerId?.includes('@')) {
//         email = learnerId;
//         username = (learnerId || '').split('@')[0];
//       }
//     }

//     if (name.includes('@')) {
//       name = name.split('@')[0];
//     }

//     const payload = {
//       username: normalizeUsername(username),
//       name,
//       email,
//       isConsent: true,
//     };

//     const { data, error } = await signUp(payload);
//     if (error) {
//       handleSignupError(error);
//       return null;
//     }

//     const { refreshToken, token } = data;
//     updateSessionStorageUser({
//       refreshToken,
//       token,
//     });
//     setAuthenticated(true);

//     return UserService.Load();
//   }

//   /**
//    * Episode name must be assigned to user before open any episode
//    * @param episodeName
//    */
//   public static async UpdateUserEpisode(episodeName: string) {
//     await updateUserProfile({episode: episodeName});
//   }

//   public static async UpdateUserCustomData(customData: object) {
//     await updateUserProfile({ customData } )
//   }
// }
