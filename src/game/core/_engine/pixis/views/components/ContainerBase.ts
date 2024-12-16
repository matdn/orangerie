import { Container } from "pixi.js";

// Core - Pixi
import { Viewport } from "../../../../components/Viewport";

export class ContainerBase extends Container {


    public init(): void {
        for (let child of this.children) {
            if ((child as any).init) {
                (child as any).init();
            }
        }
    }

    public start(): void {
        for (const child of this.children) {
            if ((child as any).start) {
                (child as any).start();
            }
        }
    }

    public stop(): void {
        for (const child of this.children) {
            if ((child as any).stop) {
                (child as any).stop();
            }
        }
    }

    public reset(): void {
        for (let child of this.children) {
            if ((child as any).reset) {
                (child as any).reset();
            }
        }
    }

    public update(dt: number): void {
        for (let child of this.children) {
            if ((child as any).update) {
                (child as any).update(dt);
            }
        }
    }


    public resize(insideViewport: Viewport, outsideViewport: Viewport): void {
        for (let child of this.children) {
            if ((child as any).resize) {
                (child as any).resize(insideViewport, outsideViewport);
            }
        }
    }
}