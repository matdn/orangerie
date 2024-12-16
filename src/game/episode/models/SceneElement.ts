import { GameId } from '../../constants/games/GameId';

export class SceneElement {

    private _name: GameId;
    private _allowCustomScore: boolean;
    private _score: number;
    private _isCollected: boolean = false;
    private _isInitialized = false;

    constructor(data?: any) {
        if (data) this.initFromJSON(data);
    }

    public initFromJSON(data: any): void {
        if (this._isInitialized) throw new Error("Element is already initialized");
        this._isInitialized = true;
        this._name = data.name;
        this._allowCustomScore = data.allowCustomScore;
        this._score = data.score;
        this._isCollected = data.isCollected;
    }

    public setScore(score: number): void {
        this._score = score;
    }

    public setISCollected(isCollected: boolean): void {
        this._isCollected = isCollected; 
    }

    //#region Getters
    public get name(): string { return this._name; }
    public get allowCustomScore(): boolean { return this._allowCustomScore; }
    public get score(): number { return this._score; }
    public get isCollected(): boolean { return this._isCollected; }
    //#endregion

}
