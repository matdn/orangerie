import { Fog } from "three";
import { LobbyInitCommand } from "../commands/inits/project/LobbyInitCommand";
import { AssetId } from "../constants/games/AssetId";
import { CameraId } from "../constants/games/CameraId";
import { TheaterId } from "../constants/theaters/TheaterId";
import { TheaterPlacementId } from "../constants/theaters/TheaterPlacementId";
import { ViewId } from "../constants/views/ViewId";
import ThreeTheaterBase from "../core/theaters/ThreeTheaterBase";
import { MainThree } from "../core/_engine/threejs/MainThree";
import { PostProcessingId } from "../constants/games/PostProcessingId";
import { MuseumInitCommand } from "../commands/inits/project/MuseumInitCommand";
import { ParkInitCommand } from "../commands/inits/project/ParkInitCommand";

export class ParkThreeTheater extends ThreeTheaterBase {

    constructor() {
        super(TheaterId.PARK, TheaterPlacementId.MAIN);

        this._initCommandsList.push(new ParkInitCommand());
        this._cameraId = CameraId.PARK;
        this._viewsList.add(ViewId.THREE_PARK);

        this._environment = {
            background: 0x000000,
            environmentMapId: AssetId.HDR_LOBBY,
        };

    }
    public override init(): void {
        super.init();
        this._threePostProcessingId = PostProcessingId.AQUARELLE;
    }
}