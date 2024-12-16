import { MeshStandardMaterial } from "three";

export class GoldMaterial extends MeshStandardMaterial {
    constructor() {
        super({
            color: 0xd9b162,
            roughness: 0.15,
            metalness: 1,
        })
    }
}