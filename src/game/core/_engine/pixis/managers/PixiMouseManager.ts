import { Action } from "cookware";
import { DomEvent } from "spices";

// Core
import { FederatedPointerEvent } from "pixi.js";
import { MainPixi } from "../MainPixi";

export class PixiMouseManager {


    private static _RealMouseX: number = 0;
    private static _RealMouseY: number = 0;
    private static _MouseX: number = 0;
    private static _MouseY: number = 0;
    private static _IsMouseDown: boolean;

    public static readonly OnMouseMove = new Action<[number, number]>();
    public static readonly OnMouseDown = new Action<[number, number]>();
    public static readonly OnMouseUp = new Action<[number, number]>();

    public static Start(): void {
        this.Stop();
        this._AddCallbacks();
    }

    public static Stop(): void {
        this._RemoveCallbacks();
    }

    private static _AddCallbacks(): void {
        this._RemoveCallbacks();
        window.addEventListener(DomEvent.MOUSE_DOWN, this._OnMouseDown);
        window.addEventListener(DomEvent.TOUCH_START, this._OnMouseDown);

        window.addEventListener(DomEvent.MOUSE_UP, this._OnMouseUp);
        window.addEventListener(DomEvent.TOUCH_END, this._OnMouseUp);

        window.addEventListener(DomEvent.MOUSE_MOVE, this._OnMouseMove);
        window.addEventListener(DomEvent.TOUCH_MOVE, this._OnMouseMove);
    }

    private static _RemoveCallbacks(): void {
        window.removeEventListener(DomEvent.MOUSE_DOWN, this._OnMouseDown);
        window.removeEventListener(DomEvent.TOUCH_START, this._OnMouseDown);

        window.removeEventListener(DomEvent.MOUSE_UP, this._OnMouseUp);
        window.removeEventListener(DomEvent.TOUCH_END, this._OnMouseUp);

        window.removeEventListener(DomEvent.MOUSE_MOVE, this._OnMouseMove);
        window.removeEventListener(DomEvent.TOUCH_MOVE, this._OnMouseMove);

    }

    private static _OnMouseDown = (e: Event) => {
        this._IsMouseDown = true;
        this._UpdateMousePosition(e);
        this.OnMouseDown.execute(this._MouseX, this._MouseY);
    }

    private static _OnMouseUp = () => {
        this._IsMouseDown = false;
        this.OnMouseUp.execute(this._MouseX, this._MouseY);
    }


    private static _OnMouseMove = (e: Event) => {
        this._UpdateMousePosition(e);
        this.OnMouseMove.execute(this._MouseX, this._MouseY);
    }

    public static UpdateMousePositionFromEvent(e: Event) {
        if (e instanceof FederatedPointerEvent) {
            this._UpdateMousePositionFromXY(e.clientX, e.clientY);
        }
        if (e instanceof MouseEvent) {
            this._UpdateMousePositionFromXY(e.clientX, e.clientY);
        }
        if (window.TouchEvent && e instanceof TouchEvent) {
            if (e.touches[0]) {
                this._UpdateMousePositionFromXY(e.touches[0].clientX, e.touches[0].clientY);
            }
        }
    }

    // public static UpdateMousePositionFromFederatedPointerEvent(e: FederatedPointerEvent) {
    //     this._UpdateMousePositionFromXY(e.clientX, e.clientY);
    // }

    private static _UpdateMousePosition = (e: Event) => {
        if (!MainPixi.DomRect) return;
        let x = 0;
        let y = 0;
        if (e instanceof MouseEvent) {
            x = e.clientX;
            y = e.clientY;
        }
        if (e instanceof TouchEvent) {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
        }
        this._UpdateMousePositionFromXY(x, y);
        // x = x - MainPixi.DomRect.x;
        // y = y - MainPixi.DomRect.y;

        // this._mouseX = x * MainPixi.GameSizeRatio;
        // this._mouseY = y * MainPixi.GameSizeRatio;
        // console.log(this._mouseX, this._mouseY);
    }

    private static _UpdateMousePositionFromXY(x: number, y: number) {
        x = x - MainPixi.DomRect.x;
        y = y - MainPixi.DomRect.y;
        this._RealMouseX = x;
        this._RealMouseY = y;
        this._MouseX = x * MainPixi.GameSizeRatio;
        this._MouseY = y * MainPixi.GameSizeRatio;
    }

    //#region getter/setter
    public static get RealMouseX(): number { return this._RealMouseX; }
    public static get RealMouseY(): number { return this._RealMouseY; }
    public static get MouseX(): number { return this._MouseX; }
    public static get MouseY(): number { return this._MouseY; }
    public static get IsMouseDown(): boolean { return this._IsMouseDown; }
    //#endregion

}