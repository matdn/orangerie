import { Scene } from "./Scene";

export enum EpisodeStatus {
    AVAILABLE = "AVAILABLE",
    BLOCKED = "BLOCKED",
    COMPLETED = "COMPLETED"
}

export class Episode {

    private _name: string;
    private _title: string;
    private _description: string;
    private _status: EpisodeStatus;
    private _startDate: Date;
    private _endDate: Date;
    private _isCompleted: boolean;
    private _score: number;
    private _maxScore: number;
    private _timeSpent: number;
    private _thumbnailUrl: string;
    private _customData: any;
    private readonly _scenes = new Array<Scene>;

    private _isInitialized = false;

    constructor(data?: any) {
        if (data) this.initFromJSON(data);
    }

    public initFromJSON(data: any): void {
        if (this._isInitialized) throw new Error("Episode is already initialized");
        this._isInitialized = true;
        this._name = data.name;
        this._title = data.title;
        this._description = data.description;
        this._status = data.status;
        this._startDate = new Date(data.startDate);
        this._endDate = new Date(data.endDate);
        this._isCompleted = data.isCompleted;
        this._score = data.score;
        this._maxScore = data.maxScore;
        this._timeSpent = data.timeSpent;
        this._thumbnailUrl = data.thumbnailUrl;
        this._customData = data.customData;
        for (const scene of (data.scenes || [])) {
            this._scenes.push(new Scene(scene));
        }
    }

    public setStatus(status: EpisodeStatus): void {
        this._status = status;
    }

    public setScore(score: number): void {
        this._score = score;
    }

    public getSceneByName(name: string): Scene | null {
        for (const scene of this._scenes) {
            if (scene.name === name) return scene;
        }
        return null;
    }

    //#region Getters
    public get name(): string { return this._name; }
    public get title(): string { return this._title; }
    public get description(): string { return this._description; }
    public get thumbnailUrl(): string { return this._thumbnailUrl; }
    public get status(): EpisodeStatus { return this._status; }
    public get startDate(): Date { return this._startDate; }
    public get endDate(): Date { return this._endDate; }
    public get score(): number { return this._score; }
    public get isCompleted(): boolean { return this._isCompleted; }
    public get maxScore(): number { return this._maxScore; }
    public get timeSpent(): number { return this._timeSpent; }
    public get customData(): any { return this._customData; }
    public get scenes(): ReadonlyArray<Scene> { return this._scenes; }
    //#endregion
}
