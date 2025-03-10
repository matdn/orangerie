import { Fog } from "three";
import { LobbyInitCommand } from "../commands/inits/project/LobbyInitCommand";
import { AssetId } from "../constants/games/AssetId";
import { CameraId } from "../constants/games/CameraId";
import { PostProcessingId } from "../constants/games/PostProcessingId";
import { TheaterId } from "../constants/theaters/TheaterId";
import { TheaterPlacementId } from "../constants/theaters/TheaterPlacementId";
import { ViewId } from "../constants/views/ViewId";
import ThreeTheaterBase from "../core/theaters/ThreeTheaterBase";
import { MainThree } from "../core/_engine/threejs/MainThree";

export class LobbyThreeTheater extends ThreeTheaterBase {

    private readonly _fog: Fog;
    private _fogScale: number = 250;

    constructor() {
        super(TheaterId.LOBBY, TheaterPlacementId.MAIN);

        // this._initCommandsList.push(new LobbyInitCommand());
        this._cameraId = CameraId.LOBBY;
        this._viewsList.add(ViewId.THREE_LOBBY);
        this._viewsList.add(ViewId.LOBBY_REACT);
        this._fog = new Fog(0xffffff, 150, 350);

        this._environment = {
            background: AssetId.HDR_PARK,
            environmentMapId: AssetId.HDR_LOBBY,
        };

    }
    public override init(): void {
        super.init();
        this._threePostProcessingId = PostProcessingId.BLOOM;
        MainThree.Scene.fog = this._fog;
    }

    public setFogScale(value: number): void {
        this._fogScale = value;

        this._fog.far = Math.max(50, value);

        console.log("Fog far:", this._fog.far);
    }

}