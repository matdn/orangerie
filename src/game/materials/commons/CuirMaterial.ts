// import { ThreeAssetsManager } from "@cooker/three";
// import { DoubleSide, MeshStandardMaterial, WebGLProgramParametersWithUniforms, WebGLRenderer } from "three";
// import { AssetId } from "../../constants/games/AssetId";
// import { DayCycleMaterial } from "../commons/DayCycleMaterial";

// export class CuirMaterial extends MeshStandardMaterial {

//     constructor() {
//         super({
//             color: 0x000000,
//             roughness: 1,
//             metalness: 0,
//             defines: {
//                 USE_UV: ''
//             },
//             side:DoubleSide,
//         });
//     }

//     onBeforeCompile(parameters: WebGLProgramParametersWithUniforms, renderer: WebGLRenderer): void {

//         parameters.uniforms.noiseTex = { value: ThreeAssetsManager.GetTexture(AssetId.TEXTURE_NOISE_BASIC) };

//         //
//         // Fragment Shader
//         //
//         parameters.fragmentShader = parameters.fragmentShader.replace('#include <common>',/*glsl*/`
//             #include <common>
//             uniform sampler2D noiseTex;
//         `);

//         parameters.fragmentShader = parameters.fragmentShader.replace('#include <opaque_fragment>',/*glsl*/`
//             #include <opaque_fragment>
//             vec2 uv = vUv;
//             float noise = texture2D(noiseTex, uv).r;
//             float l = 1.-dot(normalize(vNormal), normalize(vViewPosition));


//             gl_FragColor.rgb *= noise * l;
//         `);

//         DayCycleMaterial.InitFromOnBeforeCompile(parameters, renderer);
//     }
// }