// import { Action } from 'cookware';
// import { ScoreBoard, ScoreBoardData } from '../models/ScoreBoard';
// import { ScoreBoardService } from '../services/ScoreBoardService';
// import { RoomManager } from './RoomManager';
// import { RoomType } from '../models/EpisodeRoom';

// export class ScoreboardManager {
//   private static _ScoreBoardData: ScoreBoardData = new ScoreBoardData();
//   private static _ActiveRoom: ScoreBoard;
//   private static _SoloLeague: ScoreBoardData = new ScoreBoardData();
//   private static _TeamLeague: ScoreBoardData = new ScoreBoardData();

//   public static OnScoreBoardDataChanged = new Action();

//   public static Reset() {
//     this._ScoreBoardData = null;
//     this._ActiveRoom = null;
//   }

//   public static async LoadLeagueScores() {
//     const [ soloLeague, teamLeague ] = await Promise.all([
//       ScoreBoardService.GetLeagueTop5Ranking(RoomType.SINGLE),
//       ScoreBoardService.GetLeagueTop5Ranking(RoomType.FIXED),
//     ]);

//     this._SoloLeague = soloLeague;
//     this._TeamLeague = teamLeague;
//   }

//   public static async LoadScoreboard(size?: number, selfDisplay: boolean = true): Promise<void> {
//     this._ScoreBoardData = await ScoreBoardService.GetCurrentRoomScore(size, selfDisplay);
//     if (selfDisplay) {
//       this._ActiveRoom = this._ScoreBoardData.items.find((room) => room.id === RoomManager.CurrentRoom.id);
//     } else {
//       this._ActiveRoom = ScoreBoardService.CurrentRoomData.items[0];
//     }

//     if (this._ActiveRoom) {
//       this._ActiveRoom.setActive(true);
//     }
//   }

//   public static async LoadMoreRoomScores() {
//     this._ScoreBoardData = await ScoreBoardService.GetMoreRoomScores(this._ScoreBoardData.items)
//     this.OnScoreBoardDataChanged.execute();
//   }

//   public static GetScoreByRoomType(roomType: RoomType): ScoreBoardData {
//     return roomType === RoomType.SINGLE ? this._SoloLeague : this._TeamLeague;
//   }

//   public static get SoloLeague() { return this._SoloLeague }
//   public static get TeamLeague() { return this._TeamLeague }
//   public static get ScoreBoardData() { return this._ScoreBoardData }
//   public static get ActiveRoom() { return this._ActiveRoom }
// }
