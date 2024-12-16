import { Collider, ColliderDesc, RigidBody, RigidBodyDesc, TempContactManifold, World } from "@dimforge/rapier3d-compat";
import { Action } from "cookware";
import { Mesh, Object3D, Vector3 } from "three";
import { ActorBase } from "../actors/bases/ActorBase";
import { ThreeDebugPhysicsWorld } from "../debugs/ThreeDebugPhysicsWorld";
import { PhysicsUtils } from "../utils/PhysicsUtils";

export class PhysicsWorld {

    private _debug: boolean = false;
    // private _debug: boolean = true;

    private _world: World;
    private _maxFPS: number = 60;
    private _collidersMap: Map<Collider, ActorBase> = new Map();
    protected _actorsList = new Array<ActorBase>();

    public readonly onAddActor = new Action<[ActorBase]>();
    public readonly onDeadByKill = new Action<[ActorBase]>();
    public readonly onRemoveActor = new Action<[ActorBase]>();


    constructor(gravity: Vector3 = new Vector3(0, -9.81, 0)) {
        this._world = new World(gravity);
        this._world.timestep = 1 / this._maxFPS;
        this._world.integrationParameters.maxCcdSubsteps = 4;
    }


    public addPhysicFromObjects(object: Object3D): Array<{ bodyDesc: RigidBodyDesc, body: RigidBody, collider: Collider; }> {
        const objects = new Array<{ bodyDesc: RigidBodyDesc, body: RigidBody, collider: Collider; }>();
        object.traverse((child) => {
            if (child instanceof Mesh) {
                const o = PhysicsUtils.CreatePhysicsFromMesh(this, child);
                if (o) objects.push(o);
            }
        });
        return objects;
    }

    public init(): void {
        this.reset();
    }

    public reset(): void {
        this._collidersMap.clear();
        const num = this._world.bodies.len();
        const bodies = new Array<RigidBody>();
        this._world.bodies.forEach((body) => {
            bodies.push(body);
        });
        for (const body of bodies) {
            this._world.removeRigidBody(body);
        }
        for (const actor of this._actorsList) {
            actor.reset();
            actor.removeFromWorld();
        }
        this._actorsList.length = 0;
    }

    public update(dt: number): void {
        if (dt > 200) return;
        for (const actor of this._actorsList) actor.update(dt);
        this._world.timestep = dt * 0.001;
        this._world.step();
        if (this._debug) ThreeDebugPhysicsWorld.Draw(this._world);
    }

    //
    // TOOLS
    //
    public createRigidBody(decs: RigidBodyDesc): RigidBody {
        return this._world.createRigidBody(decs);
    }


    public removeRigidBody(body: RigidBody): void {
        if (!this._world.bodies.contains(body.handle)) return;
        const numColliders = body.numColliders();
        for (let i = 0; i < numColliders; i++) {
            const collider = body.collider(i);
            if (this._collidersMap.has(collider)) this._collidersMap.delete(collider);
        }
        this._world.removeRigidBody(body);
    }

    public createCollider(decs: ColliderDesc, body?: RigidBody): Collider {
        const collider = this._world.createCollider(decs, body);
        return collider;
    }

    public contactPairsWith(collider: Collider, callback: (otherCollider: Collider) => void): void {
        this._world.contactPairsWith(collider, callback);
    }

    public contactPair(collider1: Collider, collider2: Collider, callback: (manifold: TempContactManifold, flipped: boolean) => void): void {
        this._world.contactPair(collider1, collider2, callback);
    }

    public intersectionPairsWith(collider: Collider, callback: (otherCollider: Collider) => void): void {
        this._world.intersectionPairsWith(collider, callback);
    }

    public intersectionPair(collider1: Collider, collider2: Collider): boolean {
        return this._world.intersectionPair(collider1, collider2);
    }

    public getActorFromCollider(collider: Collider): ActorBase | null {
        if (!this._collidersMap.has(collider)) return null;
        return this._collidersMap.get(collider);
    }

    public addActor(actor: ActorBase): void {
        actor.setWorld(this);
        actor.onDeadByKill.add(this._onDeadByKill);
        const numColliders = actor.body?.numColliders() || 0;
        // this.updateActor(actor);
        for (let i = 0; i < numColliders; i++) {
            const collider = actor.body.collider(i);
            this._collidersMap.set(collider, actor);
        }
        if (this._actorsList.indexOf(actor) < 0) this._actorsList.push(actor);
        this.onAddActor.execute(actor);
    }

    // public updateActor(actor: ActorBase): void {
    //     const numColliders = actor.body?.numColliders() || 0;
    //     for (let i = 0; i < numColliders; i++) {
    //         const collider = actor.body.collider(i);
    //         this._collidersMap.set(collider, actor);
    //     }
    // }

    public removeActor(actor: ActorBase): void {
        actor.onDeadByKill.remove(this._onDeadByKill);
        this.removeRigidBody(actor.body);
        const index = this._actorsList.indexOf(actor);
        if (index !== -1) this._actorsList.splice(index, 1);
        actor.removeFromWorld();
        this.onRemoveActor.execute(actor);
    }

    private _onDeadByKill = (actor: ActorBase): void => {
        this.onDeadByKill.execute(actor);
    }

    //#region Getters and Setters
    public get world(): World { return this._world; }
    public get actorsList(): ReadonlyArray<ActorBase> { return this._actorsList; }
    //#endregion
}