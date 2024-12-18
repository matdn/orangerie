import { TheatersProxy, ViewsProxy } from 'pancake';
import { ViewId } from '../../../constants/views/ViewId';
import { ViewPlacementId } from '../../../constants/views/ViewPlacementId';
import ReactHTMLView from '../../../core/_engine/htmls/views/ReactHTMLView';
import MainThreeReactView from '../../../core/_engine/reacts/views/MainThreeReactView';
import { MainThree } from '../../../core/_engine/threejs/MainThree';
import InitCommandBase from "../../../core/commands/inits/initcommands/bases/InitCommandBase";
import { MainTheater } from "../../../theaters/MainThreeTheater";
import { TranslationKeyReactView } from '../../../views/doms/reacts/translation-key/TranslationKeyReactView';
import { LobbyThreeTheater } from '../../../theaters/LobbyThreeTheater';
import { ThreeAssetsManager } from '@cooker/three';
import { AssetId } from '../../../constants/games/AssetId';
import { AnalyseGLTFCommand } from '../AnalyseGLTFCommand';
import { DayCycleManager } from '../../../managers/DayCycleManager';


export class CommonProjectInitCommand extends InitCommandBase {

    public override async initProxies(): Promise<void> {
        // 
    }

    public override async initManagers(): Promise<void> {
        DayCycleManager.Init();
    }


    public override async initCommon(): Promise<void> {
        // 
    }

    public override async initPixi(): Promise<void> {
        // 
    }

    public override async initThree(): Promise<void> {
        ThreeAssetsManager.AddModel(AssetId.GLTF_COMMON, this._getAssetPath('models/common.glb'));
        ThreeAssetsManager.AddTexture(AssetId.TEXTURE_SKY, this._getAssetPath('textures/commons/sky.webp'));
        ThreeAssetsManager.AddTexture(AssetId.TEXTURE_SKY_CLOUDS, this._getAssetPath('textures/commons/Clouds.webp'));
        ThreeAssetsManager.AddTexture(AssetId.TEXTURE_WHITE, this._getAssetPath('textures/commons/white.webp'));
        ThreeAssetsManager.AddTexture(AssetId.TEXTURE_LUT_GLOBAL, this._getAssetPath('textures/luts/Global64Lut.webp'));

    }

    public override async addViews(): Promise<void> {

        ViewsProxy.AddView(new ReactHTMLView(ViewId.TRANSLATION_KEY, ViewPlacementId.TRANSLATION_KEY, TranslationKeyReactView));
        ViewsProxy.AddView(new ReactHTMLView(MainThree.VIEW_ID, ViewPlacementId.REACT_THREE, MainThreeReactView));
    }

    public override async addTheaters(): Promise<void> {
        TheatersProxy.AddTheater(new MainTheater());
        TheatersProxy.AddTheater(new LobbyThreeTheater());
        // TheatersProxy.AddTheater(new MuseumThreeTheater());
    }


    public override async initAfterLoad(): Promise<void> {
        AnalyseGLTFCommand.Analyse(ThreeAssetsManager.GetModel(AssetId.GLTF_COMMON), AssetId.GLTF_COMMON);

    }

}
