import { SuperViewBase } from "../../../../views/bases/SuperViewBase";

export class HTMLViewBase extends SuperViewBase {

    protected _html: HTMLElement | null = null;

    public setHTMLElement(html: HTMLElement | null): void {
        this._html = html;
        if (this._html) {
            if (this._placementId > -1) {
                this._html.style.zIndex = `${this._placementId}`;
            }
        }
    }

    public get html(): HTMLElement | null { return this._html; }
}