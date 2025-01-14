import { AmbientLight, CameraHelper, Mesh, MeshPhysicalMaterial, Object3D, PMREMGenerator, PointLight, SpotLight, SpotLightHelper, TextureLoader, Vector2 } from "three";
import { Object3DId } from "../../constants/games/Object3DId";
import { ViewId } from "../../constants/views/ViewId";
import { ViewPlacementId } from "../../constants/views/ViewPlacementId";
import { ThreeCameraControllerBase } from "../../core/_engine/threejs/cameras/bases/ThreeCameraControllerBase";
import { MainThree } from "../../core/_engine/threejs/MainThree";
import { Object3DsProxy } from "../../core/_engine/threejs/proxies/Object3DsProxy";
import { ThreeCamerasProxy } from "../../core/_engine/threejs/proxies/ThreeCamerasProxy";
import { WithoutTransitionThreeView } from "../../core/_engine/threejs/views/WithoutTransitionThreeView";
import { LobbyThreeTheater } from "../../theaters/LobbyThreeTheater";
import { TheatersProxy } from "pancake";
import { Assets } from "pixi.js";
import { AssetId } from "../../constants/games/AssetId";
import { ThreeAssetsManager } from "@cooker/three";

export default class LobbyThreeView extends WithoutTransitionThreeView {
    private _lobbyMesh: Object3D;
    private _camera: ThreeCameraControllerBase;
    private _mouse: Vector2 = new Vector2(0, 0);
    private _cameraRotationFactor: number = 0.09;
    private _scrollProgress: number = 0;
    private _pointLight: PointLight;

    constructor() {
        super(ViewId.THREE_LOBBY, ViewPlacementId.THREE_MAIN);
        this._lobbyMesh = Object3DsProxy.GetObject3D(Object3DId.LOBBY);
        this.add(this._lobbyMesh);
        this._camera = ThreeCamerasProxy.CamerasMap.get('LOBBY');
        this.add(this._camera);
        this._camera.position.y = -10;
        this._camera.rotation.z = (Math.PI / 2) * 8;
        const cameraHelper = new CameraHelper(this._camera.camera);
        // MainThree.Scene.add(cameraHelper);
        window.addEventListener('updateCameraPosition', this._onUpdateCameraPosition.bind(this));
        this._pointLight = new PointLight(0xffffff, 250, 100);
        this._pointLight.position.set(0, 10, 0);
        this.add(this._pointLight);
        // const spotLight = new SpotLight(0xffffff, 80, 500, Math.PI, 0.25, 1);
        // spotLight.position.set(2, 0, 0);
        // this.add(spotLight);

        const glassMaterial = new MeshPhysicalMaterial({
            color: 0xcde6f5,
            transparent: true,
            opacity: 0.6,
            metalness: 0.9,
            roughness: 1,
            clearcoat: 1,
            reflectivity: 0.8,
            envMapIntensity: 1,
        });
        const whiteMaterial = new MeshPhysicalMaterial({
            color: 0xE3E8E9,

        });
        const paintMaterial = new MeshPhysicalMaterial({
            color: 0xffffff,
            roughness: 0,
            metalness: 0.8,
            clearcoat: 0,
        });

        this._lobbyMesh.traverse((child) => {
            if (child.name === Object3DId.LOBBY_GLASS) {
                child.traverse((glassChild: Object3D) => {
                    if (glassChild instanceof Mesh) {
                        glassChild.material = glassMaterial;
                    }
                });
            }
            if (child.name === Object3DId.LOBBY_WHITE) {
                child.traverse((whiteChild: Object3D) => {
                    if (whiteChild instanceof Mesh) {
                        whiteChild.material = whiteMaterial;
                    }
                });
            }
            if (child.name === Object3DId.LOBBY_PAINT) {
                child.traverse((paintChild: Object3D) => {
                    if (paintChild instanceof Mesh) {
                        paintChild.material = paintMaterial;
                    }
                });
            }
            if (child.name === Object3DId.LOBBY_MIDDLE_BLOC) {
                child.traverse((child: Object3D) => {
                    if (child instanceof Mesh) {
                        // child.material.map = ThreeAssetsManager.GetTexture(AssetId.TEXTURE_MIDDLE_BLOC);
                    }
                });
            }

            if (child.name === Object3DId.LOBBY_FLOAR) {
                child.traverse((child: Object3D) => {
                    if (child instanceof Mesh) {
                        // child.material.map = ThreeAssetsManager.GetTexture(AssetId.TEXTURE_MIDDLE_BLOC);
                    }
                });
            }

        });

        // ADD HDR BACKGROUND

        // Suivi de la souris
        this._initMouseListener();
    }

    private _initMouseListener(): void {
        window.addEventListener("mousemove", (event) => {
            // Normaliser la position du curseur dans l'espace 3D
            this._mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this._mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });
    }

    private _onUpdateCameraPosition(event: CustomEvent) {
        this._scrollProgress = event.detail;
    }

    public override update(dt: number): void {
        super.update(dt);

        const rotationX = this._mouse.y * this._cameraRotationFactor;
        const rotationY = this._mouse.x * this._cameraRotationFactor;

        this._camera.rotation.x += (rotationX - this._camera.rotation.x) * 0.1;
        this._camera.rotation.y += (Math.PI / 2) + (rotationY - this._camera.rotation.y) * 0.1;

        const cameraTargetZ = -200 * this._scrollProgress;
        this._camera.position.z += 15 + (cameraTargetZ - this._camera.position.z) * 0.1;
        let theater = TheatersProxy.GetTheater<LobbyThreeTheater>('LOBBY');
        let fogScale = theater.setFogScale(this._scrollProgress * 1.5);
        fogScale;

        this._camera.start();
        this._pointLight.position.x = this._mouse.x * 100;
        this._pointLight.position.y = this._mouse.y * 100;
        if (this._pointLight.position.y < 0) {
            this._pointLight.position.y = 0;
        }
        if (this._mouse.y > 0) {
            this._pointLight.position.z = this._mouse.y * 300;
            // console.log(this._mouse.y);
        }
        if (this._mouse.y < 0) {
            this._pointLight.position.z = -this._mouse.y * 300;
            // console.log(this._mouse.y);
        }
        // this._pointLight.power = (dt * 0.01) * 10000;
    }
}
