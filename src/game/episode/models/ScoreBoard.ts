import { RoomType } from './EpisodeRoom';
import { User } from './User';

export class ScoreBoardRequestPayload {
  id?: string;
  type: RoomType;
  limit: number;
  offset: number;

  constructor(type: RoomType, offset?: number, pageSize?: number, id?: string) {
    this.id = id;
    this.type = type;
    this.limit = pageSize;
    this.offset = offset;
  }

  public getPayload() {
    const payload: Partial<ScoreBoardRequestPayload> = {
      id: this.id,
      type: this.type,
      limit: this.limit,
      offset: this.offset,
    };

    Object.keys(payload).forEach(key => {
      if (!payload[key] && payload[key] !== 0) {
        delete payload[key];
      }
    })

    return payload;
  }
}

export class ScoreBoardData {
  total: number;
  items: ScoreBoard[];

  constructor(data?: any) {
    this.total = data?.total || 0;
    this.items = (data?.items || []).map(item => new ScoreBoard(item));
  }
}

export class ScoreBoard {
  averagePoints: number;
  country: string;
  id: string;
  isActive: boolean;
  name: string;
  rank: number;
  totalPoints: number;
  type: RoomType;
  users: User[];

  constructor(data?: any) {
    if (data) {
      this.averagePoints = Math.round(data.averagePoints || data.totalPoints);
      this.country = data.customData?.country;
      this.id = data._id || data.id;
      this.name = data.name;
      this.rank = data.rank;
      this.totalPoints = data.totalPoints;
      this.type = data.type;
    }
  }

  public setActive(active: boolean) {
    this.isActive = active;
  }

  public setUsers(users: User[]) {
    this.users = users;
  }
}
