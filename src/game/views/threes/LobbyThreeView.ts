import { ThreeAssetsManager } from "@cooker/three";

import gsap from "gsap";
import { TheatersProxy } from "pancake";
import { DoubleSide, Mesh, MeshPhysicalMaterial, MeshStandardMaterial, Object3D, PlaneGeometry, PointLight, Vector2 } from "three";
import { AssetId } from "../../constants/games/AssetId";
import { Object3DId } from "../../constants/games/Object3DId";
import { TheaterId } from "../../constants/theaters/TheaterId";
import { ViewId } from "../../constants/views/ViewId";
import { ViewPlacementId } from "../../constants/views/ViewPlacementId";
import { ThreeCameraControllerBase } from "../../core/_engine/threejs/cameras/bases/ThreeCameraControllerBase";
import { Object3DsProxy } from "../../core/_engine/threejs/proxies/Object3DsProxy";
import { ThreeCamerasProxy } from "../../core/_engine/threejs/proxies/ThreeCamerasProxy";
import { WithoutTransitionThreeView } from "../../core/_engine/threejs/views/WithoutTransitionThreeView";
import { LobbyThreeTheater } from "../../theaters/LobbyThreeTheater";

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
    private _animationStatus: boolean = false;
    private _fogScale: number = 150;

    constructor() {
        super(ViewId.THREE_LOBBY, ViewPlacementId.THREE_MAIN);

        this._lobbyMesh = Object3DsProxy.GetObject3D(Object3DId.LOBBY);
        this.add(this._lobbyMesh);

        this._camera = ThreeCamerasProxy.CamerasMap.get('LOBBY');
        this.add(this._camera);

        this._camera.position.z = 140;
        gsap.to(this._camera.position, {
            z: 150,
            duration: 5,
            ease: "power4.out",
        });

        this._initMouseListener();
        this._imagePlane = new Mesh();
        this._titlePlane = new Mesh();

        const geometry = new PlaneGeometry(100, 100, 1, 1);
        const cloudGeometry = new PlaneGeometry(100, 100, 1, 1);

        this._titlePlane.geometry = geometry;
        this._titlePlane.position.set(0, 2, 100);
        this._titlePlane.scale.set(0.35, 0.35, 0.35);
        this._titlePlane.rotation.z = Math.PI;
        this._titlePlane.rotation.y = Math.PI;

        this._clouds = new Mesh();
        this._clouds.geometry = cloudGeometry;
        this._clouds.position.set(-20, 30, 10);
        this._clouds.scale.set(2.2, 2.2, 2.2);
        this._clouds.material = new MeshStandardMaterial({
            map: ThreeAssetsManager.GetTexture(AssetId.TEXTURE_CLOUDS),
            side: DoubleSide,
            transparent: true,
            opacity: 0.2,
            emissive: 0xffffff,
            emissiveIntensity: 0.9,
        });

        this._secondClouds = this._clouds.clone();

        this._pointLight = new PointLight(0xffffff, 250, 100);
        this._pointLight.position.set(0, 10, 0);

        const glassMaterial = new MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 1,
            roughness: 0.1,
            envMapIntensity: 0.2,
            clearcoat: 1,
            transparent: true,
            opacity: 0.3,
            thickness: 0.1,
            reflectivity: 0.9,
            ior: 0.1,
        });

        const whiteMaterial = new MeshPhysicalMaterial({ color: 0xffffff });

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
                const mat = new MeshStandardMaterial({
                    map: ThreeAssetsManager.GetTexture(AssetId.TEXTURE_MIDDLE_BLOC),
                });
                child.traverse((c: Object3D) => {
                    if (c instanceof Mesh) {
                        c.material = mat;
                    }
                });
            }

            if (child.name === Object3DId.LOBBY_FLOAR) {
                const mat = new MeshStandardMaterial({
                    map: ThreeAssetsManager.GetTexture(AssetId.TEXTURE_FLOAR),
                });
                child.traverse((c: Object3D) => {
                    if (c instanceof Mesh) {
                        c.material = mat;
                    }
                });
            }

            if (child.name === Object3DId.LOBBY_WALL) {
                const mat = new MeshStandardMaterial({
                    map: ThreeAssetsManager.GetTexture(AssetId.TEXTURE_WALL_BAKE),
                });
                child.traverse((c: Object3D) => {
                    if (c instanceof Mesh) {
                        c.material = mat;
                    }
                });
            }
        });
    }

    private _initMouseListener(): void {
        window.addEventListener("mousemove", (event) => {
            this._mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this._mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });
    }

    public triggerFogAndZoomOut() {
        this._animationStatus = true;
    }

    public override update(dt: number): void {
        const theater = TheatersProxy.GetTheater<LobbyThreeTheater>(TheaterId.LOBBY);
        super.update(dt);
        this._time += dt;

        if (this._animationStatus) {
            if (this._camera.position.z > 100) {
                this._camera.position.z -= 1;
            }

            this._fogScale = Math.max(10, this._fogScale - 5.5);
            theater.setFogScale(this._fogScale);
        }
    }
}
