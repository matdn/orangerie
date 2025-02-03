// import { Action } from 'cookware';
// import { Episode } from '../models/Episode.ts';
// import { RoomType } from '../models/EpisodeRoom.ts';
// import { Progression } from '../models/Progression.ts';
// import { EpisodesProxy } from '../proxies/EpisodesProxy.ts';
// import { ProgressionProxy } from '../proxies/ProgressionProxy.ts';
// import { EpisodeService } from '../services/EpisodeService.ts';
// import { ScormService } from '../services/ScormService.ts';
// import { RoomManager } from './RoomManager.ts';
// import { UserManager } from './UserManager';

// export class EpisodeManager {
//     public static Debug: boolean = true;
//     // public static Debug: boolean = false;

//     private static _CurrentEpisode: Episode | null = null;
//     public static readonly FinishGame = new Action();

//     public static Init() {
//         if (this.Debug) console.log('EpisodesCommand.InitEpisodes');
//         EpisodeService.InitEpisodes();
//         if (UserManager.CurrentUser?.episode) {
//             this._CurrentEpisode = EpisodesProxy.GetEpisode(UserManager.CurrentUser.episode);
//             // this._CurrentEpisode.getSceneByName(GameId.JAPAN).getElementByName('popin2').setISCollected(true);
//             if (this.Debug) console.log(this._CurrentEpisode);
//         }
//     }

//     public static async OpenEpisode(episode: Episode) {
//         if (this.Debug) console.log('EpisodesCommand.Open', episode);
//         this._CurrentEpisode = episode;
//         await RoomManager.CreateRoomSingle(episode.name);
//     }
//     /**
//      * When user completes an episode, room will be completed to finalize the score of the room
//      * When user is playing the game in Scorm, if it is the last episode then Scorm status will be set to <completed>
//      * @param isLastEpisode
//      */
//     public static async FinishEpisode(isLastEpisode?: boolean) {
//         if (this.Debug) console.log('EpisodesCommand.FinishEpisode');
//         if (!RoomManager.CurrentRoom) {
//             return;
//         }

//         if (isLastEpisode || RoomManager.CurrentRoom.type === RoomType.SINGLE) {
//             await RoomManager.CompleteRoom();
//         }

//         if (isLastEpisode) {
//             ScormService.SetScormStatus('completed');
//             this.FinishGame.execute();
//         }
//     }

//     public static async LeaveEpisode() {
//         if (this.Debug) console.log('EpisodesCommand.LeaveEpisode');
//         await RoomManager.LeaveRoom();
//     }

//     public static async SendScore(scene: string, element: string, points: number, answers: number[]): Promise<void> {
//         if (this.Debug) console.log('EpisodesCommand.SendScore', scene, element, points, answers);
//         if (ProgressionProxy.FindProgression(scene, element)) {
//             if (this.Debug) console.log('element existed', scene, element);
//             return;
//         }
//         const progression = new Progression({ scene, element, points, answers });
//         ProgressionProxy.AddProgression(progression);
//         EpisodesProxy.SetEpisodeProgress();
//         // this._CurrentEpisode = EpisodesProxy.GetEpisode(UserManager.CurrentUser.episode);
//         await EpisodeService.SendScore(progression);
//     }

//     public static SetEpisodeById(episodeId: string) {
//         if (this.Debug) console.log('EpisodesCommand.SetEpisodeById', episodeId);
//         this._CurrentEpisode = EpisodesProxy.GetEpisode(episodeId);
//     }

//     public static get CurrentEpisode() { return this._CurrentEpisode; }
// }
