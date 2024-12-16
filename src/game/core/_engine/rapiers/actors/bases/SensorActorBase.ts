import * as THREE from "three";
import { ActorBase } from "./ActorBase";

export class SensorActorBase extends ActorBase {

    protected _sensorType: string | null = null;

    constructor(type: string) {
        super(type);
    }

    public override reset(): void {
        super.reset();
    }


    public override setMesh(mesh: THREE.Mesh): void {
        super.setMesh(mesh);
        this._sensorType = null;
        if (this._mesh.userData) {
            this._sensorType = this._mesh.userData.sensorType || null;
        }
        let numColliders = this._body.numColliders();
        for (let i = 0; i < numColliders; i++) {
            this._body.collider(i).setSensor(true);
        }
        this._collisionBehavior.addIntersectionFromBody(this._body);
        this._world.addActor(this);
    }

    //#region getter
    public get sensorType(): string { return this._sensorType; }
    //#endregion

}
