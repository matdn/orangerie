import { openExternalLink } from '../../../helpers/common.helpers.ts';
import { fetchSessionStorage } from '../../../utils/session-storage';
import { EpisodeRoom, ROOM_MULTIPLAYER, RoomStatus } from '../models/EpisodeRoom.ts';
import { RoomUserStatus, User } from '../models/User.ts';
import { ProgressionProxy } from '../proxies/ProgressionProxy.ts';
import { RoomService } from '../services/RoomService.ts';
import { EpisodeManager } from './EpisodeManager.ts';
import { UserManager } from './UserManager.ts';

export class RoomManager {
  private static _CurrentRoom: EpisodeRoom | null = null;

  public static async Init(roomId: string, reload?: boolean): Promise<EpisodeRoom> {

    /**
     * If current user has no current room id & not reload then stop init
     */
    if ((!roomId || this._CurrentRoom) && !reload) {
      return this._CurrentRoom;
    }

    const localMultiplayerRoom = fetchSessionStorage(ROOM_MULTIPLAYER);

    if (!roomId && localMultiplayerRoom) {
      this._CurrentRoom = new EpisodeRoom(localMultiplayerRoom);
    }

    if (!roomId && this._CurrentRoom) {
      roomId = this._CurrentRoom.id;
    }

    this._CurrentRoom = await RoomService.Load(roomId);

    if (!this._CurrentRoom) {
      return null;
    }

    UserManager.CurrentUser.roomId = this._CurrentRoom.id;
    EpisodeManager.SetEpisodeById(this._CurrentRoom.episode);

    return this._CurrentRoom;
  }

  public static ResetRoomProgression() {
    ProgressionProxy.ClearProgressions();
    if (!this._CurrentRoom) {
      return;
    }
    const currentUser = this._CurrentRoom.users.find(user => user.id === UserManager.CurrentUser.id);
    if (!currentUser?.progression) {
      return;
    }
    currentUser.progression.forEach(progression => ProgressionProxy.AddProgression(progression));
  }

  public static ClearRoom() {
    this._CurrentRoom = null;
  }

  public static async JoinRoom(roomId: string) {
    this._CurrentRoom = await RoomService.JoinRoom(roomId);
    if (this._CurrentRoom) {
      EpisodeManager.SetEpisodeById(this._CurrentRoom.episode);
    }
    return this._CurrentRoom;
  }

  public static async LeaveRoom() {
    this.UpdateRoomStatus(RoomStatus.TIMEOUT);
    UserManager.UpdateStatus(RoomUserStatus.LEAVE);
    return await RoomService.LeaveRoom(this._CurrentRoom.id)
  }

  /**
   * User episode must be updated before create room for the episode
   * @param episodeId
   * @constructor
   */
  public static async CreateRoomSingle(episodeId: string) {
    if (this._CurrentRoom?.status === RoomStatus.PLAYING) {
      await this.LeaveRoom();
    }
    await UserManager.UpdateEpisode(episodeId);
    this._CurrentRoom = await RoomService.CreateRoomSingle();
    if (this._CurrentRoom) {
      UserManager.CurrentUser.roomId = this._CurrentRoom.id;
      UserManager.UpdateStatus(RoomUserStatus.PLAYING);
    }
  }

  public static async CreateClassroom(episodeId: string) {
    if (this._CurrentRoom?.currentUser?.status === RoomUserStatus.PLAYING) {
      await this.LeaveRoom();
    }
    await UserManager.UpdateEpisode(episodeId);
    this._CurrentRoom = await RoomService.CreateClassroom();
    if (this._CurrentRoom) {
      UserManager.CurrentUser.roomId = this._CurrentRoom.id;
      await RoomManager.SetRoomUserReady();
      await RoomService.StartRoom(this._CurrentRoom.id);
      UserManager.UpdateStatus(RoomUserStatus.PLAYING);
      RoomManager._CurrentRoom.setStatus(RoomStatus.PLAYING);
    }
  }

  public static async CreateRoomMultiple(name: string) {
    this._CurrentRoom = await RoomService.CreateRoomMultiple(name);
    if (!this._CurrentRoom) {
      return;
    }
    UserManager.CurrentUser.roomId = this._CurrentRoom.id;
    EpisodeManager.SetEpisodeById(this._CurrentRoom.episode);
  }

  public static async CompleteRoom() {
    this.UpdateRoomStatus(RoomStatus.COMPLETED);
    UserManager.UpdateStatus(RoomUserStatus.COMPLETED);
    await RoomService.CompleteRoom();
  }

  public static async SetRoomUserReady() {
    await RoomService.SetRoomUserReady(UserManager.CurrentUser.id);
  }

  public static UpdateRoomStatus(status: RoomStatus) {
    if (!this._CurrentRoom) {
      return;
    }
    this._CurrentRoom.setStatus(status);
  }

  public static async GetRooms(name?: string): Promise<EpisodeRoom[]> {
    return await RoomService.GetRooms(name);
  }

  public static async GetOnlineRoomUsers(): Promise<User[]> {
    return await RoomService.LoadOnlineRoomUsers(this._CurrentRoom.id);
  }

  public static OpenVisioLink() {
    if (!this._CurrentRoom?.visioUrl) {
      return;
    }

    openExternalLink(this._CurrentRoom.visioUrl);
  }

  public static GetInvitationLink() {
    return `${import.meta.env.VITE_APP_URL}?teamId=${this._CurrentRoom.id}`;
  }

  public static get CurrentRoom() { return this._CurrentRoom }
}
