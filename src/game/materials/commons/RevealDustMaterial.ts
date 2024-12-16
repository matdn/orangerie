import { Ticker } from "cookware";
import { IUniform, PointsMaterial, PointsMaterialParameters, WebGLProgramParametersWithUniforms, WebGLRenderer } from "three";

export class RevealDustMaterial extends PointsMaterial {

    private _uniforms: { [uniform: string]: IUniform } | undefined;
    private readonly _height: number = 1;
    private readonly _speed: number = 1;

    constructor(height: number = 1, speed: number = 1) {
        const params: PointsMaterialParameters = {
            color: 0xFFD386,
            size: 0.01,
            sizeAttenuation: true,
            transparent: true,
            depthWrite: false,
        }
        super(params);
        this._height = height;
        this._speed = speed;
    }

    onBeforeCompile(parameters: WebGLProgramParametersWithUniforms, renderer: WebGLRenderer): void {
        this._uniforms = parameters.uniforms;
        this._uniforms.time = { value: 0 };
        this._uniforms.speed = { value: this._speed };
        this._uniforms.height = { value: this._height };
        this._uniforms.invHeight = { value: 1 / this._height };


        //
        // Vertex
        //
        parameters.vertexShader = parameters.vertexShader.replace('#include <common>', /*glsl*/`
            uniform float time;
            uniform float height;
            uniform float invHeight;
            uniform float speed;
            attribute float random;
            varying float vprogression;
            #include <common>
        `);

        parameters.vertexShader = parameters.vertexShader.replace('#include <begin_vertex>', /*glsl*/`
            #include <begin_vertex>
            vprogression = mod((time + random*height*10.) * speed, height);
            transformed.y += vprogression;
            vprogression = vprogression *= invHeight;
        `);

        //
        // Fragment
        //
        parameters.fragmentShader = parameters.fragmentShader.replace('#include <common>', /*glsl*/`
            uniform float time;
            varying float vprogression;
            #include <common>
        `);

        parameters.fragmentShader = parameters.fragmentShader.replace('#include <opaque_fragment>', /*glsl*/`
            #include <opaque_fragment>
            gl_FragColor.a = 1.-vprogression;
        `);

    }

    onBeforeRender(renderer: WebGLRenderer): void {
        if (this._uniforms) {
            this._uniforms.time.value = Ticker.ElapsedTime * 0.001;
        }
    }

}