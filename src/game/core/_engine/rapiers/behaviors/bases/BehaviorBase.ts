
import { ActorBase } from "../../actors/bases/ActorBase";

export abstract class BehaviorBase {

    private static _Counter: number = 0;
    public readonly uid: string = 'BehaviorBase_' + (BehaviorBase._Counter++);

    protected _actor: ActorBase;
    protected _priority: number = 0;
    protected _blockOtherBehaviors: boolean = false;
    protected _behaviorType: string;
    protected _isEnable: boolean = true;

    constructor(behaviorType: string, actor: ActorBase, priority: number = 0, blockOther: boolean = false) {
        this._behaviorType = behaviorType;
        this._actor = actor;
        this._priority = priority;
        this._blockOtherBehaviors = blockOther;
    }

    public init(): void {
        // 
    }



    public reset(): void {
        // 
    }

    public start(): void {
        // 
    }

    public stop(): void {
        // 
    }

    public update(dt: number): void {
        // 
    }

    public enable(): void {
        this._isEnable = true;
    }

    public disable(): void {
        this._isEnable = false;
    }


    //#region  getter
    public get priority(): number { return this._priority; }
    public get blockOtherBehaviors(): boolean { return this._blockOtherBehaviors; }
    public get behaviorType(): string { return this._behaviorType; }
    public get actor(): ActorBase { return this._actor; }
    public get isEnable(): boolean { return this._isEnable; }
    //#endregion


}