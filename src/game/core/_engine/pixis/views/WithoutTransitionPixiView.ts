import { PixiViewBase } from "./bases/PixiViewBase";


export class WithoutTransitionPixiView extends PixiViewBase {

    public override playIntro(): void {
        super.playIntro();
        this._introFinish();
    }

    public override playOutro(): void {
        super.playOutro();
        this._outroFinish();
    }
}