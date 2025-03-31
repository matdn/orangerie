import { ThreeViewBase } from "./bases/ThreeViewBase";


export class WithoutTransitionThreeView extends ThreeViewBase {

    public override playIntro(): void {
        super.playIntro();
        this._introFinish();
        this.onShow();
    }

    public override playOutro(): void {
        super.playOutro();
        this._outroFinish();
    }

}