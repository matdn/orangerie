import { UserManager } from '../managers/UserManager.ts';
import { RoomManager } from '../managers/RoomManager.ts';
import { ScoreBoard, ScoreBoardData, ScoreBoardRequestPayload } from '../models/ScoreBoard';
import { getRanking, getTop5Ranking } from '../../../utils/score.api';
import { RoomType } from '../models/EpisodeRoom';

export class ScoreBoardService {

  private static _CurrentRoomData: ScoreBoardData;
  private static readonly _PageSize = 30;

  public static async GetLeagueTop5Ranking(type: RoomType): Promise<ScoreBoardData> {
    return this._LoadTop5ScoreByLeague(type);
  }

  public static async GetCurrentRoomScore(size?: number, selfDisplay: boolean = true): Promise<ScoreBoardData> {
    if (!UserManager.CurrentUser) {
      await UserManager.Init();
    }

    if (!UserManager.CurrentUser?.roomId) {
      return new ScoreBoardData();
    }

    const room = await RoomManager.Init(UserManager.CurrentUser.roomId);

    if (!room) {
      return new ScoreBoardData();
    }

    const currentRoomScorePayload = new ScoreBoardRequestPayload(room.type, null, null, room.id);
    const allRoomsScorePayload = new ScoreBoardRequestPayload(room.type, 0, size || 30);

    const [currentRoomScoreData, allRoomsScoreData] = await Promise.all([
      this.LoadRoomScores(currentRoomScorePayload),
      this.LoadRoomScores(allRoomsScorePayload)
    ]);

    this._CurrentRoomData = currentRoomScoreData;
    return this._MergeScoreBoardData(currentRoomScoreData, allRoomsScoreData, [], size || 30, selfDisplay);
  }

  public static async GetMoreRoomScores(allScores: ScoreBoard[]): Promise<ScoreBoardData> {
    const allRoomsScorePayload = new ScoreBoardRequestPayload(
      RoomManager.CurrentRoom.type,
      allScores.length,
      this._PageSize
    );

    const allRoomsScoreData = await this.LoadRoomScores(allRoomsScorePayload);

    return this._MergeScoreBoardData(this._CurrentRoomData, allRoomsScoreData, allScores, allScores.length + this._PageSize, true);
  }

  public static async LoadRoomScores(requestPayload: ScoreBoardRequestPayload): Promise<ScoreBoardData> {
    const {data, error} = await getRanking(requestPayload.getPayload());
    if (error || !data?.items) {
      return new ScoreBoardData();
    }
    return new ScoreBoardData(data);
  }

  private static async _LoadTop5ScoreByLeague(type: RoomType) {
    const {data, error} = await getTop5Ranking(type);
    if (error || !data?.items?.length) {
      return new ScoreBoardData();
    }
    return new ScoreBoardData(data);
  }

  private static _MergeScoreBoardData(
    currentRoomScoreData: ScoreBoardData,
    allRoomsScoreData: ScoreBoardData,
    previousRoomScores: ScoreBoard[],
    maxItemsQuantity: number,
    selfDisplay: boolean
  ): ScoreBoardData {
    if (!allRoomsScoreData) {
      return new ScoreBoardData();
    }

    if (!currentRoomScoreData.items.length) {
      return allRoomsScoreData;
    }

    const allRoomScores = [...(previousRoomScores || []), ...(allRoomsScoreData?.items || [])];
    if (allRoomScores.find(roomScore => roomScore.id === currentRoomScoreData.items[0].id)) {
      return {
        total: currentRoomScoreData.total,
        items: allRoomScores
      }
    }

    if (allRoomScores.length < maxItemsQuantity) {
      return {
        total: currentRoomScoreData.total,
        items: [...allRoomScores, ...currentRoomScoreData.items]
      }
    }

    return {
      total: currentRoomScoreData.total,
      items: allRoomScores.map((roomScore, index) => {
        if (index === allRoomScores.length - 1 && selfDisplay) {
          return currentRoomScoreData.items[0];
        }

        return roomScore;
      })
    }
  }

  public static get CurrentRoomData() { return this._CurrentRoomData }
}
