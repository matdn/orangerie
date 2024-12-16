import { Action } from "cookware";
import { DomEvent } from "spices";
import { GamePadButtonId } from "../../../../constants/GamePadButtonId";

export class Button {

    private _html: HTMLElement;
    private _id: GamePadButtonId;
    private _value: number = 0;

    private _touchIdentifier: number = -1;

    public readonly onPress = new Action<[Button]>();
    public readonly onRelease = new Action<[Button]>();


    constructor(html: HTMLElement, id: GamePadButtonId) {
        this._html = html;
        this._id = id;
    }

    public init(): void {
        this.reset();
        this._addCallbacks();
    }

    public reset(): void {
        this._removeCallbacks();
        this._value = 0;
        this.onPress.removeAll();
        this.onRelease.removeAll();
        this._touchIdentifier = -1;
    }

    private _addCallbacks(): void {
        this._removeCallbacks();
        if (!this._html) return;
        this._html.addEventListener(DomEvent.MOUSE_DOWN, this._onMouseDown, { passive: false });
        this._html.addEventListener(DomEvent.TOUCH_START, this._onMouseDown, { passive: false });
        this._html.addEventListener(DomEvent.MOUSE_DOWN, this._onMouseUp, { passive: false });
        this._html.addEventListener(DomEvent.TOUCH_END, this._onMouseUp, { passive: false });
        this._html.addEventListener(DomEvent.TOUCH_CANCEL, this._onMouseUp, { passive: false });

    }

    private _removeCallbacks(): void {
        if (!this._html) return;
        this._html.removeEventListener(DomEvent.MOUSE_DOWN, this._onMouseDown);
        this._html.removeEventListener(DomEvent.TOUCH_START, this._onMouseDown);
        this._html.removeEventListener(DomEvent.MOUSE_DOWN, this._onMouseUp);
        this._html.removeEventListener(DomEvent.TOUCH_END, this._onMouseUp);
        this._html.removeEventListener(DomEvent.TOUCH_CANCEL, this._onMouseUp);
    }

    private _onMouseDown = (e: MouseEvent): void => {
        e.preventDefault();
        this._getTouchIdentifier(e);
        this._value = 1;
        this.onPress.execute(this);
    }

    private _onMouseUp = (e: MouseEvent): void => {
        e.preventDefault();
        if (e instanceof MouseEvent) {
            this._value = 0;
            this.onRelease.execute(this);
        }
        if (window.TouchEvent && e instanceof TouchEvent && e.changedTouches[0].identifier == this._touchIdentifier) {
            this._value = 0;
            this.onRelease.execute(this);
        }
    }

    private _getTouchIdentifier(e: Event): void {
        this._touchIdentifier = -1;
        if (window.TouchEvent && e instanceof TouchEvent) {
            for (const touch of e.touches) {
                if (touch.target === this._html) {
                    this._touchIdentifier = touch.identifier;
                    return;
                }
            }
        }
    }

    //#region getters
    public get value(): number { return this._value; }
    public get id(): GamePadButtonId { return this._id; }
    public get isPressed(): boolean { return this._value > 0.5; }
    //#endregion

}