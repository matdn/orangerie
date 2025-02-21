import { BoxGeometry, CameraHelper, Fog, Mesh, MeshBasicMaterial } from "three";
import { CameraId } from "../constants/games/CameraId";
import { FollowCameraControllerBase } from "./bases/FollowCameraControllerBase";

export class LobbyCameraController extends FollowCameraControllerBase {

    constructor() {
        super(CameraId.LOBBY);
        this.position.set(0, -10, 150);
        this.camera.rotation.x = Math.PI;
        // this.add(new CameraHelper(this.camera));
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
        // this.position.z += -0.02;
    }
}
