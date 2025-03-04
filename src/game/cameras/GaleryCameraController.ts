import { BoxGeometry, CameraHelper, Fog, Mesh, MeshBasicMaterial } from "three";
import { CameraId } from "../constants/games/CameraId";
import { FollowCameraControllerBase } from "./bases/FollowCameraControllerBase";

export class GaleryCameraController extends FollowCameraControllerBase {

    constructor() {
        super(CameraId.GALERY);
        // this.rotation.z = Math.PI / 6;
        this.position.set(0, 0, -80);
        // this.camera.rotation.x = Math.PI;
        // this.add(new CameraHelper(this.camera));
        // this.lookAt(0, 0, 0);
    }

    public override start(): void {
        super.start();
    }

    public stop(): void {
        super.stop();
    }

    protected override _update(dt: number): void {
        super._update(dt);
        // this.position.z += -0.02;
    }
}
