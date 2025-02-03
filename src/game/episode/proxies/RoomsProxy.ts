// import { EpisodeRoom } from '../models/EpisodeRoom.ts';

// export class RoomsProxy {
//     private static _RoomMap: Map<string, EpisodeRoom> = new Map<string, EpisodeRoom>();
//     private static _TotalRooms: number = 0;

//     public static Init(rooms: any[], total: number): void {
//         this._RoomMap.clear();
//         this._TotalRooms = total;

//         if (!rooms) {
//             return;
//         }

//         rooms.forEach(room => {
//             const episodeRoom = new EpisodeRoom(room);
//             this._RoomMap.set(episodeRoom.id, episodeRoom)
//         })
//     }

//     public static GetRoom(id: string): EpisodeRoom {
//         return this._RoomMap.get(id);
//     }

//     //#region Getters
//     public static get RoomMap(): ReadonlyMap<string, EpisodeRoom> { return this._RoomMap; }
//     public static get TotalRooms(): number { return this._TotalRooms; }
//     public static get AllRooms() { return Array.from(this._RoomMap.values()) }
//     //#endregion

// }
