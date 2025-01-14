import { BoxGeometry, Fog, Mesh, MeshBasicMaterial } from "three";
import { CameraId } from "../constants/games/CameraId";
import { FollowCameraControllerBase } from "./bases/FollowCameraControllerBase";
import { Object3DBase } from "../core/_engine/threejs/views/components/Object3DBase";

export class MuseumCameraController extends FollowCameraControllerBase {

    constructor() {
        super(CameraId.MUSEUM);
        // this.rotateY(Math.PI);
        this.position.set(-8, 0, 0);
        this.lookAt(0, 0, 0);
    }

    public override start(): void {
        super.start();
    }

    public stop(): void {
        super.stop();
    }

    protected override _update(dt: number): void {
        super._update(dt);
    }
}
