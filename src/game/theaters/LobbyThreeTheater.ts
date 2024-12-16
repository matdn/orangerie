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

export class LobbyThreeTheater extends ThreeTheaterBase {

    private readonly _fog: Fog;


    constructor() {
        super(TheaterId.LOBBY, TheaterPlacementId.MAIN);

        this._initCommandsList.push(new LobbyInitCommand());
        this._cameraId = CameraId.LOBBY;

        this._viewsList.add(ViewId.THREE_LOBBY);
        // this._fog = new Fog(0xffffff, 10, 180);

        // this._environment = {
        //     background: 0xffffff,
        //     environmentMapId: AssetId.HDR_WINTER,
        // };

    }
    public override init(): void {
        super.init();
        this._threePostProcessingId = PostProcessingId.BLOOM;

        MainThree.Scene.fog = this._fog;
    }
}