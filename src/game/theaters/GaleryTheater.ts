import { GaleryInitCommand } from "../commands/inits/project/GaleryInitCommand";
import { TheaterId } from "../constants/theaters/TheaterId";
import { TheaterPlacementId } from "../constants/theaters/TheaterPlacementId";
import { ViewId } from "../constants/views/ViewId";
import { SuperTheaterBase } from "../core/theaters/SuperTheaterBase";

export class GaleryTheater extends SuperTheaterBase {

    constructor() {
        super(TheaterId.GALERY, TheaterPlacementId.MAIN);

        this._initCommandsList.push(new GaleryInitCommand());
        this._viewsList.add(ViewId.GALERY_REACT);

    }
    public override init(): void {
        super.init();
    }
}