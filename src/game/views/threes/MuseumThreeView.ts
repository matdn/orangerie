import { ThreeAssetsManager } from "@cooker/three";
import { AmbientLight, DirectionalLight, Euler, Mesh, MeshBasicMaterial, MeshPhysicalMaterial, MeshStandardMaterial, Object3D, PlaneGeometry, PointLight, Vector2, Vector3 } from "three";
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { AssetId } from "../../constants/games/AssetId";
import { Object3DId } from "../../constants/games/Object3DId";
import { ViewId } from "../../constants/views/ViewId";
import { ViewPlacementId } from "../../constants/views/ViewPlacementId";
import { ThreeCameraControllerBase } from "../../core/_engine/threejs/cameras/bases/ThreeCameraControllerBase";
import { Object3DsProxy } from "../../core/_engine/threejs/proxies/Object3DsProxy";
import { ThreeCamerasProxy } from "../../core/_engine/threejs/proxies/ThreeCamerasProxy";
import { WithoutTransitionThreeView } from "../../core/_engine/threejs/views/WithoutTransitionThreeView";
import { BirdWingMaterial } from "../../materials/commons/BirdWingMaterial";
import gsap from "gsap";

export default class MuseumThreeView extends WithoutTransitionThreeView {
    private _camera!: ThreeCameraControllerBase;
    private _museumMesh: Object3D;
    private _cameraRotationFactor: number = 0.09;
    private _mouse: Vector2 = new Vector2(0, 0);
    private _birdWingRightMaterial: BirdWingMaterial = new BirdWingMaterial(1);
    private _birdWingLeftMaterial: BirdWingMaterial = new BirdWingMaterial(-1);
    private _scrollProgress: number = 0;
    private _mirror: Reflector;
    private _cameraPositions: { position: Vector3; rotation: Euler; }[] = [];



    constructor() {
        super(ViewId.THREE_MUSEUM, ViewPlacementId.THREE_MAIN);
        this._museumMesh = Object3DsProxy.GetObject3D(Object3DId.MUSEUM);
        this.add(this._museumMesh);
        const light = new AmbientLight(0xffffff, 0.5);
        light.position.set(0, 5, 5);
        this.add(light);

        const colors = [0xff0000, 0x0000ff, 0x00ff00]; // Rouge, Bleu, Vert


        this._camera = ThreeCamerasProxy.CamerasMap.get('MUSEUM');
        this.add(this._camera);

        const directionalLight = new DirectionalLight(0x00ff00, Math.PI);
        directionalLight.position.set(12, -2, 0);

        const pointLight = new PointLight(0xffffff, 400, 160);
        pointLight.position.set(0, -200, 0);
        this.add(pointLight);
        this._mirror = new Reflector(
            new PlaneGeometry(200, 200),
            {
                clipBias: 0.03,
                textureWidth: window.innerWidth * 2,
                textureHeight: window.innerHeight * 2,
                color: 0x777777,

            }
        );
        const groundBlur = new Mesh(new PlaneGeometry(200, 200), new MeshStandardMaterial({ color: 0xffffff, metalness: 0.6, transparent: true, opacity: 0.9, roughness: 0.3 }));
        groundBlur.position.set(0, -2.4, 0);
        groundBlur.rotation.x = -Math.PI / 2;
        this._museumMesh.add(groundBlur);
        this._mirror.position.set(0, -2.5, 0);
        this._mirror.rotation.x = -Math.PI / 2;
        this._museumMesh.add(this._mirror);
        const camerasEmpty = this._museumMesh.getObjectByName(Object3DId.MUSEUM_CAMERAS);



        this._museumMesh.traverse((child) => {
            if (child.name === Object3DId.MUSEUM_CAMERAS) {
                for (let i = 0; i < child.children.length; i++) {
                    const cam = child.children[i];
                    this._cameraPositions.push({
                        position: new Vector3(cam.position.x, cam.position.y, cam.position.z),
                        rotation: new Euler(cam.rotation.x, cam.rotation.y, cam.rotation.z),
                    });
                }

            }
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
                    child.scale.set(0, 0, 0);
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
        this._cameraPositions.forEach((cam, index) => {
            if (index === 5) {
                cam.rotation.y = -Math.PI;
            }
            if (index === 6) {
                cam.rotation.y = -Math.PI;
            }
        });

    }

    private setupScrollListener() {
        window.addEventListener("museumScroll", (event: any) => {
            this._scrollProgress = event.detail.progress;
        });
    }

    public override update(dt: number): void {
        super.update(dt);
        this._camera.start();

        const progress = Math.min(Math.max((this._scrollProgress - 0.5) * 2, 0), 1);

        if (this._scrollProgress < 0.5) {
            // 🌍 Mode Mouvement Circulaire (scroll progress < 50%)
            const center = new Vector3(0, 0, 0);
            const radius = 10;
            const angle = (this._scrollProgress * 2) * Math.PI * 2;

            const x = center.x + radius * Math.cos(angle);
            const z = center.z + radius * Math.sin(angle);

            const circularPosition = new Vector3(x, 0, z);
            this._camera.position.lerp(circularPosition, 0.05);
            this._camera.lookAt(center);
        } else {
            // 🎯 Mode Empties (scroll progress >= 50%)
            if (this._cameraPositions.length > 0) {
                const index = Math.floor(progress * (this._cameraPositions.length - 1));
                let nextIndex = Math.min(index + 1, this._cameraPositions.length - 1);
                let lerpFactor = (progress * (this._cameraPositions.length - 1)) % 1;

                // 🔹 Correction : si on est sur le dernier point, on garde la dernière position
                if (index >= this._cameraPositions.length - 1) {
                    nextIndex = index;
                    lerpFactor = 1.0; // 🔹 Fix du lerpFactor pour éviter les valeurs incohérentes
                }

                const start = this._cameraPositions[index];
                const end = this._cameraPositions[nextIndex];

                if (start && end) {
                    // 🔹 Interpolation fluide entre les positions avec GSAP
                    gsap.to(this._camera.position, {
                        x: start.position.x * (1 - lerpFactor) + end.position.x * lerpFactor,
                        y: start.position.y * (1 - lerpFactor) + end.position.y * lerpFactor,
                        z: start.position.z * (1 - lerpFactor) + end.position.z * lerpFactor,
                        duration: 1,
                        ease: "power2.out",
                    });

                    // 🔹 Interpolation fluide de la rotation (sans prendre la rotation du suivant trop tôt)
                    gsap.to(this._camera.rotation, {
                        y: -(start.rotation.y * (1 - lerpFactor) + end.rotation.y * lerpFactor), // 🔹 Correction de Y
                        duration: 0.5,
                        ease: "power2.out",
                    });

                    // 🔹 Debug : Vérification de la position et de la rotation du dernier empty
                    if (index === this._cameraPositions.length - 1) {
                        // console.log("📌 Dernière Position Captée:", end.position);
                        // console.log("📌 Dernière Rotation Captée:", end.rotation);
                    }
                }
            }
        }
        // console.log(this._camera.rotation.y);
    }


}
