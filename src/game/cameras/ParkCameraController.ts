import { BoxGeometry, Fog, Mesh, MeshBasicMaterial } from "three";
import { CameraId } from "../constants/games/CameraId";
import { FollowCameraControllerBase } from "./bases/FollowCameraControllerBase";

export class ParkCameraController extends FollowCameraControllerBase {

    constructor() {
        super(CameraId.PARK);
        // this.rotateY(Math.PI);
        this.position.set(0, 2, -20);
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
