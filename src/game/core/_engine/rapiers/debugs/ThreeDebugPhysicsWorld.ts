import { World } from "@dimforge/rapier3d-compat";
import { BufferAttribute, BufferGeometry, LineBasicMaterial, LineSegments } from "three";
import { MainThree } from "../../threejs/MainThree";

export class ThreeDebugPhysicsWorld {

    private static _DebugLines: LineSegments;
    private static _DebugMaterial = new LineBasicMaterial({ color: 0x00ff00 });
    private static _DebugGeometry: BufferGeometry;

    private static _IsInit: boolean = false;

    public static Init() {
        if (this._IsInit) return;
        this._IsInit = true;
        this._DebugGeometry = new BufferGeometry();
        this._DebugLines = new LineSegments(this._DebugGeometry, this._DebugMaterial);
    }

    public static Draw(world: World): void {
        this.Init();
        const { vertices } = world.debugRender();
        if (!this._DebugLines.parent) MainThree.Scene.add(this._DebugLines);
        this._DebugGeometry.setAttribute('position', new BufferAttribute(vertices, 3));
        this._DebugLines.geometry = this._DebugGeometry;
    }
}