import { MeshBasicMaterial } from "three";

export class LightMaterial extends MeshBasicMaterial {
    constructor() {
        super({
            color: 0xffffff,
        });
    }
}