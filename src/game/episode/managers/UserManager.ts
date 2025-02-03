// import { RoomUserStatus, User, UserCustomData } from '../models/User.ts';
// import { UserService } from '../services/UserService.ts';
// import { EpisodeManager } from './EpisodeManager.ts';

// export class UserManager {
//   private static _CurrentUser: User | null;

//   public static async Init(reload?: boolean) {
//     if (this._CurrentUser && !reload) {
//       return;
//     }

//     this._CurrentUser = await UserService.Load();

//     if (this._CurrentUser && !this._CurrentUser.episode) {
//       await UserManager.UpdateEpisode('EPISODE1')
//     }
//   }

//   /**
//    *
//    * @constructor
//    */
//   public static async SignUp(name: string = null, email: string = null, emailSuffix: string = '@emeraude.games') {
//     this._CurrentUser = await UserService.SignUp(name, email, emailSuffix);
//     if (this._CurrentUser && !this._CurrentUser.episode) {
//       await UserManager.UpdateEpisode('EPISODE1')
//     }
//     return this._CurrentUser;
//   }

//   public static UpdateStatus(status: RoomUserStatus) {
//     this._CurrentUser.setUserStatus(status);
//   }

//   public static async UpdateEpisode(episode: string) {
//     if (this._CurrentUser.episode === episode) {
//       return;
//     }
//     this._CurrentUser.episode = episode;
//     await UserService.UpdateUserEpisode(episode);
//     EpisodeManager.SetEpisodeById(episode);
//   }

//   public static async UpdateCustomData(data: Partial<UserCustomData>) {
//     const { customData } = UserManager.CurrentUser;

//     const newCustomData = {
//       ...(customData || {}),
//       ...data
//     }

//     this.CurrentUser.setUserCustomData(newCustomData);
//     await UserService.UpdateUserCustomData(newCustomData);
//   }

//   public static get CurrentUser() { return this._CurrentUser }
// }
