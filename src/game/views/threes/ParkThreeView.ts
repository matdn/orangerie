import { Object3D } from "three";
import { Object3DId } from "../../constants/games/Object3DId";
import { ViewId } from "../../constants/views/ViewId";
import { ViewPlacementId } from "../../constants/views/ViewPlacementId";
import { Object3DsProxy } from "../../core/_engine/threejs/proxies/Object3DsProxy";
import { WithoutTransitionThreeView } from "../../core/_engine/threejs/views/WithoutTransitionThreeView";

export default class ParkThreeView extends WithoutTransitionThreeView {
    private _parkMesh: Object3D;

    constructor() {
        super(ViewId.THREE_PARK, ViewPlacementId.THREE_MAIN);
        this._parkMesh = Object3DsProxy.GetObject3D(Object3DId.PARK);
        this.add(this._parkMesh);
        console.log(this._parkMesh);
    }



    public override update(dt: number): void {
        super.update(dt);

    }
}
