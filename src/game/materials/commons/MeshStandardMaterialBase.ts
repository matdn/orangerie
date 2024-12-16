import { Color, Euler, IUniform, Material, MeshStandardMaterialParameters, TangentSpaceNormalMap, Texture, Vector2 } from "three";

export class MeshStandardMaterialBase extends Material {

    public isMeshStandardMaterial: boolean = true;
    public color: Color;
    public roughness: number;
    public metalness: number;
    public map: Texture | null;
    public lightMap: Texture | null;
    public lightMapIntensity: number;
    public aoMap: Texture | null;
    public aoMapIntensity: number;
    public emissive: Color;
    public emissiveIntensity: number;
    public emissiveMap: Texture | null;
    public bumpMap: Texture | null;
    public bumpScale: number;
    public normalMap: Texture | null;
    public normalMapType: number;
    public normalScale: Vector2;
    public displacementMap: Texture | null;
    public displacementScale: number;
    public displacementBias: number;
    public roughnessMap: Texture | null;
    public metalnessMap: Texture | null;
    public alphaMap: Texture | null;
    public envMap: Texture | null;
    public envMapRotation: Euler;
    public envMapIntensity: number;
    public wireframe: boolean;
    public wireframeLinewidth: number;
    public wireframeLinecap: string;
    public wireframeLinejoin: string;
    public flatShading: boolean;
    public fog: boolean;

    public vertexShader: string;
    public fragmentShader: string;
    public uniforms: { [uniform: string]: IUniform };;


    constructor(parameters?: MeshStandardMaterialParameters) {
        super();
        this.isMeshStandardMaterial = true;
        this.defines = { 'STANDARD': '' };


        this.color = new Color(0xffffff); // diffuse
        this.roughness = 1.0;
        this.metalness = 0.0;

        this.map = null;

        this.lightMap = null;
        this.lightMapIntensity = 1.0;

        this.aoMap = null;
        this.aoMapIntensity = 1.0;

        this.emissive = new Color(0x000000);
        this.emissiveIntensity = 1.0;
        this.emissiveMap = null;

        this.bumpMap = null;
        this.bumpScale = 1;

        this.normalMap = null;
        this.normalMapType = TangentSpaceNormalMap;
        this.normalScale = new Vector2(1, 1);

        this.displacementMap = null;
        this.displacementScale = 1;
        this.displacementBias = 0;

        this.roughnessMap = null;

        this.metalnessMap = null;

        this.alphaMap = null;

        this.envMap = null;
        this.envMapRotation = new Euler();
        this.envMapIntensity = 1.0;

        this.wireframe = false;
        this.wireframeLinewidth = 1;
        this.wireframeLinecap = 'round';
        this.wireframeLinejoin = 'round';

        this.flatShading = false;

        this.fog = true;
    }

    protected _addDefine(define: string): void {
        if (this.defines) {
            this.vertexShader = `#define ${define}` + '\n' + this.vertexShader;
            this.fragmentShader = `#define ${define}` + '\n' + this.fragmentShader;
        }
    }
}   