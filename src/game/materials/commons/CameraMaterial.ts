// import { Material, WebGLProgramParametersWithUniforms, WebGLRenderer } from "three";
// import { ThreeCamerasManager } from "../../core/_engine/threejs/managers/ThreeCamerasManager";
// import { GamesProxy } from "../../core/proxies/GamesProxy";
// import { UniverGameBase } from "../../games/bases/UniverGameBase";
// import { UniversManager } from "../../managers/UniversManager";

// export class CameraMaterial {
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
//         new CameraMaterial(material)._initFromMaterial(material);
//     }

//     public static InitFromOnBeforeCompile(material: Material, parameters: WebGLProgramParametersWithUniforms, renderer: WebGLRenderer): void {
//         new CameraMaterial(material)._initFromOnBeforeCompile(parameters, renderer);
//     }

//     private readonly _onBeforeRender = (renderer: WebGLRenderer): void => {
//         const game = GamesProxy.GetGame<UniverGameBase>(UniversManager.CurrentUniver.gameId);
//         const camera = ThreeCamerasManager.ActivCamera;
//         if (!game) return;
//         if (!game.player) return;
//         if (!camera) return;
//         const pos = game.player.body.translation();
//         let dx = pos.x - camera.position.x;
//         let dy = pos.y - camera.position.y;
//         let dz = pos.z - camera.position.z;
//         this._uniforms.playerDistance.value = Math.sqrt(dx * dx + dy * dy + dz * dz);        
//         this._baseMaterial_onBeforeRender.apply(this._baseMaterial, [renderer]);
//     };

//     private _initFromOnBeforeCompile(parameters: WebGLProgramParametersWithUniforms, renderer: WebGLRenderer): void {
//         // vertex shader
//         this._uniforms = parameters.uniforms;
//         this._uniforms.playerDistance = { value: 0 };

//         // console.log('parameters.vertexShader', parameters.uniforms);
//         // parameters.uniforms.playerDistance = { value: 0 };

//         parameters.vertexShader = /*glsl*/`
//             varying vec3 vposition;
//             varying mat4 vmodelViewMatrix;
//             varying mat4 vinstanceMatrix;
//         ` + '\n' + parameters.vertexShader;

//         let s = parameters.vertexShader.trim();
//         const vert = /*glsl*/`
//             vposition = position;
//             vmodelViewMatrix = modelViewMatrix;
//             vinstanceMatrix = instanceMatrix;
//         `;
//         parameters.vertexShader = s.substring(0, s.length - 1) + vert + '\n}';


//         // fragment shader
//         parameters.fragmentShader = /*glsl*/`
//             varying vec3 vposition;
//             varying mat4 vmodelViewMatrix;
//             varying mat4 vinstanceMatrix;
//             uniform float playerDistance;
//         ` + '\n' + parameters.fragmentShader;

//         s = parameters.fragmentShader.trim();
//         const frag = /*glsl*/`
//             vec4 viewPosition = vmodelViewMatrix * vinstanceMatrix * vec4(vposition, 1.0);

//             float dx = viewPosition.x;
//             float dy = viewPosition.y;
//             float dz = viewPosition.z;
//             float d = sqrt(dx * dx + dy * dy);
//             float radius = 4.;

//             float zz = -dz/playerDistance;
//             zz = step(1., zz);
//             // if (d<radius) gl_FragColor.a = d/radius;
//             if (d<radius && zz<1.) gl_FragColor.a = d/radius;
//             // gl_FragColor.rgb = vec3(zz);
//             // if(zz<1.)gl_FragColor.rgb = vec3(1.);
//         `;

//         parameters.fragmentShader = s.substring(0, s.length - 1) + frag + '\n}';
//     }
// }
