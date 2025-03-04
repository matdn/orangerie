import { GaleryInitCommand } from "../commands/inits/project/GaleryInitCommand";
import { CameraId } from "../constants/games/CameraId";
import { TheaterId } from "../constants/theaters/TheaterId";
import { TheaterPlacementId } from "../constants/theaters/TheaterPlacementId";
import { ViewId } from "../constants/views/ViewId";
import ThreeTheaterBase from "../core/theaters/ThreeTheaterBase";

export class GaleryTheater extends ThreeTheaterBase {

    constructor() {
        super(TheaterId.GALERY, TheaterPlacementId.MAIN);
        this._cameraId = CameraId.GALERY;

        this._initCommandsList.push(new GaleryInitCommand());
        this._viewsList.add(ViewId.GALERY_REACT);
        this._viewsList.add(ViewId.THREE_GALERY);
        this._environment = {
            background: 0xffffff,
            environmentMapId: null,
        };
    }
    public override init(): void {
        super.init();
    }


}