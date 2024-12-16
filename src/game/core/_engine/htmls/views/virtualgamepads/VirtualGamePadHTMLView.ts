import { Action } from "cookware";
import { ViewsManager } from "pancake";
import { DomEvent } from "spices";
import { VirtualGamePadConfigsManager } from "../../../../managers/VirtualGamePadConfigsManager";
import ReactHTMLView, { ReturnJSXElement } from "../ReactHTMLView";
import { AnalogPad } from "./AnalogPad";
import { Button } from "./Button";
import { GamePadButtonId } from "../../../../constants/GamePadButtonId";

export class VirtualGamePadHTMLView extends ReactHTMLView 
{
    private _leftAnalogPad: AnalogPad;
    private _rightAnalogPad: AnalogPad;
    private _buttonsMap = new Map<GamePadButtonId, Button>();

    public readonly onButtonPress = new Action<[Button]>();
    public readonly onButtonRelease = new Action<[Button]>();
    public readonly onChangeButtonLabel = new Action();

    // private _buttonsLabelMapBase = new Map<GamePadButtonId, string>([
    //     [GamePadButtonId.A, 'A'],
    //     [GamePadButtonId.B, 'B'],
    //     [GamePadButtonId.X, 'X'],
    //     [GamePadButtonId.Y, 'Y'],
    //     [GamePadButtonId.DPadUp, ''],
    //     [GamePadButtonId.DPadDown, ''],
    //     [GamePadButtonId.DPadLeft, ''],
    //     [GamePadButtonId.DPadRight, ''],
    //     [GamePadButtonId.RT, 'RT'],
    //     [GamePadButtonId.LT, 'LT'],
    //     [GamePadButtonId.RB, 'RB'],
    //     [GamePadButtonId.LB, 'LB']
    // ]);

    // private _buttonsLabelMap: Map<GamePadButtonId, string>;

    constructor(viewId: string, placementId: number, reactComponent: ReturnJSXElement, animationDuration?: number, props?: any) {
        super(viewId, placementId, reactComponent, animationDuration, props);
        this._leftAnalogPad = new AnalogPad();
        this._rightAnalogPad = new AnalogPad();
        // this._buttonsLabelMap = new Map(this._buttonsLabelMapBase);
    }

    public override setHTMLElement(html: HTMLElement | null): void {
        super.setHTMLElement(html);
        this._leftAnalogPad.setHTMLElement(this._html.querySelector('.analogLeft'));
        this._rightAnalogPad.setHTMLElement(this._html.querySelector('.analogRight'));

        this._buttonsMap.set(GamePadButtonId.A, new Button(this._html.querySelector('.buttonA'), GamePadButtonId.A));
        this._buttonsMap.set(GamePadButtonId.B, new Button(this._html.querySelector('.buttonB'), GamePadButtonId.B));
        this._buttonsMap.set(GamePadButtonId.X, new Button(this._html.querySelector('.buttonX'), GamePadButtonId.X));
        this._buttonsMap.set(GamePadButtonId.Y, new Button(this._html.querySelector('.buttonY'), GamePadButtonId.Y));

        this._buttonsMap.set(GamePadButtonId.DPadUp, new Button(this._html.querySelector('.buttonUp'), GamePadButtonId.DPadUp));
        this._buttonsMap.set(GamePadButtonId.DPadDown, new Button(this._html.querySelector('.buttonDown'), GamePadButtonId.DPadDown));
        this._buttonsMap.set(GamePadButtonId.DPadLeft, new Button(this._html.querySelector('.buttonLeft'), GamePadButtonId.DPadLeft));
        this._buttonsMap.set(GamePadButtonId.DPadRight, new Button(this._html.querySelector('.buttonRight'), GamePadButtonId.DPadRight));

        this._buttonsMap.set(GamePadButtonId.RT, new Button(this._html.querySelector('.RT'), GamePadButtonId.RT));
        this._buttonsMap.set(GamePadButtonId.LT, new Button(this._html.querySelector('.LT'), GamePadButtonId.LT));
        this._buttonsMap.set(GamePadButtonId.RB, new Button(this._html.querySelector('.RB'), GamePadButtonId.RB));
        this._buttonsMap.set(GamePadButtonId.LB, new Button(this._html.querySelector('.LB'), GamePadButtonId.LB));


        this.start();
    }

