import { SceneElement } from "./SceneElement";

export class Scene {

    private _name: string;
    private readonly _elements = new Array<SceneElement>;
    private _isInitialized = false;

    constructor(data?: any) {
        if (data) this.initFromJSON(data);
    }

    public initFromJSON(data: any): void {
        if (this._isInitialized) throw new Error("Scene is already initialized");
        this._isInitialized = true;
        this._name = data.name;
        for (const elt of data.elements) {
            this._elements.push(new SceneElement(elt));
        }
    }

    public getElementByName(name: string): SceneElement | null {
        for (const elt of this._elements) {
            if (elt.name === name) return elt;
        }
        return null;
    }

    //#region Getters
    public get name(): string { return this._name; }
    public get elements(): ReadonlyArray<SceneElement> { return this._elements; }
    //#endregion

}
