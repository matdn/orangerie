import { Action } from "cookware";

export class SoundsTester {

    public static readonly VIEW_ID = 'soundTester';

    private static _SoundIdsList = new Array<string>();

    public static readonly OnChange = new Action();

    public static Init() {
        this._SoundIdsList.length = 0;
    }

    public static AddSoundId(id: string): void {
        this._SoundIdsList.push(id);
        this.OnChange.execute();
    }

    //#region getter/setter
    public static get SoundIdsList(): ReadonlyArray<string> { return this._SoundIdsList; }
    //#endregion
}