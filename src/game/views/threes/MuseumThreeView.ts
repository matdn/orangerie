import { AmbientLight, AxesHelper, CameraHelper, DirectionalLight, DirectionalLightHelper, DirectionalLightShadow, Intersection, Mesh, MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial, MeshPhysicalMaterial, MeshStandardMaterial, Object3D, PlaneGeometry, PointLight, Vector2, Vector3 } from "three";
import { Object3DId } from "../../constants/games/Object3DId";
import { ViewId } from "../../constants/views/ViewId";
import { ViewPlacementId } from "../../constants/views/ViewPlacementId";
import { ThreeCameraControllerBase } from "../../core/_engine/threejs/cameras/bases/ThreeCameraControllerBase";
import { Object3DsProxy } from "../../core/_engine/threejs/proxies/Object3DsProxy";
import { ThreeCamerasProxy } from "../../core/_engine/threejs/proxies/ThreeCamerasProxy";
import { WithoutTransitionThreeView } from "../../core/_engine/threejs/views/WithoutTransitionThreeView";
import { TheatersProxy } from "pancake";
import { ThreeInteractive } from "../../core/_engine/threejs/interactives/ThreeInteractive";
import { InteractionName } from "../../core/_engine/threejs/constants/InteractionName";
import { WaveMaterial } from "../../materials/commons/WaveMaterial";
import { BirdWingMaterial } from "../../materials/commons/BirdWingMaterial";
import { AssetId } from "../../constants/games/AssetId";
import { ThreeAssetsManager } from "@cooker/three";

export default class MuseumThreeView extends WithoutTransitionThreeView {
    private _camera: ThreeCameraControllerBase;
    private _intersection = new Vector2();
    private _interaction: ThreeInteractive;
    private _museumMesh: Object3D;
    // private _wallMesh: Mesh;
    private _cameraRotationFactor: number = 0.09;
    private _mouse: Vector2 = new Vector2(0, 0);
    private _waveMaterial: WaveMaterial = new WaveMaterial();
    private _birdWingRightMaterial: BirdWingMaterial = new BirdWingMaterial(1);
    private _birdWingLeftMaterial: BirdWingMaterial = new BirdWingMaterial(-1);
    constructor() {
        super(ViewId.THREE_MUSEUM, ViewPlacementId.THREE_MAIN);

        // this._wallMesh = Object3DsProxy.GetObject3D<Mesh>(Object3DId.MUSEUM_WALL);

        this._museumMesh = Object3DsProxy.GetObject3D(Object3DId.MUSEUM);
        this.add(this._museumMesh);

        this._camera = ThreeCamerasProxy.CamerasMap.get('MUSEUM');
        this.add(this._camera);

        const light = new AmbientLight(0xffffff, 0.5);
        light.position.set(0, 5, 5);
        this.add(light);

        // this._interaction = new ThreeInteractive(this._museumMesh);
        // this._addCallbacks();



        const directionalLight = new DirectionalLight(0x00ff00, Math.PI);
        directionalLight.position.set(12, -2, 0);

        // this.add(new DirectionalLightHelper(directionalLight));
        // this.add(directionalLight);
        // directionalLight.castShadow = true;
        // directionalLight.shadow.camera.near = 10;
        // directionalLight.shadow.camera.far = 40;
        // directionalLight.shadow.camera.left = 100;
        // directionalLight.shadow.camera.right = 100;
        // directionalLight.shadow.camera.top = 100;
        // directionalLight.shadow.camera.bottom = 100;

        // directionalLight.shadow.mapSize.width = 2024;
        // directionalLight.shadow.mapSize.height = 2024;

        const pointLight = new PointLight(0xffffff, 400, 160);
        pointLight.position.set(0, -200, 0);
        this.add(pointLight);

        this._museumMesh.traverse((child) => {

            if (child instanceof Mesh) {
                if (child.name === Object3DId.MUSEUM_WALL) {
                    const basMat = new MeshStandardMaterial({ map: ThreeAssetsManager.GetTexture(AssetId.TEXTURE_WALL_MUSEUM) });
                    child.material = basMat;
                }
                if (child.name === Object3DId.MUSEUM_TOP) {
                    child.material = new MeshBasicMaterial({ color: 0xffffff });
                    child.add(pointLight);
                }
                if (child.name === Object3DId.MUSEUM_TREE) {
                    child.material = new MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.1 });
                    // directionalLight.target = child;
                    child.castShadow = true;
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
            }

        });
        // this._initMouseListener();

    }

    // private _initMouseListener(): void {
    //     window.addEventListener("mousemove", (event) => {
    //         this._mouse.y = (event.clientX / window.innerWidth) * 2 - 1;
    //         this._mouse.x = -(event.clientY / window.innerHeight) * 2 + 1;
    //     });
    // }

    // private _addCallbacks(): void {
    //     this._interaction.onInteraction.add(this._onInteraction);
    //     // console.log(this._interaction());
    // }

    // private _removeCallbacks(): void {
    //     this._interaction.onInteraction.remove(this._onInteraction);
    // }

    // private _onInteraction = (name: InteractionName, intersection: Intersection | null): void => {
    //     if ((name === InteractionName.MOUSE_ENTER || name === InteractionName.MOUSE_MOVE) && intersection?.uv) {
    //         this._waveMaterial.updateCursor(new Vector2(intersection.uv.x, intersection.uv.y));
    //     }
    // };



    public override update(dt: number): void {
        super.update(dt);
        const birdWingLeftMaterial = this._birdWingLeftMaterial;
        const birdWingRightMaterial = this._birdWingRightMaterial;

        birdWingLeftMaterial.updateTime(dt);
        birdWingRightMaterial.updateTime(dt);

        // this._waveMaterial.onBeforeRender(null as any);

        const rotationX = this._mouse.x * this._cameraRotationFactor;
        const rotationY = this._mouse.y * this._cameraRotationFactor;
        this._camera.rotation.y += (Math.PI / 2) + (rotationY - this._camera.rotation.y) * 1;
        this._camera.start();

        const center = new Vector3(6, 2, 0);
        const radius = 2;
        const speed = -0.0005;

        this._museumMesh.traverse((child) => {

            if (child.name === Object3DId.MUSEUM_BIRD) {

                // child.material = birdMaterial;
                if (!child.userData.angle) {
                    child.userData.angle = 0;
                }

                child.userData.angle += speed * dt;
                if (child.userData.angle > Math.PI * 2) {
                    child.userData.angle -= Math.PI * 2;
                }

                const x = center.x + radius * Math.cos(child.userData.angle);
                const z = center.z + radius * Math.sin(child.userData.angle);

                child.position.set(x, center.y, z);

                const direction = new Vector3(
                    -Math.sin(child.userData.angle),
                    0,
                    Math.cos(child.userData.angle)
                );
                child.lookAt(center.clone().add(direction));
            }
        });
    }


}
