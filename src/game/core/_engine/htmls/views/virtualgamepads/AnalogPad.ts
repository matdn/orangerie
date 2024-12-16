import { DomEvent } from "spices";

export class AnalogPad {

    private static _Compteur: number = 0;
    private _uid: string = `AnalogPad_${AnalogPad._Compteur++}`;

    private _html: HTMLElement;
    private _padContainer: HTMLElement;
    private _pad: HTMLElement;
    private _mouseDownPosition: { x: number, y: number } = { x: 0, y: 0 };

    private _htmlRect: DOMRect;
    private _padContainerRect: DOMRect;
    private _padContainerOffset: { x: number, y: number } = { x: 0, y: 0 };

    private _maxRadius: number = 0;
    private _radius: number = 0;
    private _angle: number = 0;

    private _analogX: number = 0;
    private _analogY: number = 0;

    private _touchIdentifier: number = -1;


    constructor() {

    }

    public setHTMLElement(html: HTMLElement): void {
        this._removeCallbacks();
        this._html = html;
        this._padContainer = this._html.querySelector('.padContainer');
        this._pad = this._html.querySelector('.pad');
    }

    public init(): void {
        if (!this._html) return;
        this._addCallbacks();

    }

    public reset(): void {
        this._removeCallbacks();
        this._padContainerOffset = { x: 0, y: 0 };
        this._refreshPadContainerPosition();
        this._refreshPadPosition();
        this._radius = 0;
        this._angle = 0;
        this._maxRadius = 0;
        this._analogX = 0;
        this._analogY = 0;
        this._touchIdentifier = -1;
    }

    private _addCallbacks(): void {
        if (!this._html) return;
        this._removeCallbacks();
        this._html.addEventListener(DomEvent.MOUSE_DOWN, this._onMouseDown, { passive: false });
        this._html.addEventListener(DomEvent.TOUCH_START, this._onMouseDown, { passive: false });
    }

    private _removeCallbacks(): void {
        if (!this._html) return;
        this._removeMoveCallbacks();
        this._html.removeEventListener(DomEvent.MOUSE_DOWN, this._onMouseDown);
        this._html.removeEventListener(DomEvent.TOUCH_START, this._onMouseDown);
    }

    private _addMoveCallbacks(): void {
        this._removeMoveCallbacks();
        window.addEventListener(DomEvent.MOUSE_MOVE, this._onMouseMove, { passive: false });
        window.addEventListener(DomEvent.TOUCH_MOVE, this._onMouseMove, { passive: false });
        window.addEventListener(DomEvent.MOUSE_UP, this._onMouseUp, { passive: false });
        window.addEventListener(DomEvent.TOUCH_END, this._onMouseUp, { passive: false });
        window.addEventListener(DomEvent.TOUCH_CANCEL, this._onMouseUp, { passive: false });
    }

    private _removeMoveCallbacks(): void {
        window.removeEventListener(DomEvent.MOUSE_UP, this._onMouseUp);
        window.removeEventListener(DomEvent.TOUCH_END, this._onMouseUp);
        window.removeEventListener(DomEvent.TOUCH_CANCEL, this._onMouseUp);
        window.removeEventListener(DomEvent.MOUSE_MOVE, this._onMouseMove);
        window.removeEventListener(DomEvent.TOUCH_MOVE, this._onMouseMove);
    }

    private _onMouseDown = (e: MouseEvent): void => {
        this._getTouchIdentifier(e);
        this._htmlRect = this._html.getBoundingClientRect();
        this._padContainerRect = this._padContainer.getBoundingClientRect();
        this._maxRadius = this._padContainerRect.width * 0.5;
        this._mouseDownPosition = this._getMousePosition(e);
        this._padContainerOffset = {
            x: this._mouseDownPosition.x - (this._htmlRect.left + this._htmlRect.width * 0.5),
            y: this._mouseDownPosition.y - (this._htmlRect.top + this._htmlRect.height * 0.5)
        };
        this._angle = 0;
        this._radius = 0;
        this._analogX = 0;
        this._analogY = 0;
        this._refreshPadContainerPosition();
        this._refreshPadPosition();
        this._addMoveCallbacks();
    }

    private _onMouseMove = (e: MouseEvent): void => {
        const { x: mx, y: my } = this._getMousePosition(e);
        const dx = mx - this._mouseDownPosition.x;
        const dy = my - this._mouseDownPosition.y;
        this._radius = Math.min(Math.sqrt(dx * dx + dy * dy), this._maxRadius);
        this._angle = Math.atan2(dy, dx);

        this._analogX = this._radius * Math.cos(this._angle) / this._maxRadius;
        this._analogY = -this._radius * Math.sin(this._angle) / this._maxRadius;

        this._refreshPadPosition();
    }

    private _onMouseUp = (e: MouseEvent): void => {
        if (this._isMouseInPadContainerOnMouseUp(e)) return;
        this._padContainerOffset = { x: 0, y: 0 };
        this._angle = 0;
        this._radius = 0;
        this._analogX = 0;
        this._analogY = 0;
        this._refreshPadContainerPosition();
        this._removeMoveCallbacks();
        this._refreshPadPosition();
    }

    private _refreshPadContainerPosition(): void {
        if (!this._padContainer) return;
        this._padContainer.style.left = `${this._padContainerOffset.x}px`;
        this._padContainer.style.top = `${this._padContainerOffset.y}px`;
    }

    private _refreshPadPosition(): void {
        if (!this._pad) return;
        if (!this._padContainerRect) return;
        const x = this._padContainerRect.width * 0.5 + this._radius * Math.cos(this._angle);
        const y = this._padContainerRect.height * 0.5 + this._radius * Math.sin(this._angle);
        this._pad.style.left = `${x}px`;
        this._pad.style.top = `${y}px`;
    }

    private _getMousePosition(e: Event): { x: number, y: number } {
        e.preventDefault();
        if (e instanceof MouseEvent) {
            return { x: e.clientX, y: e.clientY };
        }

        if (window.TouchEvent && e instanceof TouchEvent) {
            for (const touch of e.touches) {
                if (touch.identifier == this._touchIdentifier) {
                    return { x: touch.clientX, y: touch.clientY };
                }
            }
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

    private _isMouseInPadContainerOnMouseUp(e: Event): boolean {
        if (e instanceof MouseEvent) {
            return false;
        }
        if (window.TouchEvent && e instanceof TouchEvent) {
            for (const touch of e.touches) {
                if (touch.target === this._html) {
                    return true;
                }
            }
        }
        return false;
    }

    //#region getter
    public get analogX(): number { return this._analogX; }
    public get analogY(): number { return this._analogY; }
    public get strengh(): number { return this._radius / this._maxRadius; }
    public get rotation(): number { return this._angle; }
    //#endregion


}