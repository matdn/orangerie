import { Action, Ticker } from "cookware";
import { Vector2 } from "three";
import { AssetId } from "../constants/games/AssetId";
import { LUTData } from "./components/LUTData";

export class DayCycleManager {


    private static readonly _LUTDatasList: LUTData[] = [];
    private static _Hours: number = 0;
    // private static _Hours: number = 0;
    private static _LUT_A: LUTData;
    private static _LUT_B: LUTData;
    private static _LutAmount: number = 0;
    private static _SkyIntensity: number = 1;

    public static readonly OnChangeHour = new Action();

    private static readonly _HourConversion = 1 / 1000 / 60 / 60;
    private static readonly _Speed = 100;

    public static Init(): void {
        this._LUTDatasList.push(new LUTData(0, 5, 0.02, new Vector2(0.5, 0)));
        this._LUTDatasList.push(new LUTData(5, 8, 0.02, new Vector2(0.5, 0)));
        this._LUTDatasList.push(new LUTData(8, 18, 1, new Vector2(0, 0.5)));
        this._LUTDatasList.push(new LUTData(18, 20, 1, new Vector2(0, 0.5)));
        this._LUTDatasList.push(new LUTData(20, 22, 0.5, new Vector2(0.5, 0.5)));
        this._LUTDatasList.push(new LUTData(22, 24, 0.1, new Vector2(0, 0)));
        this._LUTDatasList.push(this._LUTDatasList[0]);
        this._Refresh();
        Ticker.Add(this._Update);
    }

    public static InitStartTime(): void {
        // const start = new Date();
        // this.SetHours(start.getHours() + start.getMinutes() / 60 + start.getSeconds() / 3600);
        this.SetHours(8);
        // this.SetHours(new Date().getHours());
    }


    private static readonly _Update = (dt: number): void => {
        dt = dt * this._HourConversion * this._Speed;
        this.SetHours(this._Hours + dt);
    };


    public static SetHours(hour: number): void {
        hour = ((hour % 24 + 24) % 24);
        this._Hours = hour;
        this._Refresh();
        this.OnChangeHour.execute();
    }


    private static _Refresh(): void {
        const h = this._Hours;
        let indexA = 0;
        for (let i = 0; i < this._LUTDatasList.length - 1; i++) {
            const lut = this._LUTDatasList[i];
            if (h >= lut.startHour && h < lut.endHour) {
                indexA = i;
            }
        }
        let indexB = indexA + 1;
        this._LUT_A = this._LUTDatasList[indexA];
        this._LUT_B = this._LUTDatasList[indexB];

        let p = (h - this._LUT_A.startHour) / (this._LUT_A.endHour - this._LUT_A.startHour);
        if (p < 0) p = 0;
        if (p > 1) p = 1;
        this._LutAmount = p;
        this._SkyIntensity = this._LUT_A.skyIntensity + (this._LUT_B.skyIntensity - this._LUT_A.skyIntensity) * p;
    }

    //#region Getters
    public static get LutAmount(): number { return this._LutAmount; }
    public static get LUT_A(): LUTData { return this._LUT_A; }
    public static get LUT_B(): LUTData { return this._LUT_B; }
    public static get SkyIntensity(): number { return this._SkyIntensity; }
    public static get Hours(): number { return this._Hours; }
    public static get Progression(): number { return this._Hours / 24; }
    //#endregion


}