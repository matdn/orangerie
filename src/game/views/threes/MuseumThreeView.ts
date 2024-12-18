import { ViewId } from "../../constants/views/ViewId";
import { ViewPlacementId } from "../../constants/views/ViewPlacementId";
import { ThreeCameraControllerBase } from "../../core/_engine/threejs/cameras/bases/ThreeCameraControllerBase";
import { ThreeCamerasProxy } from "../../core/_engine/threejs/proxies/ThreeCamerasProxy";
import { WithoutTransitionThreeView } from "../../core/_engine/threejs/views/WithoutTransitionThreeView";

export default class MuseumThreeView extends WithoutTransitionThreeView {
    private _camera: ThreeCameraControllerBase;
    constructor() {
        super(ViewId.THREE_MUSEUM, ViewPlacementId.THREE_MAIN);

        this._camera = ThreeCamerasProxy.CamerasMap.get('MUSEUM');
        this.add(this._camera);

    }
}
