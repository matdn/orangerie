import { IUniform, MeshBasicMaterial, WebGLProgramParametersWithUniforms, WebGLRenderer, Vector2 } from "three";

export class WaveMaterial extends MeshBasicMaterial {
    private _uniforms: { [uniform: string]: IUniform; } | undefined;

    constructor() {
        super({
            color: 0xeeeeee,
            // transparent: true,
        });
    }

    onBeforeCompile(parameters: WebGLProgramParametersWithUniforms, renderer: WebGLRenderer): void {
        this._uniforms = parameters.uniforms;
        this._uniforms.uCursor = { value: new Vector2(-1, -1) };
        this._uniforms.uTime = { value: 0 };

        //
        // Vertex Shader
        //
        parameters.vertexShader = parameters.vertexShader.replace(
            `#include <common>`,
            /* glsl */ `
            uniform vec2 uCursor;
            uniform float uTime;
            varying vec2 vUv;
            #include <common>
        `
        );

        parameters.vertexShader = parameters.vertexShader.replace(
            `#include <uv_vertex>`,
            /* glsl */ `
            #include <uv_vertex>
            vUv = uv;
        `
        );

        //
        // Fragment Shader
        //
        parameters.fragmentShader = parameters.fragmentShader.replace(
            `#include <common>`,
            /* glsl */ `
            uniform vec2 uCursor;
            uniform float uTime;
            varying vec2 vUv;
            #include <common>
        `
        );

        parameters.fragmentShader = parameters.fragmentShader.replace(
            `#include <dithering_fragment>`,
            /* glsl */ `
            float dist = distance(vUv, uCursor);
            float wave = sin(10.0 * dist - uTime * 1.0) * exp(-5.0 * dist);
            vec3 color = vec3(1., 1., 1.) + wave * 0.2;
            gl_FragColor = vec4(color, 1.0 - dist);
            #include <dithering_fragment>
        `
        );
    }

    updateCursor(cursor: Vector2): void {
        if (this._uniforms) {
            this._uniforms.uCursor.value = cursor;
        }
    }

    onBeforeRender(renderer: WebGLRenderer): void {
        if (this._uniforms) {
            this._uniforms.uTime.value += 0.01;
        }
    }
}
