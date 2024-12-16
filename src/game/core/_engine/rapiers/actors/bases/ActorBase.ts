import { Quaternion, RigidBody, Vector3 } from "@dimforge/rapier3d-compat";
import { Action } from "cookware";
import * as THREE from "three";
import { CollisionBehavior } from "../../behaviors/CollisionBehavior";
import { BehaviorBase } from "../../behaviors/bases/BehaviorBase";
import { PhysicsUtils } from "../../utils/PhysicsUtils";
import { PhysicsWorld } from "../../world/PhysicsWorld";

export class ActorBase {

    protected _damageInflicted: number = 0;
    protected _life: number = 100;
    protected _damage: number = 0;

    protected _actorType: string;
    protected _world: PhysicsWorld;
    protected _body: RigidBody | null = null;

    protected _initPosition = new Vector3(0, 0, 0);
    protected _initRotation = new Quaternion(0, 0, 0, 0);
    protected _groundOffset = new Vector3(0, 0, 0);
    protected _mesh: THREE.Mesh | null = null;


    protected _behaviors = new Array<BehaviorBase>();
    protected _behaviorsMap = new Map<string, BehaviorBase>();


    protected _zeroVector = new Vector3(0, 0, 0);
    protected _zeroQuaternion = new Quaternion(0, 0, 0, 1);

    protected _actorState: string = '';
    protected _groundPosition = new THREE.Vector3();

    protected _collisionBehavior: CollisionBehavior;

    protected _speed: number = 0;

    protected _userData: any;

    public readonly onDeadByKill = new Action<[ActorBase]>();

    constructor(actorType: string, world: PhysicsWorld = null) {
        this._actorType = actorType;
        this._world = world;
        this._collisionBehavior = new CollisionBehavior(this);
        this._addBehavior(this._collisionBehavior);
    }

    public setWorld(world: PhysicsWorld): void {
        if (this._world == world) return;
        this.removeFromWorld();
        this._world = world;
        for (const behavior of this._behaviors) behavior.init();
    }

    public setUserData(data: any): void {
        this._userData = data;
    }

    public setMesh(mesh: THREE.Mesh): void {
        this._mesh = mesh;
        const { bodyDesc, body, collider } = PhysicsUtils.CreatePhysicsFromMesh(this._world, this._mesh, this);
        this._body = body;
        this._collisionBehavior.removeAll();
        this._collisionBehavior.addConttactFromBody(body);

        const p = this._body.translation();
        const pos = new THREE.Vector3(p.x, p.y, p.z);
        const r = this._body.rotation();
        const rot = new THREE.Quaternion(r.x, r.y, r.z, r.w);

        this.setInitTransformation(pos, rot);
    }

    public removeFromWorld(): void {
        this.reset();
        this._body = null;
        this._world = null;
    }

    protected _addBehavior(behavior: BehaviorBase): void {
        if (this._behaviors.includes(behavior)) return;
        this._behaviors.push(behavior);
        this._behaviors.sort(this._sortBehaviors);
        this._behaviorsMap.set(behavior.behaviorType, behavior);
    }

    private _sortBehaviors(a: BehaviorBase, b: BehaviorBase): number {
        if (a.priority > b.priority) return -1;
        else if (a.priority < b.priority) return 1;
        return 0
    }

    public enableBehavior(type: string): void {
        const behavior = this.getBehavior(type);
        if (behavior) behavior.enable();
    }

    public disableBehavior(type: string): void {
        const behavior = this.getBehavior(type);
        if (behavior) behavior.disable();
    }

    public init(): void {
        this.reset();
        for (const behavior of this._behaviors) behavior.init();
    }


    public reset(): void {
        this._resetPosition();
        this._damageInflicted = 0;
        for (const behavior of this._behaviors) behavior.reset();
    }


    protected _resetPosition(): void {
        if (this._body && this._world?.world.bodies.contains(this._body.handle)) {
            this._body.setRotation(this._zeroQuaternion, true);
            this._body.setLinvel(this._zeroVector, true);
            this._body.setAngvel(this._zeroVector, true);
            this._body.setTranslation(this._initPosition, true);
            this._body.setRotation(this._initRotation, true);
        }
    }

    public start(): void {
        for (const behavior of this._behaviors) behavior.start();
    }

    public stop(): void {
        for (const behavior of this._behaviors) behavior.stop();
    }

    public update(dt: number): void {
        for (const behavior of this._behaviors) {
            if (!behavior.isEnable) continue;
            behavior.update(dt);
            if (behavior.blockOtherBehaviors) return;
        }
        if (this._damageInflicted >= this._life) {
            this.onDeadByKill.execute(this);
            this._world.removeActor(this);
        }
    }

    public getLinearVelocity(): number {
        const vel = this._body.linvel();
        return Math.sqrt(vel.x * vel.x + vel.y * vel.y + vel.z * vel.z);
    }


    public setActorState(state: string): void {
        this._actorState = state;
    }

    public getGroundPosition(): THREE.Vector3 {
        const pos = this._body.translation();
        this._groundPosition.x = pos.x - this._groundOffset.x;
        this._groundPosition.y = pos.y - this._groundOffset.y;
        this._groundPosition.z = pos.z - this._groundOffset.z;
        return this._groundPosition;
    }

    public setInitTransformation(pos: THREE.Vector3, rotation: THREE.Quaternion): void {
        this._initPosition.x = pos.x + this._groundOffset.x;
        this._initPosition.y = pos.y + this._groundOffset.y;
        this._initPosition.z = pos.z + this._groundOffset.z;
        this._initRotation.x = rotation.x;
        this._initRotation.y = rotation.y;
        this._initRotation.z = rotation.z;
        this._initRotation.w = rotation.w;

        this._body?.setTranslation(this._initPosition, true);
        this._body?.setRotation(this._initRotation, true);

    }

    public setGroundPosition(pos: Vector3): void {
        this._groundPosition.x = pos.x + this._groundOffset.x;
        this._groundPosition.y = pos.y + this._groundOffset.y;
        this._groundPosition.z = pos.z + this._groundOffset.z;
        this._body.setTranslation(this._groundPosition, false)
    }

    public getWorldDirection(target: THREE.Vector3): void {
        const rotation = this._body.rotation();
        target.x = 0;
        target.y = 0;
        target.z = 1;
        target.applyQuaternion(rotation);
        target.normalize();
    }

    public getBehavior<T extends BehaviorBase>(type: string): T {
        return this._behaviorsMap.get(type) as T;
    }

    public canJump(): boolean {
        return false;
    }

    public addDamage(damage: number): void {
        this._damageInflicted += damage;
    }


    //#region Getters and Setters
    public get body() { return this._body; }
    public get actorState(): string { return this._actorState; }
    public get behaviors(): Array<BehaviorBase> { return this._behaviors; }
    public get actorType(): string { return this._actorType; }
    public get world(): PhysicsWorld { return this._world; }
    public get collisionBehavior(): CollisionBehavior { return this._collisionBehavior; }
    public get groundOffset(): Vector3 { return this._groundOffset; }
    public get initPosition(): Vector3 { return this._initPosition; }
    public get initRotation(): Quaternion { return this._initRotation; }
    public get mesh(): THREE.Mesh { return this._mesh; }
    public get speed(): number { return this._speed; }
    public get userData(): any { return this._userData; }
    public get life(): number { return this._life; }
    public get damage(): number { return this._damage; }
    //#endregion


}