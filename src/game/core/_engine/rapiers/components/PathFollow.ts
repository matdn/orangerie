import { Vector3 } from "three";
import { Path3D } from "../../threejs/components/Path3D";
import { ActorBase } from "../actors/bases/ActorBase";
import { Path3DDebug } from "../debugs/Path3DDebug";

export class PathFollow {


    private _path3D: Path3D;
    private _progression: number = 0;
    private _actor: ActorBase;

    private _distanceToTarget = 0.1;
    private _rotationY = 0;
    private _move = new Vector3();


    private _helper: Path3DDebug;

    constructor(actor: ActorBase) {
        this._actor = actor;
        this._path3D = new Path3D();
        this._helper = new Path3DDebug();
    }


    public init(): void {
        this.reset();
    }

    public reset(): void {
        this._path3D.reset();
        this._progression = 0;
        this._rotationY = 0;
        this._move.set(0, 0, 0);
    }

    public initFromVector3Array(path: Array<Vector3>): void {
        this.reset();
        this._path3D.initFromVector3Array(path);
        this._helper.draw(path);
    }

    public update(dt: number): void {

        if (this._path3D.length) {
            const pos = this._actor.getGroundPosition();
            const dest = this._path3D.getPositionAtDistance(this._progression);
            const dx = dest.x - pos.x;
            const dy = dest.y - pos.y;
            const dz = dest.z - pos.z;
            const d = Math.sqrt(dx * dx + dy * dy + dz * dz);

            this._rotationY = Math.atan2(-dz, dx) + Math.PI * 0.5;
            this._move.x = this._actor.speed * Math.sin(this._rotationY);
            this._move.z = this._actor.speed * Math.cos(this._rotationY);


            // console.log(d)

            if (d < this._distanceToTarget) {
                this._progression += this._distanceToTarget;
                if (this._progression >= this._path3D.length) {
                    this.reset();
                }
            }
        }
    }

    public getLength(): number {
        return this._path3D.length;
    }

    //#region getters
    public get rotationY(): number { return this._rotationY; }
    public get move(): Vector3 { return this._move; }
    //#endregion
}