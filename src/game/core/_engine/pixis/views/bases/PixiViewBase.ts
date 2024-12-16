import { Ticker } from 'cookware';
import { Mixin } from 'ts-mixer';
import { SuperViewBase } from '../../../../views/bases/SuperViewBase';
import { MainPixi } from '../../MainPixi';
import { ContainerBase } from '../components/ContainerBase';


export class PixiViewBase extends Mixin(SuperViewBase, ContainerBase) {

    constructor(viewId: string, placementId: number) {
        super(viewId, placementId);
        this.zIndex = placementId;
    }

    public override init() {
        super.init();
        this.resize(MainPixi.InsideViewport, MainPixi.OutsideViewport);
        Ticker.Add(this._update);
    }

    public override playIntro(): void {
        super.playIntro();
        this.start();
    }

    public override playOutro(): void {
        super.playOutro();
        this.stop();
    }

    protected override  _outroFinish(): void {
        super._outroFinish();
        Ticker.Remove(this._update);
        this.reset();
    }

    private _update = (dt: number): void => {
        this.update(dt);
    }

}