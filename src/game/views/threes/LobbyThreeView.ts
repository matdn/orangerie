import { AmbientLight, BackSide, CameraHelper, DoubleSide, Mesh, MeshBasicMaterial, MeshPhysicalMaterial, MeshStandardMaterial, Object3D, PlaneGeometry, PMREMGenerator, PointLight, SpotLight, SpotLightHelper, TextureLoader, Vector2 } from "three";
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
    private _imagePlane: Mesh;
    private _titlePlane: Mesh;
    private _clouds: Mesh;
    private _secondClouds: Mesh;
    private _time: number = 0;

    constructor() {
        super(ViewId.THREE_LOBBY, ViewPlacementId.THREE_MAIN);
        this._lobbyMesh = Object3DsProxy.GetObject3D(Object3DId.LOBBY);
        this.add(this._lobbyMesh);

        this._camera = ThreeCamerasProxy.CamerasMap.get('LOBBY');
        this.add(this._camera);
        this._imagePlane = new Mesh();
        this._camera.position.y = -10;
        this._camera.rotation.z = (Math.PI / 2) * 8;
        const cameraHelper = new CameraHelper(this._camera.camera);
        this._titlePlane = new Mesh();
        const geometry = new PlaneGeometry(100, 100, 1, 1);
        const cloudGeometry = new PlaneGeometry(100, 100, 1, 1);

        this._titlePlane.geometry = geometry;
        this._titlePlane.position.set(0, 2, 100);
        this._titlePlane.scale.set(0.35, 0.35, 0.35);
        this._titlePlane.rotation.z = Math.PI;
        this._titlePlane.rotation.y = Math.PI;
        // this._titlePlane.material = new MeshStandardMaterial({
        //     map: ThreeAssetsManager.GetTexture(AssetId.TEXTURE_TITLE),
        //     side: DoubleSide,
        //     transparent: true,
        //     emissive: 0xffffff,
        //     emissiveIntensity: 0.6,
        // });
        this._clouds = new Mesh();
        this._clouds.geometry = cloudGeometry;
        // this._clouds.position.set(-20, 30, 10);
        // this._clouds.scale.set(2.2, 2.2, 2.2);
        this._clouds.material = new MeshStandardMaterial({
            map: ThreeAssetsManager.GetTexture(AssetId.TEXTURE_CLOUDS),
            side: DoubleSide,
            transparent: true,
            opacity: 0.1,
            emissive: 0xffffff,
            emissiveIntensity: 0.9,
        });
        this._secondClouds = this._clouds.clone();
        this._secondClouds.position.set(20, -35, 9);
        // this.add(this._clouds);
        // this.add(this._secondClouds);
        this.add(this._titlePlane);
        // MainThree.Scene.add(cameraHelper);
        window.addEventListener('updateCameraPosition', this._onUpdateCameraPosition.bind(this));
        this._pointLight = new PointLight(0xffffff, 250, 100);
        this._pointLight.position.set(0, 10, 0);
        this.add(this._pointLight);
        // const spotLight = new SpotLight(0xffffff, 80, 500, Math.PI, 0.25, 1);
        // spotLight.position.set(2, 0, 0);
        // this.add(spotLight);

        const glassMaterial = new MeshPhysicalMaterial({
            metalness: .9,
            roughness: .5,
            envMapIntensity: 0.9,
            clearcoat: 1,
            transparent: true,
            // transmission: .95,
            opacity: .5,
            reflectivity: 0.2,
            // refractionRatio: 0.985,
            ior: 0.9,
            // side: BackSide,
        });
        const whiteMaterial = new MeshPhysicalMaterial({
            color: 0xffffff,

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
                const basMat = new MeshStandardMaterial({ map: ThreeAssetsManager.GetTexture(AssetId.TEXTURE_MIDDLE_BLOC) });
                // const basMat = new MeshBasicMaterial({ color: 0xff0000 });

                child.traverse((child: Object3D) => {
                    if (child instanceof Mesh) {
                        child.material = basMat;
                    }
                });
            }

            if (child.name === Object3DId.LOBBY_FLOAR) {
                const basMat = new MeshStandardMaterial({ map: ThreeAssetsManager.GetTexture(AssetId.TEXTURE_FLOAR) });
                // const basMat = new MeshBasicMaterial({ color: 0xff0000 });

                child.traverse((child: Object3D) => {
                    if (child instanceof Mesh) {
                        child.material = basMat;
                    }
                });
            }

            if (child.name === Object3DId.LOBBY_WALL) {
                const basMat = new MeshStandardMaterial({ map: ThreeAssetsManager.GetTexture(AssetId.TEXTURE_WALL_BAKE) });
                // const basMat = new MeshBasicMaterial({ color: 0xff0000 });

                child.traverse((child: Object3D) => {
                    if (child instanceof Mesh) {
                        child.material = basMat;
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

        this._time += dt;

        const oscillationSpeed = 0.003; // Vitesse de l'oscillation
        const oscillationAmplitude = 12; // Amplitude de l'oscillation

        // Calcul fluide de la position en Y
        this._clouds.position.x = Math.sin(this._time * 0.1 * oscillationSpeed) * oscillationAmplitude;
        this._secondClouds.position.x = -Math.sin(this._time * 0.1 * oscillationSpeed) * oscillationAmplitude;

        // Calcul des rotations basées sur la position de la souris
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
