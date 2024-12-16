import { Collider, RigidBody } from "@dimforge/rapier3d-compat";
import { Action } from "cookware";
import { ActorBase } from "../actors/bases/ActorBase";
import { BehaviorBase } from "./bases/BehaviorBase";


export class CollisionBehavior extends BehaviorBase {

    public static readonly TYPE = 'collision';

    protected _lastContactingActorsList = new Set<ActorBase>();
    protected _contactingActorsList = new Set<ActorBase>();
    protected _contactingColidersList = new Set<Collider>();
    protected _lastIntersectingActorsList = new Set<ActorBase>();
    protected _intersectingActorsList = new Set<ActorBase>();
    protected _intersectingColliderList = new Set<Collider>();
    protected _contacts: Collider[] = [];
    protected _intersections: Collider[] = [];



    public readonly onContactBegin = new Action<[ActorBase, ActorBase]>();
    public readonly onContactEnd = new Action<[ActorBase, ActorBase]>();
    public readonly onIntersectionBegin = new Action<[ActorBase, ActorBase]>();
    public readonly onIntersectionEnd = new Action<[ActorBase, ActorBase]>();

    public debug: boolean = false;

    constructor(actor: ActorBase, type: string = CollisionBehavior.TYPE) {
        super(type, actor);
    }

    public removeAll(): void {
        this.reset();
        this._contacts.length = 0;
        this._intersections.length = 0;
    }

    public override init(): void {
        this.reset();
        super.init();
    }

    public addConttactFromBody(body: RigidBody): void {
        const num = body.numColliders();
        for (let i = 0; i < num; i++) {
            this.addContact(body.collider(i));
        }
    }

    public addIntersectionFromBody(body: RigidBody): void {
        const num = body.numColliders();
        for (let i = 0; i < num; i++) {
            this.addIntersection(body.collider(i));
        }
    }

    public addContact(collider: Collider): void {
        this._contacts.push(collider);
    }

    public addIntersection(collider: Collider): void {
        this._intersections.push(collider);
    }

    public override reset(): void {
        super.reset();
        this._lastContactingActorsList.clear();
        this._contactingActorsList.clear();
        this._contactingColidersList.clear();
        this._lastIntersectingActorsList.clear();
        this._intersectingColliderList.clear();
        this._intersectingActorsList.clear();
        // this.onContactBegin.removeAll();
        // this.onContactEnd.removeAll();
        // this.onIntersectionBegin.removeAll();
        // this.onIntersectionEnd.removeAll();
    }

    public override update(dt: number): void {
        super.update(dt);
        if (!this._actor) return;
        if (!this._actor.world) return;
        this._copySet(this._contactingActorsList, this._lastContactingActorsList);
        this._copySet(this._intersectingActorsList, this._lastIntersectingActorsList);
        this._contactingActorsList.clear();
        this._intersectingActorsList.clear();
        this._contactingColidersList.clear();
        this._intersectingColliderList.clear();
        for (const collider of this._contacts) {
            this._actor.world.contactPairsWith(collider, (otherCollider: Collider) => {
                this._actor.world.contactPair(collider, otherCollider, (manifold, flipped) => {
                    if (manifold.numContacts() > 0) {
                        this._contactingColidersList.add(otherCollider);
                        const actor = this._actor.world.getActorFromCollider(otherCollider);
                        if (actor) {
                            this._contactingActorsList.add(actor);
                            if (!this._lastContactingActorsList.has(actor)) {
                                this.onContactBegin.execute(this._actor, actor);
                            }
                        }
                    }
                });
            });
        }
        for (const collider of this._intersections) {
            this._actor.world.intersectionPairsWith(collider, (otherCollider: Collider) => {
                if (this._actor.world.intersectionPair(collider, otherCollider)) {
                    this._intersectingColliderList.add(otherCollider);
                    const actor = this._actor.world.getActorFromCollider(otherCollider);
                    if (actor) {
                        this._intersectingActorsList.add(actor);
                        if (!this._lastIntersectingActorsList.has(actor)) {
                            this.onIntersectionBegin.execute(this._actor, actor);
                            this._lastIntersectingActorsList.delete(actor);
                        }
                    }
                }
            });
        }
        for (let actor of this._lastContactingActorsList) {
            if (!this._contactingActorsList.has(actor)) {
                this.onContactEnd.execute(this._actor, actor);
            }
        }

        for (let actor of this._lastIntersectingActorsList) {
            if (!this._intersectingActorsList.has(actor)) {
                this.onIntersectionEnd.execute(this._actor, actor);
            }
        }
    }

    private _copySet(from: Set<ActorBase>, to: Set<ActorBase>): void {
        to.clear();
        for (const actor of from) {
            to.add(actor);
        }
    }

    public getIsContacting(actor: ActorBase): boolean {
        return this._contactingActorsList.has(actor);
    }

    public getIsIntersecting(actor: ActorBase): boolean {
        return this._intersectingActorsList.has(actor);
    }

    public getIsIntersectingSensorType(type: string): boolean {
        for (const actor of this._intersectingActorsList) {
            if (actor['sensorType'] === type) return true;
        }
        return false;
    }

    public getIsIntersectingActorType(type: string): boolean {
        for (const actor of this._intersectingActorsList) {
            if (actor.actorType === type) return true;
        }
        return false;
    }


    //#region getter
    public get contactingActorsList(): Set<ActorBase> { return this._contactingActorsList; }
    public get contactingColidersList(): Set<Collider> { return this._contactingColidersList; }
    public get intersectingActorsList(): Set<ActorBase> { return this._intersectingActorsList; }
    public get intersectingColliderList(): Set<Collider> { return this._intersectingColliderList; }
    //#endregion

}
