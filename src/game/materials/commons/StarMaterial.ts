import { Ticker } from "cookware";
import { IUniform, PointsMaterial, WebGLProgramParametersWithUniforms, WebGLRenderer } from "three";

export class StarMaterial extends PointsMaterial {


    private _uniforms: { [uniform: string]: IUniform } | undefined;

    constructor() {
        super({
            size: 0.2,
            sizeAttenuation: true,
            depthWrite: false,
            transparent: true,
        })
    }

    onBeforeCompile(parameters: WebGLProgramParametersWithUniforms, renderer: WebGLRenderer): void {
        this._uniforms = parameters.uniforms;
        this._uniforms.time = { value: 0 };
        //
        // Vertex
        //
        parameters.vertexShader = parameters.vertexShader.replace('#include <common>', /*glsl*/`
            uniform float time;
            attribute float random;
            varying float vrandom;
            #include <common>
        `);

        parameters.vertexShader = parameters.vertexShader.replace('#include <fog_vertex>', /*glsl*/`
            #include <fog_vertex>
            vrandom = random;
        `);

        //
        // Fragment
        //
        parameters.fragmentShader = parameters.fragmentShader.replace('#include <common>', /*glsl*/`
            uniform float time;
            varying float vrandom;
            #include <common>
        `);

        parameters.fragmentShader = parameters.fragmentShader.replace('#include <opaque_fragment>', /*glsl*/`
            #include <opaque_fragment>
            vec4 col = gl_FragColor;
            col.a = (cos(time*vrandom + vrandom*100.)+1.)*0.5;
            gl_FragColor = col;
        `);

    }

    onBeforeRender(renderer: WebGLRenderer): void {
        if (this._uniforms) {
            this._uniforms.time.value = Ticker.ElapsedTime*0.01;
        }
    }


}