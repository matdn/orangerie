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

export default class MuseumThreeView extends WithoutTransitionThreeView {
    private _camera: ThreeCameraControllerBase;
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

        this._camera = ThreeCamerasProxy.CamerasMap.get('MUSEUM');
        this.add(this._camera);

        const light = new AmbientLight(0xffffff, 0.5);
        light.position.set(0, 5, 5);
        this.add(light);

        const directionalLight = new DirectionalLight(0x00ff00, Math.PI);
        directionalLight.position.set(12, -2, 0);

        const pointLight = new PointLight(0xffffff, 400, 160);
        pointLight.position.set(0, -200, 0);
        this.add(pointLight);

        this._museumMesh.traverse((child) => {

            if (child instanceof Mesh) {
                if (child.name === Object3DId.MUSEUM_WALL) {
                    // const basMat = new MeshStandardMaterial({ map: ThreeAssetsManager.GetTexture(AssetId.TEXTURE_WALL_MUSEUM) });
                    const basMat = new MeshStandardMaterial({ color: 0xffffff, metalness: 0.1, roughness: 0.9 });
                    child.material = basMat;
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
                    const basMat = new MeshStandardMaterial({ map: ThreeAssetsManager.GetTexture(AssetId.TEXTURE_GROUND) });
                    child.material = basMat;

                }
                if (child.name === Object3DId.MUSEUM_BIRD_LEFT_WING) {
                    child.material = this._birdWingLeftMaterial;
                }
                if (child.name === Object3DId.MUSEUM_BIRD_RIGHT_WING) {
                    child.material = this._birdWingRightMaterial;
                }
                if (child.name === Object3DId.MUSEUM_LEFT_PAINT) {
                    child.material = new MeshStandardMaterial({ map: ThreeAssetsManager.GetTexture(AssetId.TEXTURE_LEFT_WALL) });
                }
                if (child.name === Object3DId.MUSEUM_MIDDLE_PAINT) {
                    child.material = new MeshStandardMaterial({ map: ThreeAssetsManager.GetTexture(AssetId.TEXTURE_LEFT_WALL) });
                }
            }
            this.setupScrollListener();
        });
    }

    private setupScrollListener() {
        window.addEventListener('museumScroll', (event: any) => {
            this._scrollProgress = event.detail.progress;
        });
    }



    public override update(dt: number): void {
        super.update(dt);

        const rotationX = this._mouse.x * this._cameraRotationFactor;

        this._camera.start();
        const center = new Vector3(0, 0, 0);  // Centre du cercle
        const radius = 10;                     // Rayon du cercle
        const angle = this._scrollProgress * Math.PI * 2; // Convertir le scroll en angle (0 → 2π)

        // Calculer la position de la caméra sur le cercle
        const x = center.x + radius * Math.cos(angle);
        const z = center.z + radius * Math.sin(angle);

        // Définir la position de la caméra
        this._camera.position.set(x, 0, z);

        // Faire en sorte que la caméra regarde toujours vers le centre
        this._camera.lookAt(center);

    }
}
