import { Mesh } from "three";
import { Object3DId } from "../../../constants/games/Object3DId";
import { Object3DsProxy } from "../../../core/_engine/threejs/proxies/Object3DsProxy";
import { Object3DBase } from "../../../core/_engine/threejs/views/components/Object3DBase";
import { CommonSkyMaterial } from "../../../materials/commons/CommonSkyMaterial";

export class CommonSky extends Object3DBase {

    constructor(skyColor: number = 0x568fff) {

        super();
        const ref = Object3DsProxy.GetClone(Object3DId.COMMON_SKY);
        this.add(ref);
        this.scale.setScalar(2.5);
        this.rotation.y = Math.PI * 0.5;
        const mat = new CommonSkyMaterial(skyColor);
        // DayCycleMaterial.AddDayCycleMaterial(mat, true);
        ref.traverse((child) => {
            if (child instanceof Mesh) {
                child.material = mat;
            }
        });

    }


} 