    public start(): void {
        this._leftAnalogPad.init();
        this._rightAnalogPad.init();
        this._addCallbacks();
    }

    public stop(): void {
        this._leftAnalogPad.reset();
        this._rightAnalogPad.reset();
        this._removeCallbacks();
    }

    private _addCallbacks(): void {
        this._removeCallbacks();
        for (const button of this._buttonsMap.values()) {
            button.init();
            button.onPress.add(this._onButtonPress);
            button.onRelease.add(this._onButtonRelease);
        }
        if(window.TouchEvent)window.addEventListener(DomEvent.TOUCH_START, this._onWindowTouchStart);
        if(window.TouchEvent)window.addEventListener(DomEvent.TOUCH_END, this._onWindowTouchEnd);
        // ViewsManager.OnShowView.add(this._onChangeView);
        // ViewsManager.OnRemoveView.add(this._onChangeView);
    }



    private _removeCallbacks(): void {
        for (const button of this._buttonsMap.values()) {
            button.reset();
            button.onPress.remove(this._onButtonPress);
            button.onRelease.remove(this._onButtonRelease);
        }
        if(window.TouchEvent)window.removeEventListener(DomEvent.TOUCH_START, this._onWindowTouchStart);
        if(window.TouchEvent)window.removeEventListener(DomEvent.TOUCH_END, this._onWindowTouchEnd);
        // ViewsManager.OnShowView.delete(this._onChangeView);
        // ViewsManager.OnRemoveView.delete(this._onChangeView);
    }

    // private _onChangeView = ()=>{
    //     const config = VirtualGamePadConfigManager.GetTopVirtualGamePadConfig();
    //     console.log(config);
    // }

    private _onWindowTouchStart = ()=>{
        this._html.classList.add('showView');
    }

    private _onWindowTouchEnd = ()=>{
        this._html.classList.remove('showView');
    }

    // public setButtonLabel(buttonId: GamePadButtonId, label: string): void {
    //     this._buttonsLabelMap.set(buttonId, label);
    //     this.onChangeButtonLabel.execute();
    // }

    // public setButtonLabels(labels: Map<GamePadButtonId, string>): void {
    //     for (const [buttonId, label] of labels) {
    //         this._buttonsLabelMap.set(buttonId, label);
    //     }
    //     this.onChangeButtonLabel.execute();
    // }

    // public resetLabels(): void {
    //     this.setButtonLabels(this._buttonsLabelMapBase);
    // }

    protected override _introFinish(): void {
        super._introFinish();
        this.start();
    }

    protected override _outroFinish(): void {
        super._outroFinish();
        this.stop();
    }

    public getIsPressed(buttonId: GamePadButtonId): boolean {
        return this._buttonsMap.get(buttonId)?.isPressed;
    }

    private _onButtonPress = (button: Button): void => {
        this.onButtonPress.execute(button);
    }

    private _onButtonRelease = (button: Button): void => {
        this.onButtonRelease.execute(button);
    }

    //#region getters
    public get leftAnalogPad(): AnalogPad { return this._leftAnalogPad; }
    public get leftAnalogX(): number { return this._leftAnalogPad.analogX; }
    public get leftAnalogY(): number { return this._leftAnalogPad.analogY; }
    public get leftAnalogStrengh(): number { return this._leftAnalogPad.strengh; }
    public get leftAnalogRotation(): number { return this._leftAnalogPad.rotation; }


    public get rightAnalogPad(): AnalogPad { return this._rightAnalogPad; }
    public get rightAnalogX(): number { return this._rightAnalogPad.analogX; }
    public get rightAnalogY(): number { return this._rightAnalogPad.analogY; }
    public get rightAnalogStrengh(): number { return this._rightAnalogPad.strengh; }
    public get rightAnalogRotation(): number { return this._rightAnalogPad.rotation; }

    public get buttonsMap(): Map<GamePadButtonId, Button> { return this._buttonsMap; }
    // public get buttonsLabelMap(): Map<GamePadButtonId, string> { return this._buttonsLabelMap; }
    //#endregion
}   