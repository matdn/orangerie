import { randomString } from '../../../helpers/common.helpers';
import {
  createRoom,
  getRoomById,
  getRoomOnlineUsers,
  getRooms,
  joinRoom,
  leaveRoom,
  startRoom,
} from '../../../utils/room.api';
import { EpisodeRoom, ROOM_MULTIPLAYER, RoomStatus, RoomType } from '../models/EpisodeRoom.ts';
import { toast } from 'react-toastify';
import { updateSessionStorage } from '../../../utils/session-storage';
import { setStatus, setUserCompleted } from '../../../utils/user.api';
import { RoomUserStatus, User } from '../models/User.ts';
import { RoomsProxy } from '../proxies/RoomsProxy.ts';
import { UserManager } from '../managers/UserManager.ts';

export class RoomService {
  public static async Load(roomId: string) {
    const {data} = await getRoomById(roomId);

    if (!data) {
      return null;
    }

    if (data.type === RoomType.FIXED) {
      updateSessionStorage(data, ROOM_MULTIPLAYER);
    }

    return new EpisodeRoom(data);
  }

  public static async LeaveRoom(roomId: string) {
    await leaveRoom(roomId);
  }

  public static async CompleteRoom() {
    await setUserCompleted();
  }

  public static async SetRoomUserReady(userId: string) {
    const {error} = await setStatus(userId, {status: RoomUserStatus.READY});

    if (error) {
      toast.error(error.message);
      return null;
    }
  }

  public static async GetRooms(name: string) {
    const payload = {
      name,
      status: RoomStatus.AVAILABLE,
      type: RoomType.FIXED
    }

    if (!name) {
      delete payload.name;
    }

    const {data, error} = await getRooms(payload);

    if (error) {
      toast.error(error.message);
      return [];
    }

    RoomsProxy.Init(data.items, data.total);

    return RoomsProxy.AllRooms;
  }

  public static async CreateRoomSingle() {
    const payload = {
      name: randomString(),
      type: RoomType.SINGLE,
      customData: {
        country: UserManager.CurrentUser.customData?.country,
      }
    };

    const { data } = await createRoom(payload);

    if (!data) {
      return null;
    }

    return new EpisodeRoom(data);
  }

  public static async CreateClassroom() {
    const payload = {
      name: randomString(),
      type: RoomType.RANDOM,
      customData: {
        country: UserManager.CurrentUser.customData?.country,
      }
    };

    const { data } = await createRoom(payload);

    if (!data) {
      return null;
    }

    return new EpisodeRoom(data);
  }

  public static async CreateRoomMultiple(name: string) {
    const payload = {
      name,
      type: RoomType.FIXED,
      customData: {
        country: UserManager.CurrentUser.customData?.country,
      }
    };

    const { data: roomData, error: roomError } = await createRoom(payload);

    if (roomData) {
      updateSessionStorage(roomData, ROOM_MULTIPLAYER);
      return new EpisodeRoom(roomData);
    }

    if (roomError) {
      if (roomError?.message === 'User already joined a room') { // leave the last playing episode, start over the selected one
        await UserManager.Init(true);
        await this.LeaveRoom(UserManager.CurrentUser.roomId);
      }
      const {data: retryData, error: retryError } = await createRoom(payload);
      updateSessionStorage(retryData, ROOM_MULTIPLAYER);

      if (retryError) {
        toast.error(retryError.message);
        return;
      }

      return new EpisodeRoom(roomData);
    }
  }

  public static async StartRoom(roomId: string) {
    return startRoom(roomId);
  }

  public static async JoinRoom(roomId: string) {
    const {data, error} = await joinRoom(roomId);

    if (error) {
      toast.error(error.message);
      return null;
    }

    updateSessionStorage(data, ROOM_MULTIPLAYER);

    return new EpisodeRoom(data);
  }

  public static async LoadOnlineRoomUsers(roomId: string): Promise<User[]> {
    const {data, error} = await getRoomOnlineUsers(roomId);

    if (error) {
      toast.error(error.message);
      return [];
    }

    return (data.users || []).map((user) => new User(user));
  }
}
