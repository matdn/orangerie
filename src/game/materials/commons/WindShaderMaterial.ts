import { Vector3 } from "@dimforge/rapier3d-compat";
import { Ticker } from "cookware";
import { IUniform, Material, MeshStandardMaterial, WebGLProgramParametersWithUniforms, WebGLRenderer } from "three";
// import { WindManager } from "../../managers/WindManager";

export class WindShaderMaterial extends MeshStandardMaterial {

    private _uniforms: { [uniform: string]: IUniform; };

    private readonly _strengh: number = 1;

    constructor(base: Material, strengh: number = 1) {
        super();
        this._strengh = strengh;


        for (const key in base) {
            this[key] = base[key];
        }
        this.defines.USE_UV2 = true;
        this.defines.USE_UV3 = true;

    }

    onBeforeCompile(parameters: WebGLProgramParametersWithUniforms, renderer: WebGLRenderer): void {

        this._uniforms = parameters.uniforms;
        this._uniforms.wind = { value: new Vector3(0, 0, 0) };
        this._uniforms.strengh = { value: this._strengh };
        this._uniforms.time = { value: 0 };


        parameters.vertexShader = parameters.vertexShader.replace('#include <common>',/*glsl*/ `
            #include <common>
            uniform vec3 wind;
            uniform float strengh;
            uniform float time;
        `);

        parameters.vertexShader = parameters.vertexShader.replace('#include <project_vertex>',/*glsl*/ `
            float c = 1.-uv2.y;
            // transformed.x += wind.x * c;
            #include <project_vertex>
            vec4 wp = modelMatrix * vec4(transformed, 1.0);
            float windx = cos(time + wp.x*0.3)*0.5;
            float windz = sin(time + wp.z*0.3)*0.5;

            wp.x += windx * c * strengh;
            wp.z += windz * c * strengh;

            // wp.x += wind.x * c * strengh;
            // wp.z += wind.z * c * strengh;

            gl_Position = projectionMatrix * viewMatrix * wp;
            // gl_Position.x += wind.x * c;
        `);


    }

    onBeforeRender(renderer: WebGLRenderer): void {
        if (this._uniforms) {
            // this._uniforms.wind.value.x = WindManager.Wind.x;
            // this._uniforms.wind.value.y = WindManager.Wind.y;
            // this._uniforms.wind.value.z = WindManager.Wind.z;
            this._uniforms.time.value = Ticker.ElapsedTime * 0.001;
        }
    }




}   