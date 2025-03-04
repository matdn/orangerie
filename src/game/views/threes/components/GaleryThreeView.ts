import { AssetId } from "../../../constants/games/AssetId";
import { ViewId } from "../../../constants/views/ViewId";
import { ViewPlacementId } from "../../../constants/views/ViewPlacementId";
import { ThreeCameraControllerBase } from "../../../core/_engine/threejs/cameras/bases/ThreeCameraControllerBase";
import { WithoutTransitionThreeView } from "../../../core/_engine/threejs/views/WithoutTransitionThreeView";
import { ThreeAssetsManager } from "@cooker/three";
import * as THREE from "three";
import { DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry } from "three";
import { ThreeCamerasProxy } from "../../../core/_engine/threejs/proxies/ThreeCamerasProxy";

export default class GaleryThreeView extends WithoutTransitionThreeView {
    private _imagesContainer: AssetId[] = [];
    private _camera: ThreeCameraControllerBase;
    private _imagePlane!: Mesh;
    private _scrollProgress: number = 0;
    private _textureOffset: number = 0;

    constructor() {
        super(ViewId.THREE_GALERY, ViewPlacementId.THREE_MAIN);
        this._imagesContainer = [
            AssetId.GALERY_6,
            AssetId.GALERY_1,
            AssetId.GALERY_2,
            AssetId.GALERY_7,
            AssetId.GALERY_3,
            AssetId.GALERY_4,
            AssetId.GALERY_5,
        ];
        this._camera = ThreeCamerasProxy.CamerasMap.get('GALERY');

        // this._camera.rotation.set(0, 0, 0);
        // this._camera.rotateY(1);

        this.add(this._camera);

        this._setupCurvedPlane();
        this._initScrollListener();
    }

    private _setupCurvedPlane() {
        const width = 80;
        const height = 500;
        const segmentsX = 50;
        const segmentsY = this._imagesContainer.length * 10;
        const curvature = 120;

        const geometry = new PlaneGeometry(width, height, segmentsX, segmentsY);
        const positions = geometry.attributes.position.array;

        for (let i = 0; i < positions.length; i += 3) {
            const y = positions[i + 1];
            const distanceFromCenter = Math.abs(y / (height / 2));
            positions[i + 2] = Math.pow(distanceFromCenter, 2) * -curvature;
        }
        geometry.computeVertexNormals();

        const texture = this._generateTexture();
        const material = new MeshBasicMaterial({ map: texture, side: DoubleSide, transparent: true });
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);

        this._imagePlane = new Mesh(geometry, material);
        this._imagePlane.position.set(0, 0, 0);
        this._imagePlane.rotation.set(0, 0, -0.2);
        this.add(this._imagePlane);
    }

    private _generateTexture(): THREE.CanvasTexture {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Impossible de récupérer le contexte 2D du canvas");

        const canvasWidth = 2048;
        const imageHeight = 512;
        const margin = 160;
        const totalHeight = this._imagesContainer.length * (imageHeight + margin);
        const canvasHeight = Math.max(totalHeight, 512);
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        this._imagesContainer.forEach((assetId, index) => {
            const texture = ThreeAssetsManager.GetTexture(assetId);
            const img = texture ? texture.image : null;
            if (img && img.complete) {
                let drawWidth = canvasWidth;
                let drawHeight = imageHeight;
                ctx.drawImage(img, 0, index * (imageHeight + margin), drawWidth, drawHeight);
            } else {
                console.warn(`Image ${assetId} non chargée.`);
            }
        });

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.minFilter = THREE.LinearFilter;
        texture.needsUpdate = true;
        return texture;
    }

    private _initScrollListener() {
        window.addEventListener("scroll", () => {
            const scrollY = window.scrollY || window.pageYOffset;
            this._scrollProgress = scrollY * 0.002;
            this._updateTextureOffset();
        });
    }

    private _updateTextureOffset() {
        if (this._imagePlane) {
            this._textureOffset = this._scrollProgress;
            (this._imagePlane.material as THREE.MeshBasicMaterial).map!.offset.y = this._textureOffset;
        }
    }
}
