import { Progression } from './Progression.ts';

export enum RoomUserStatus {
  PLAYING = 'PLAYING',
  TIMEOUT = 'TIMEOUT',
  LEAVE = 'LEAVE',
  COMPLETED = 'COMPLETED',
  JOINED = 'JOINED',
  READY = 'READY',
}

export interface UserCustomData {
  language: string;
  country: string;
}

export class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _status: RoomUserStatus;
  private _rank: number;
  private _customData: Partial<UserCustomData>;
  private _episode: string;
  private _currentRoomId: string;
  private _isCreator: boolean;
  private _progression: Progression[];
  private _timeSpent: number;
  private _totalPoints: number;
  private _isActive: boolean;
  private _createdAt: Date;

  constructor(data?: any) {
    if (data) this.initFromJSON(data);
  }

  public initFromJSON(data: any): void {
    this._id = data.userId || data._id;
    this._name = data.name;
    this._email = data.email;
    this._episode = data.episode;
    this._status = data.status;
    this._customData = data.customData;
    this._currentRoomId = data.currentRoomId;
    this._rank = data.rank;
    this._isCreator = data.isCreator;
    this._timeSpent = data.timeSpent;
    this._totalPoints = data.totalPoints ?? data.points;
    this._createdAt = data.createdAt ? new Date(data.createdAt) : null;
    this._progression = (data.collectedItems || []).map(collectedItem => new Progression(collectedItem));
  }

  public setUserCustomData(customData: Partial<UserCustomData>): void {
    this._customData = customData;
  }

  public setUserStatus(status: RoomUserStatus): void { this._status = status}

  public set progression(progression: Progression[]) { this._progression = progression }
  public get progression() { return this._progression }

  public set episode(episode: string) { this._episode = episode }
  public get episode() { return this._episode }

  public set isActive(isActive: boolean) { this._isActive = isActive }
  public get isActive() { return this._isActive }

  public get customData() { return this._customData }

  public get status() { return this._status }
  public get rank() { return this._rank }

  public set roomId(roomId: string) { this._currentRoomId = roomId }
  public get roomId() { return this._currentRoomId }

  public get isCreator() { return this._isCreator }
  public get id() { return this._id }
  public get timeSpent() { return this._timeSpent }
  public get createdAt() { return this._createdAt }
  public get totalPoints() { return this._totalPoints }
  public get email() { return this._email }
  public get name() { return this._name }
  public get shortName() {
    if (this._name?.includes(' ')) {
      const [firstName, lastName] = this._name.split(' ');
      return `${firstName} ${lastName.slice(0, 2)}`;
    }

    return this._name;
  }
}
