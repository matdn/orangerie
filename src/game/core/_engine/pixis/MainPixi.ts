import { Action } from "cookware";
import { ViewsManager } from "pancake";
import { Application, DisplayObject } from "pixi.js";
import { DomEvent } from "spices";
import { Viewport } from "../../components/Viewport";
import { SuperViewBase } from "../../views/bases/SuperViewBase";
import { PixiMouseManager } from "./managers/PixiMouseManager";
import { PixiViewBase } from "./views/bases/PixiViewBase";
import { ContainerBase } from "./views/components/ContainerBase";

export class MainPixi {

    public static UsePixi: boolean = false;

    public static readonly VIEW_ID = 'MainPixiReactView';

    private static _InsideViewport: Viewport;
    private static _OutsideViewport: Viewport;
    private static _GameSizeRatio: number = 1;

    private static _RefWidth: number = 800;
    private static _RefHeight: number = 600;
    private static _App: Application<HTMLCanvasElement>;


    private static _DomContainer: HTMLElement | null;
    private static _DomRect: DOMRect;

    private static _MainContainer: ContainerBase;

    private static _LastWidth: number = -1
    private static _LastHeight: number = -1
    private static _CheckTime: number = 500;

    private static _PixelRatio: number = 1;

    public static OnResize = new Action<[Viewport, Viewport]>();

    public static Init(): void {
        this._InsideViewport = new Viewport();
        this._OutsideViewport = new Viewport();
        this._App = new Application({
            resolution: this._PixelRatio,
            antialias: true,
        });
        this._App.ticker.minFPS = 60;
        this._App.ticker.maxFPS = 100;
        globalThis.__PIXI_APP__ = this._App;


        this._MainContainer = new ContainerBase();
        this._MainContainer.sortableChildren = true;
        this._App.stage.addChild(this._MainContainer as DisplayObject);
        window.addEventListener(DomEvent.RESIZE, this._Resize);
        ViewsManager.OnShowView.add(this._OnShowView);
        ViewsManager.OnRemoveView.add(this._OnRemoveView);
        setInterval(this._CheckSize, this._CheckTime);
    }

    public static SetRefSize(refWidth: number = 800, refHeight: number = 600): void {
        this._RefWidth = refWidth;
        this._RefHeight = refHeight;
        this._Resize();
    }

    public static Start(): void {
        PixiMouseManager.Start();
    }

    public static Stop(): void {
        PixiMouseManager.Stop();
    }

    private static _CheckSize = (): void => {
        if (!this._DomContainer) return;
        const width = window.innerWidth;
        const height = window.innerHeight;
        if (width != this._LastWidth || height != this._LastHeight) this._Resize();

    }

    public static SetDomElementContainer(element: HTMLElement | null): void {
        this._DomContainer = element;
        if (element) {
            element.appendChild(this._App.view);
            this._Resize();
        }
    }


    private static _OnShowView = (view: SuperViewBase): void => {
        if (view instanceof PixiViewBase) {
            this._MainContainer.addChild(view as DisplayObject);
        }
    };

    private static _OnRemoveView = (view: SuperViewBase): void => {
        if (view instanceof PixiViewBase) {
            this._MainContainer.removeChild(view as DisplayObject);
        }
    };

    public static Resize(): void {
        this._Resize();
    }

    private static _Resize = (): void => {
        if (!this._DomContainer) return;
        this._LastWidth = window.innerWidth;
        this._LastHeight = window.innerHeight;

        this._DomRect = this._DomContainer.getBoundingClientRect();
        if (this._DomRect.width == 0) return;
        if (this._DomRect.height == 0) return;

        const DomRatio = this._DomRect.width / this._DomRect.height;
        const gameRatio = this._RefWidth / this._RefHeight;

        let appWidth = this._DomRect.width;
        let appHeight = appWidth / DomRatio;
        let scale = appWidth / this._RefWidth;

        if (appWidth / gameRatio > appHeight) {
            appHeight = this._DomRect.height;
            appWidth = appHeight * DomRatio;
            scale = appHeight / this._RefHeight;
        }

        this._App.renderer.resize(appWidth, appHeight);
        this._MainContainer.scale.set(scale);

        this._OutsideViewport.setPosition(0, 0);
        this._OutsideViewport.setSize(appWidth / scale, appHeight / scale);

        const x = (appWidth / scale - this._RefWidth) * 0.5;
        const y = (appHeight / scale - this._RefHeight) * 0.5;

        this._GameSizeRatio = 1 / scale;

        this._InsideViewport.setPosition(x, y);
        this._InsideViewport.setSize(this._RefWidth, this._RefHeight);

        this._MainContainer.resize(this._InsideViewport, this._OutsideViewport);

        this.OnResize.execute(this._InsideViewport, this._OutsideViewport);
    }


    //#region getter/settter
    public static get DomRect(): DOMRect { return this._DomRect; }
    public static get GameSizeRatio(): number { return this._GameSizeRatio; }

    public static get RefWidth(): number { return this._RefWidth; }
    public static get RefHeight(): number { return this._RefHeight; }
    public static get App(): Application<HTMLCanvasElement> { return this._App; }
    public static get InsideViewport(): Viewport { return this._InsideViewport; }
    public static get OutsideViewport(): Viewport { return this._OutsideViewport; }
    public static get PixeRatio(): number { return this._PixelRatio; }
    //#endregion

}