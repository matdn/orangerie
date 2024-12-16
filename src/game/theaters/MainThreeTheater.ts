import { MainInitCommand } from "../commands/inits/project/MainInitCommand";
import { TheaterId } from "../constants/theaters/TheaterId";
import { TheaterPlacementId } from "../constants/theaters/TheaterPlacementId";
import { ViewId } from "../constants/views/ViewId";
import ThreeTheaterBase from "../core/theaters/ThreeTheaterBase";

export class MainTheater extends ThreeTheaterBase {


    constructor() {
        super(TheaterId.MAIN, TheaterPlacementId.MAIN);

        this._initCommandsList.push(new MainInitCommand());

        this._viewsList.add(ViewId.THREE_MAIN);
        // this._cameraId = CameraId.ANIMMATED;
        // this._threePostProcessingId = PostProcessingId.LEO;

        // this._environment = {
        //     background: 0x000000,
        //     environmentMapId: AssetId.HDR_MAIN,
        // };

    }


}