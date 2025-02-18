import { ViewsProxy } from "pancake";
import { MuseumInitCommand } from "../commands/inits/project/MuseumInitCommand";
import { AssetId } from "../constants/games/AssetId";
import { CameraId } from "../constants/games/CameraId";
import { TheaterId } from "../constants/theaters/TheaterId";
import { TheaterPlacementId } from "../constants/theaters/TheaterPlacementId";
import { ViewId } from "../constants/views/ViewId";
import ThreeTheaterBase from "../core/theaters/ThreeTheaterBase";

export class MuseumThreeTheater extends ThreeTheaterBase {

    constructor() {
        super(TheaterId.MUSEUM, TheaterPlacementId.MAIN);

        // this._initCommandsList.push(new MuseumInitCommand());

        this._cameraId = CameraId.MUSEUM;
        this._viewsList.add(ViewId.THREE_MUSEUM);
        this._viewsList.add(ViewId.MUSEUM_REACT);
        this._environment = {
            background: 0xffffff,
            environmentMapId: AssetId.HDR_MUSEUM,
        };

    }
    public override init(): void {
        super.init();
        // this._threePostProcessingId = PostProcessingId.AQUARELLE;
        // this._viewsList.add(ViewId.THREE_MUSEUM);
        // this._viewsList.add(ViewId.MUSEUM_REACT);
    }
}