import { Color, IUniform, Material, WebGLProgramParametersWithUniforms, WebGLRenderer } from "three";
import { DayCycleMaterial } from "./DayCycleMaterial";

export class FogMaterial {

    public static InitFromMaterial(material: Material, color: number, min: number, max: number, intensity: number = 1.): void {
        new FogMaterial(color, min, max, intensity)._initFromMaterial(material);
    }


    public static InitFromOnBeforeCompile(parameters: WebGLProgramParametersWithUniforms, renderer: WebGLRenderer, color: number, min: number, max: number, intensity: number = 1.): void {
        new FogMaterial(color, min, max, intensity)._initFromOnBeforeCompile(parameters, renderer);
    }

    //
    //
    //

    private _uniforms: { [uniform: string]: IUniform };
    private readonly _color: number;
    private readonly _min: number;
    private readonly _max: number;
    private readonly _intensity: number;


    constructor(color: number, min: number, max: number, intensity: number = 1.) {
        this._color = color;
        this._min = min;
        this._max = max;
        this._intensity = intensity;
    }

    private _initFromMaterial(material: Material): void {
        material.onBeforeCompile = (parameters: WebGLProgramParametersWithUniforms, renderer: WebGLRenderer) => {
            this._initFromOnBeforeCompile(parameters, renderer);
        }
    }


    private _initFromOnBeforeCompile(parameters: WebGLProgramParametersWithUniforms, renderer: WebGLRenderer): void {
        this._uniforms = parameters.uniforms;
        this._uniforms.baseFogColor = { value: new Color(this._color) };
        this._uniforms.fogMin = { value: this._min };
        this._uniforms.fogMax = { value: this._max };
        this._uniforms.fogIntensity = { value: this._intensity };


        parameters.vertexShader = '' + parameters.vertexShader;
        parameters.fragmentShader = '' + parameters.fragmentShader;
        //
        // Vertex Shader
        //
        parameters.vertexShader = parameters.vertexShader.replace('#include <common>',/*glsl*/`
            #include <common>
            varying vec4 fogwpos;
        `);

        parameters.vertexShader = parameters.vertexShader.replace('#include <fog_vertex>',/*glsl*/`
            #include <fog_vertex>
            fogwpos = modelMatrix * vec4( transformed, 1.0 );
        `);

        //
        // Fragment Shader
        //
        parameters.fragmentShader = parameters.fragmentShader.replace('#include <common>',/*glsl*/`
            #include <common>
            varying vec4 fogwpos;
            uniform vec3 baseFogColor;
            uniform float fogMin;
            uniform float fogMax;
            uniform float fogIntensity;
        `);


        const fog =/*glsl*/`
            vec3 fogInitColor = gl_FragColor.rgb;

            float z = -fogwpos.z;
            z = smoothstep(fogMin, fogMax, z);
            vec3 fogColor = mix(fogInitColor, baseFogColor, z);

            gl_FragColor.rgb = mix(fogInitColor, fogColor, fogIntensity);
            gl_FragColor.a = 1.;
        `;

        const s = parameters.fragmentShader.trim();
        parameters.fragmentShader = s.substring(0, s.length - 1) + fog + '\n}';

        DayCycleMaterial.InitFromOnBeforeCompile(parameters, renderer);
    }
}