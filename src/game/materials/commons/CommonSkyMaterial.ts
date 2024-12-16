import { ThreeAssetsManager } from "@cooker/three";
import { Ticker } from "cookware";
import { Color, IUniform, MeshBasicMaterial, WebGLProgramParametersWithUniforms, WebGLRenderer } from "three";
import { AssetId } from "../../constants/games/AssetId";
import { DayCycleMaterial } from "./DayCycleMaterial";
import { DayCycleManager } from "../../managers/DayCycleManager";

export class CommonSkyMaterial extends MeshBasicMaterial {

    private _uniforms: { [uniform: string]: IUniform; };
    private readonly _skyColor: number;

    constructor(skyColor: number = 0x568fff) {
        super({
            map: ThreeAssetsManager.GetTexture(AssetId.TEXTURE_SKY),
        });
        this._skyColor = skyColor;
    }

    onBeforeCompile(parameters: WebGLProgramParametersWithUniforms, renderer: WebGLRenderer): void {


        this._uniforms = parameters.uniforms;
        this._uniforms.time = { value: 0 };
        this._uniforms.cloudsTex = { value: ThreeAssetsManager.GetTexture(AssetId.TEXTURE_SKY_CLOUDS) };
        this._uniforms.baseColor = { value: new Color(this._skyColor) };
        this._uniforms.skyIntensity = { value: DayCycleManager.SkyIntensity };
        this._uniforms.dayCycle = { value: 0 };


        //
        // Fragment Shader
        //
        parameters.fragmentShader = parameters.fragmentShader.replace('#include <common>',/*glsl*/`
            #include <common>
            uniform float time;
            uniform float skyIntensity;
            uniform sampler2D cloudsTex;
            uniform vec3 baseColor;
            uniform float dayCycle;
        `);

        parameters.fragmentShader = parameters.fragmentShader.replace('#include <opaque_fragment>',/*glsl*/`
            #include <opaque_fragment>
            vec4 col = gl_FragColor;
            col.rgb = baseColor*skyIntensity + col.rgb*skyIntensity;

            // vec2 uv1 = vMapUv * 3.34;
            vec2 uv1 = vMapUv * 3.;
            uv1.x += dayCycle + time*0.0175;

            // vec2 uv2 = vMapUv * 5.12;
            vec2 uv2 = vMapUv * 5.;
            uv2.x += dayCycle + time*0.00523;

            vec4 clouds1 = texture2D(cloudsTex, uv1);
            vec4 clouds2 = texture2D(cloudsTex, uv2);
            vec4 clouds = clouds1*0.5 + clouds2*0.5;
            gl_FragColor =col + clouds;
        `);


        parameters.fragmentShader = parameters.fragmentShader.replace('#include <fog_fragment>', '');

        DayCycleMaterial.InitFromOnBeforeCompile(parameters, renderer);
    }

    onBeforeRender(renderer: WebGLRenderer): void {
        if (this._uniforms) {
            this._uniforms.time.value = Ticker.ElapsedTime * 0.001;
            this._uniforms.dayCycle.value = DayCycleManager.Hours / 24;
            this._uniforms.skyIntensity.value = DayCycleManager.SkyIntensity;
        }
    }

}   