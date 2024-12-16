import { AnimatedPixiView } from "./AnimatedPixiView";


export class OpacityPixiView extends AnimatedPixiView {

    constructor(viewId: string, placementId: number) {
        super(viewId, placementId);
        this.alpha = 0;
    }

    protected override _introFinish() {
        super._introFinish();
        this.alpha = 1;
    };

    protected override _onChangeEase(value: number): void {
        super._onChangeEase(value);
        this.alpha = value;
    }

    protected override _outroFinish() {
        super._outroFinish();
        this.alpha = 0;
    };

}