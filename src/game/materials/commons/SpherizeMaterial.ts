// import { Material, WebGLProgramParametersWithUniforms, WebGLRenderer } from "three";
// import { UniversManager } from "../../managers/UniversManager";
// import { Vector3 } from "yuka";

// export class SpherizeMaterial {
//     private readonly _baseMaterial: Material;
//     private readonly _baseMaterial_onBeforeRender: (renderer: WebGLRenderer) => void;
//     private _uniforms: { [uniform: string]: any } = {};

//     constructor(material: Material) {
//         this._baseMaterial = material;
//         this._baseMaterial_onBeforeRender = material['onBeforeRender'];
//         this._baseMaterial['onBeforeRender'] = this._onBeforeRender;
//         this._baseMaterial['uniforms'] = this._baseMaterial['uniforms'] || {};
//     }

//     private _initFromMaterial(material: Material): void {
//         material.onBeforeCompile = (parameters: WebGLProgramParametersWithUniforms, renderer: WebGLRenderer) => {
//             this._initFromOnBeforeCompile(parameters, renderer);
//         };
//     }

//     public static InitFromMaterial(material: Material): void {
//         new SpherizeMaterial(material)._initFromMaterial(material);
//     }

//     public static InitFromOnBeforeCompile(material: Material, parameters: WebGLProgramParametersWithUniforms, renderer: WebGLRenderer): void {
//         new SpherizeMaterial(material)._initFromOnBeforeCompile(parameters, renderer);
//     }

//     private readonly _onBeforeRender = (renderer: WebGLRenderer): void => {
//         if (!this._uniforms) return;
//         const game = UniversManager.GetCurrentGame();
//         const pos = game?.player?.body?.translation();
//         if (!pos) return;
//         this._uniforms.spherizeCenter.value.x = pos.x;
//         this._uniforms.spherizeCenter.value.z = pos.z;
//         this._baseMaterial_onBeforeRender.apply(this._baseMaterial, [renderer]);
//     };

//     private _initFromOnBeforeCompile(parameters: WebGLProgramParametersWithUniforms, renderer: WebGLRenderer): void {
//         // vertex shader
//         this._uniforms = parameters.uniforms;
//         this._uniforms.spherizeCenter = { value: new Vector3(0, 0, 0) };
//         this._uniforms.spherizeRadius = { value: 1000 };

//         //
//         // vertex
//         //
//         parameters.vertexShader = parameters.vertexShader.replace('#include <common>',/*glsl*/`
//             #include <common>
//             uniform vec3 spherizeCenter;
//             uniform float spherizeRadius;
//         `);

//         parameters.vertexShader = parameters.vertexShader.replace('#include <project_vertex>',/*glsl*/`
//             #include <project_vertex>
//             vec4 spherizeworld = vec4( transformed, 1.0 );
//             #ifdef USE_BATCHING
//             spherizeworld = batchingMatrix * spherizeworld;
//             #endif
//             #ifdef USE_INSTANCING
//             spherizeworld = instanceMatrix * spherizeworld;
//             #endif
        
//             spherizeworld = modelMatrix * spherizeworld;
//             float r = spherizeRadius;
//             // vec4 world = vec4(transformed, 1.0);
//             float spherizedx = spherizeworld.x - spherizeCenter.x;
//             float spherizedy = spherizeworld.y - (spherizeCenter.y - r);
//             float spherizedz = spherizeworld.z - spherizeCenter.z;

//             float spherizerho = sqrt(spherizedx*spherizedx + spherizedy*spherizedy + spherizedz*spherizedz);
//             float spherizephi = acos(spherizedy/spherizerho);
//             float spherizetheta = atan(spherizedz, spherizedx);

//             spherizerho = r + spherizeworld.y;
//             float spherizex = spherizerho * sin(spherizephi) * cos(spherizetheta) + spherizeCenter.x;
//             float spherizez = spherizerho * sin(spherizephi) * sin(spherizetheta) + spherizeCenter.z;
//             float spherizey = spherizerho * cos(spherizephi) + spherizeCenter.y - r;

//             // x = mix(world.x, x, progression);
//             // y = mix(world.y, y, progression);
//             // z = mix(world.z, z, progression);

//             spherizeworld = vec4(spherizex, spherizey, spherizez, 1.0);


//             gl_Position = projectionMatrix *viewMatrix * spherizeworld;

//         `);

//     }
// }
