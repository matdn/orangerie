import { MainPixi } from "../_engine/pixis/MainPixi";
import { SuperTheaterBase } from "./SuperTheaterBase";

export default class PixiTheaterBase extends SuperTheaterBase {

    constructor(theaterId: string, placementId: number) {
        super(theaterId, placementId);

        this._viewsList.add(MainPixi.VIEW_ID);
    }

}