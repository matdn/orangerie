import { ThreeAssetsManager } from "@cooker/three";
import { AmbientLight, DirectionalLight, Mesh, MeshBasicMaterial, MeshPhysicalMaterial, MeshStandardMaterial, Object3D, PointLight, Vector2, Vector3 } from "three";
import { AssetId } from "../../constants/games/AssetId";
import { Object3DId } from "../../constants/games/Object3DId";
import { ViewId } from "../../constants/views/ViewId";
import { ViewPlacementId } from "../../constants/views/ViewPlacementId";
import { ThreeCameraControllerBase } from "../../core/_engine/threejs/cameras/bases/ThreeCameraControllerBase";
import { Object3DsProxy } from "../../core/_engine/threejs/proxies/Object3DsProxy";
import { ThreeCamerasProxy } from "../../core/_engine/threejs/proxies/ThreeCamerasProxy";
import { WithoutTransitionThreeView } from "../../core/_engine/threejs/views/WithoutTransitionThreeView";
import { BirdWingMaterial } from "../../materials/commons/BirdWingMaterial";
import GaleryThreeView from "./components/GaleryThreeView";

export default class MuseumThreeView extends WithoutTransitionThreeView {
    private _camera!: ThreeCameraControllerBase;
    private _museumMesh: Object3D;
    private _cameraRotationFactor: number = 0.09;
    private _mouse: Vector2 = new Vector2(0, 0);
    private _birdWingRightMaterial: BirdWingMaterial = new BirdWingMaterial(1);
    private _birdWingLeftMaterial: BirdWingMaterial = new BirdWingMaterial(-1);
    private _scrollProgress: number = 0;

    constructor() {
        super(ViewId.THREE_MUSEUM, ViewPlacementId.THREE_MAIN);
        this._museumMesh = Object3DsProxy.GetObject3D(Object3DId.MUSEUM);
        this.add(this._museumMesh);
        const light = new AmbientLight(0xffffff, 0.5);
        light.position.set(0, 5, 5);
        this.add(light);

        this._camera = ThreeCamerasProxy.CamerasMap.get('MUSEUM');
        this.add(this._camera);

        const directionalLight = new DirectionalLight(0x00ff00, Math.PI);
        directionalLight.position.set(12, -2, 0);

        const pointLight = new PointLight(0xffffff, 400, 160);
        pointLight.position.set(0, -200, 0);
        this.add(pointLight);

        this._museumMesh.traverse((child) => {
            if (child instanceof Mesh) {
                if (child.name === Object3DId.MUSEUM_WALL) {
                    child.material = new MeshStandardMaterial({ color: 0xffffff, metalness: 0.1, roughness: 0.9 });
                }
                if (child.name === Object3DId.MUSEUM_TOP) {
                    child.material = new MeshBasicMaterial({ color: 0xffffff });
                    child.add(pointLight);
                }
                if (child.name === Object3DId.MUSEUM_TREE) {
                    child.material = new MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.1 });
                    child.position.x = 0.5;
                }
                if (child.name === Object3DId.MUSEUM_ORANGES) {
                    child.material = new MeshPhysicalMaterial({ color: 0xFF9500, opacity: 0.9, transparent: true });
                    child.position.x = 0.5;
                }
                if (child.name === Object3DId.MUSEUM_GROUND) {
                    child.material = new MeshStandardMaterial({ map: ThreeAssetsManager.GetTexture(AssetId.TEXTURE_GROUND) });
                }
                if (child.name === Object3DId.MUSEUM_BIRD_LEFT_WING) {
                    child.material = this._birdWingLeftMaterial;
                }
                if (child.name === Object3DId.MUSEUM_BIRD_RIGHT_WING) {
                    child.material = this._birdWingRightMaterial;
                }
                if (child.name === Object3DId.MUSEUM_LEFT_PAINT || child.name === Object3DId.MUSEUM_MIDDLE_PAINT) {
                    child.material = new MeshStandardMaterial({ map: ThreeAssetsManager.GetTexture(AssetId.TEXTURE_LEFT_WALL) });
                }
            }
        });
        this.setupScrollListener();
    }

    private setupScrollListener() {
        window.addEventListener("museumScroll", (event: any) => {
            this._scrollProgress = event.detail.progress;
        });
    }

    public override update(dt: number): void {
        super.update(dt);
        this._camera.start();
        const center = new Vector3(0, 0, 0);
        const radius = 10;
        const angle = this._scrollProgress * Math.PI * 2;

        const x = center.x + radius * Math.cos(angle);
        const z = center.z + radius * Math.sin(angle);

        this._camera.position.set(x, 0, z);
        this._camera.lookAt(center);
    }
}
