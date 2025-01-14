import { Ticker } from "cookware";
import {
    IUniform,
    PointsMaterial,
    WebGLProgramParametersWithUniforms,
    WebGLRenderer,
    Vector3
} from "three";

export class HaloMaterial extends PointsMaterial {
    private _uniforms: { [uniform: string]: IUniform; } | undefined;
    private _haloPosition: Vector3;

    constructor() {
        super({
            size: 0.2,
            sizeAttenuation: true,
            depthWrite: false,
            transparent: true,
        });

        // Position du halo (initialement hors écran)
        this._haloPosition = new Vector3(0, 0, -1000);
    }

    setHaloPosition(position: Vector3) {
        this._haloPosition.copy(position);
    }

    onBeforeCompile(parameters: WebGLProgramParametersWithUniforms, renderer: WebGLRenderer): void {
        this._uniforms = parameters.uniforms;
        this._uniforms.time = { value: 0 };
        this._uniforms.haloPosition = { value: new Vector3(0, 0, -1000) }; // Position initiale du halo
        this._uniforms.haloRadius = { value: 0.5 }; // Rayon du halo

        //
        // Vertex Shader
        //
        parameters.vertexShader = parameters.vertexShader.replace('#include <common>', /*glsl*/`
            uniform float time;
            uniform vec3 haloPosition;
            varying vec3 vWorldPosition;
            #include <common>
        `);

        parameters.vertexShader = parameters.vertexShader.replace('#include <fog_vertex>', /*glsl*/`
            #include <fog_vertex>
            vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
        `);

        //
        // Fragment Shader
        //
        parameters.fragmentShader = parameters.fragmentShader.replace('#include <common>', /*glsl*/`
            uniform float time;
            uniform vec3 haloPosition;
            uniform float haloRadius;
            varying vec3 vWorldPosition;
            #include <common>
        `);

        parameters.fragmentShader = parameters.fragmentShader.replace('#include <opaque_fragment>', /*glsl*/`
            #include <opaque_fragment>
            
            // Calcul de la distance au halo
            float distance = length(vWorldPosition - haloPosition);
            
            // Halo lumineux
            float halo = smoothstep(haloRadius, haloRadius * 0.5, distance);
            
            // Appliquer l'effet au canal alpha
            gl_FragColor.a += halo;
        `);
    }

    onBeforeRender(renderer: WebGLRenderer): void {
        if (this._uniforms) {
            this._uniforms.time.value = Ticker.ElapsedTime * 0.01;
            this._uniforms.haloPosition.value = this._haloPosition;
        }
    }
}
