import { ThreeAssetsManager } from "@cooker/three";
import { ClampToEdgeWrapping, IUniform, Material, NearestFilter, NoColorSpace, Vector2, WebGLProgramParametersWithUniforms, WebGLRenderer } from "three";
import { AssetId } from "../../constants/games/AssetId";
import { DayCycleManager } from "../../managers/DayCycleManager";

export class DayCycleMaterial {

    public static readonly REPLACE_KEY: string = '//#<daycycle>';

    public static InitFromMaterial(material: Material): void {
        new DayCycleMaterial()._initFromMaterial(material);
    }


    public static InitFromOnBeforeCompile(parameters: WebGLProgramParametersWithUniforms, renderer: WebGLRenderer): void {
        new DayCycleMaterial()._initFromOnBeforeCompile(parameters, renderer);
    }

    //
    //
    //

    private _uniforms: { [uniform: string]: IUniform; };


    constructor() {
        DayCycleManager.OnChangeHour.add(this._onHourChange);
        this._onHourChange();
    }

    private readonly _onHourChange = () => {
        if (this._uniforms) {
            this._uniforms.lutAUV.value = DayCycleManager.LUT_A.textureUV;
            this._uniforms.lutBUV.value = DayCycleManager.LUT_B.textureUV;
            this._uniforms.lutAmount.value = DayCycleManager.LutAmount;
            this._uniforms.lutSkyIntensity.value = DayCycleManager.SkyIntensity;
        }
    };

    private _initFromMaterial(material: Material): void {
        material.onBeforeCompile = (parameters: WebGLProgramParametersWithUniforms, renderer: WebGLRenderer) => {
            this._initFromOnBeforeCompile(parameters, renderer);
        };
    }


    private _initFromOnBeforeCompile(parameters: WebGLProgramParametersWithUniforms, renderer: WebGLRenderer): void {

        this._uniforms = parameters.uniforms;


        const lutTex = ThreeAssetsManager.GetTexture(AssetId.TEXTURE_LUT_GLOBAL);
        lutTex.flipY = true;
        lutTex.minFilter = lutTex.magFilter = NearestFilter;
        lutTex.wrapS = lutTex.wrapT = ClampToEdgeWrapping;
        lutTex.colorSpace = NoColorSpace;

        this._uniforms.lutAmount = { value: DayCycleManager.LutAmount };
        this._uniforms.lutTex = { value: lutTex };
        this._uniforms.lutAUV = { value: new Vector2(0, 0) };
        this._uniforms.lutBUV = { value: new Vector2(0, 0) };
        this._uniforms.lutSkyIntensity = { value: DayCycleManager.SkyIntensity };

        this._uniforms.tiles = { value: new Vector2(8, 8) };
        this._uniforms.tileSize = { value: new Vector2(64, 64) };
        this._uniforms.invTiles = { value: new Vector2(1 / this._uniforms.tiles.value.x, 1 / this._uniforms.tiles.value.y) };
        this._uniforms.invTileSize = { value: new Vector2(1 / this._uniforms.tileSize.value.x, 1 / this._uniforms.tileSize.value.y) };

        let key = '#include <common>';
        if (parameters.fragmentShader.includes(DayCycleMaterial.REPLACE_KEY)) {
            key = DayCycleMaterial.REPLACE_KEY;
        }

        parameters.fragmentShader = parameters.fragmentShader.replace(key, /*glsl*/`
            ${key}
            const vec3 ZERO_VEC3 = vec3(0.);
            const vec3 ONE_VEC3 = vec3(1.);

            uniform sampler2D lutTex;
            uniform float lutAmount;
            uniform vec2 lutAUV;
            uniform vec2 lutBUV;
            uniform float lutSkyIntensity;
            uniform vec2 tiles;
            uniform vec2 tileSize;
            uniform vec2 invTiles;
            uniform vec2 invTileSize;

            const vec3 POW_CONSTANT = vec3(0.41666);
            const vec3 THRESHOLD = vec3(0.0031308);
            const vec3 DECAL = vec3(0.055);
          
            // vec4 linearTosRGB2( in vec4 value ) {
            //     return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
            // }

            // vec4 linearTosRGB(in vec4 value) {
            //     vec3 linearRGB = pow(value.rgb, POW_CONSTANT);
            //     vec3 sRGB = mix(linearRGB * 1.055 - DECAL, linearRGB * 12.92, step(linearRGB, THRESHOLD));
            //     return vec4(sRGB, value.a);
            // }

           
            vec4 applyLUT(vec4 tex)
            {
                tex = clamp(tex, 0.0, 1.0);
                // vec2 tiles    = vec2(8.0, 8.0);
                // vec2 tileSize = vec2(64.0);
                float index = tex.b * (tiles.x * tiles.y - 1.0);
                vec2 tileIndex;
                
                // tileIndex.y = floor(index / tiles.x);
                tileIndex.y = floor(index * invTiles.x);

                tileIndex.x = floor(index - tileIndex.y * tiles.x);

                // vec2 tileUV = mix(0.5/tileSize, (tileSize-0.5)/tileSize, tex.rg);
                vec2 tileUV = mix(0.5*invTileSize, (tileSize-0.5)*invTileSize, tex.rg);

                // vec2 tableUV = tileIndex / tiles + tileUV / tiles;
                vec2 tableUV = tileIndex * invTiles + tileUV * invTiles;

                vec4 col1 = texture2D(lutTex, tableUV*0.5 + lutAUV);
                vec4 col2 = texture2D(lutTex, tableUV*0.5 + lutBUV);

                vec4 col = col1 + lutAmount*(col2-col1);
                col.a = tex.a;
                return col;
                // return linearTosRGB(col);
            }

          
        `);

        const s = parameters.fragmentShader.trim();
        let lut = '';


        if (
            parameters.vertexShader.includes('#define NIGHTLIGHT') ||
            parameters.fragmentShader.includes('#define NIGHTLIGHT')
        ) {
            lut = /*glsl*/`
            vec4 finalResult = applyLUT(gl_FragColor);
            finalResult.rgb += (nightLight.rgb * nightLight.a)*(1.-lutSkyIntensity);
            gl_FragColor = finalResult;
            `;
        } else if (parameters.defines?.USE_LIGHT) {
            lut = /*glsl*/`
                // #if ( MY_CUSTOM_DEFINE > 0 )
                float l = directLight.color.r;
                l =clamp(l, 0.0, 1.0);
                vec3 lightColor = gl_FragColor.rgb;
                vec3 lut = applyLUT(gl_FragColor).rgb;
                gl_FragColor.rgb = lightColor * l + lut * (1.0 - l);

                gl_FragColor.rgb = clamp(gl_FragColor.rgb, ZERO_VEC3, ONE_VEC3);

                // #else
                // gl_FragColor = applyLUT(gl_FragColor);
                // #endif
                // gl_FragColor.rgb = directLight.color;
                // gl_FragColor.rgb = directLight.color;
            `;
        } else {
            lut = /*glsl*/`
                gl_FragColor = applyLUT(gl_FragColor);
                gl_FragColor.rgb = clamp(gl_FragColor.rgb, ZERO_VEC3, ONE_VEC3);


            `;
        }


        parameters.fragmentShader = s.substring(0, s.length - 1) + lut + '\n}';

        this._onHourChange();
    }
}