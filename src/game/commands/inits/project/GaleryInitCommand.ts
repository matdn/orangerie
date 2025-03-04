import { ViewsProxy } from 'pancake';
import { ViewId } from '../../../constants/views/ViewId';
import InitCommandBase from "../../../core/commands/inits/initcommands/bases/InitCommandBase";
import MainThreeView from "../../../views/threes/MainThreeView";
import GaleryReactView from '../../../views/doms/reacts/GaleryReactView';
import ReactHTMLView from '../../../core/_engine/htmls/views/ReactHTMLView';
import { ViewPlacementId } from '../../../constants/views/ViewPlacementId';
import { AssetId } from '../../../constants/games/AssetId';
import { ThreeAssetsManager } from '@cooker/three';
import { ThreeCamerasProxy } from '../../../core/_engine/threejs/proxies/ThreeCamerasProxy';
import { GaleryCameraController } from '../../../cameras/GaleryCameraController';
import GaleryThreeView from '../../../views/threes/components/GaleryThreeView';


export class GaleryInitCommand extends InitCommandBase {

    public override async initProxies(): Promise<void> {
        ThreeCamerasProxy.AddCamera(new GaleryCameraController());

        // GamesProxy.AddGame(new JapanUniverGame());
    }

    public override async initManagers(): Promise<void> {
        // 
    }


    public override async initCommon(): Promise<void> {
        // CommonAssetsManager.AddSound(AssetId.SOUND_JAPAN_LOOP, { src: this._getAssetPath('sounds/games/japan/loop.mp3'), loop: true, volume: 0.04, sprite: { loop: [0, 64062] } }, { audioMixerId: AudioMixerManager.MUSIC })
        ThreeAssetsManager.AddTexture(AssetId.GALERY_1, this._getAssetPath('images/img1.jpg'));
        ThreeAssetsManager.AddTexture(AssetId.GALERY_2, this._getAssetPath('images/img2.jpg'));
        ThreeAssetsManager.AddTexture(AssetId.GALERY_3, this._getAssetPath('images/img3.jpg'));
        ThreeAssetsManager.AddTexture(AssetId.GALERY_4, this._getAssetPath('images/img4.jpg'));
        ThreeAssetsManager.AddTexture(AssetId.GALERY_5, this._getAssetPath('images/img5.jpg'));
        ThreeAssetsManager.AddTexture(AssetId.GALERY_6, this._getAssetPath('images/img6.jpg'));
        ThreeAssetsManager.AddTexture(AssetId.GALERY_7, this._getAssetPath('images/img7.jpg'));


    }

    public override async initPixi(): Promise<void> {
        // 
    }

    public override async initThree(): Promise<void> {
        // ThreeAssetsManager.AddModel(AssetId.GLTF_JAPAN, this._getAssetPath('models/japan.glb'));
    }

    public override async addViews(): Promise<void> {
        ViewsProxy.AddView(new ReactHTMLView(ViewId.GALERY_REACT, ViewPlacementId.REACT_VIEWS, GaleryReactView, 0));
        ViewsProxy.AddViewConstructor(ViewId.THREE_GALERY, GaleryThreeView);

        // ViewsProxy.AddViewConstructor(ViewId.THREE_JAPAN, JapanThreeView);
    }

    public override async addTheaters(): Promise<void> {
        // 
    }


    public override async initAfterLoad(): Promise<void> {
        // AnalyseGLTFCommand.Analyse(ThreeAssetsManager.GetModel(AssetId.GLTF_JAPAN), AssetId.GLTF_JAPAN);
    }

}
