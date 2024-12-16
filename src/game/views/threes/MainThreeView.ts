import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";
import { ViewId } from "../../constants/views/ViewId";
import { ViewPlacementId } from "../../constants/views/ViewPlacementId";
import { WithoutTransitionThreeView } from "../../core/_engine/threejs/views/WithoutTransitionThreeView";

export default class MainThreeView extends WithoutTransitionThreeView {
    constructor() {
        super(ViewId.THREE_MAIN, ViewPlacementId.THREE_MAIN);
        this.add(new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial({ color: 0xff0000 })));
    }

}


