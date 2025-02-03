// import { RoomUserStatus, User } from './User.ts';
// import { UserManager } from '../managers/UserManager.ts';

// export const ROOM_MULTIPLAYER = 'GameApp-roomMultiplayer';

// export enum RoomStatus {
//   PLAYING = 'PLAYING',
//   TIMEOUT = 'TIMEOUT',
//   COMPLETED = 'COMPLETED',
//   AVAILABLE = 'AVAILABLE'
// }

// export enum RoomType {
//   SINGLE = 'SINGLE',
//   FIXED = 'FIXED',
//   RANDOM = 'RANDOM',
// }

// export enum RoomScoreRankType {
//   TIME = 'TIME',
//   SCORE = 'SCORE',
//   SUM_POINT = 'SUM_POINT',
//   AVG_TIME = 'AVG_TIME',
//   HIGHEST = 'HIGHEST'
// }

// export class EpisodeRoom {
//   private _id: string;
//   private _status: RoomStatus;
//   private _type: RoomType;
//   private _episode: string;
//   private _users: User[];
//   private _visioUrl: string;
//   private _name: string;
//   private _rank: number;
//   private _isActive: boolean;
//   private _totalPoints: number;
//   private _averagePoints: number;
//   private _averageTimeSpent: number;
//   private _country: string;

//   constructor(data?: any) {
//     if (data) this.initFromJSON(data);
//   }

//   public initFromJSON(data: any): void {
//     this._id = data.roomId || data._id;
//     this._episode = data.episode;
//     this._status = data.status;
//     this._type = data.type || data.roomType;
//     this._visioUrl = data.visioUrl;
//     this._name = data.name || data.roomName;
//     this._rank = data.rank;
//     this._isActive = data.isActive || data.active;
//     this._totalPoints = data.totalPoints || (data.users || []).reduce((acc, user) => acc + user.totalPoints, 0);
//     this._users = (data.users || [])
//       .map(user => new User(user))
//       .sort((user1: User, user2: User) => user1.createdAt.getTime() - user2.createdAt.getTime());
//     this._averageTimeSpent = this._users?.reduce((acc, user) => acc + (user.timeSpent || 0), 0) / (data.users?.length || 1);
//     this._averagePoints = Math.round(this._totalPoints / (this._users.length || 1));
//     this._country = data.customData?.country;
//   }

//   public isUserReady(userId: string) {
//     return this._users.find(user => user.id === userId)?.status === RoomUserStatus.READY;
//   }

//   public isRoomCreator(userId: string) {
//     return this._users.find(user => user.id === userId).isCreator;
//   }

//   public setStatus(status: RoomStatus) { this._status = status }

//   public get status() { return this._status }
//   public set isActive(isActive: boolean) { this._isActive = isActive }
//   public get isActive() { return this._isActive }

//   public get users() { return this._users }
//   public get currentUser() { return this._users.find(user => user.id === UserManager.CurrentUser.id) }
//   public get type() { return this._type }
//   public get id() { return this._id }
//   public get name() { return this._name }
//   public get country() { return this._country }
//   public get rank() { return this._rank }
//   public get totalPoints() { return this._totalPoints }
//   public get averagePoints() { return this._averagePoints }
//   public get averageTimeSpent() { return this._averageTimeSpent }
//   public get visioUrl() { return this._visioUrl }
//   public get episode() { return this._episode }
// }
