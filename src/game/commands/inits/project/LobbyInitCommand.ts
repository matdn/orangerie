import { ViewsProxy } from 'pancake';
import { ViewId } from '../../../constants/views/ViewId';
import InitCommandBase from "../../../core/commands/inits/initcommands/bases/InitCommandBase";
import MainThreeView from "../../../views/threes/MainThreeView";
import { ThreeAssetsManager } from '@cooker/three';
import { AssetId } from '../../../constants/games/AssetId';
import LobbyThreeView from '../../../views/threes/LobbyThreeView';
import { AnalyseGLTFCommand } from '../AnalyseGLTFCommand';
import { ThreeCamerasProxy } from '../../../core/_engine/threejs/proxies/ThreeCamerasProxy';
import { LobbyCameraController } from '../../../cameras/LobbyCameraController';
import { ThreePostProcessingsProxy } from '../../../core/_engine/threejs/proxies/ThreePostProcessingsProxy';
import { BloomPostProcessing } from '../../../postprocessings/BloomPostProcessing';
import ReactHTMLView from '../../../core/_engine/htmls/views/ReactHTMLView';
import { ViewPlacementId } from '../../../constants/views/ViewPlacementId';
import LobbyReactView from '../../../views/doms/reacts/LobbyReactView';


export class LobbyInitCommand extends InitCommandBase {

    public override async initProxies(): Promise<void> {
        // GamesProxy.AddGame(new JapanUniverGame());
        ThreeCamerasProxy.AddCamera(new LobbyCameraController());
        ThreePostProcessingsProxy.AddPostProcessing(new BloomPostProcessing());

    }

    public override async initManagers(): Promise<void> {
        // 

    }


    public override async initCommon(): Promise<void> {
        // CommonAssetsManager.AddSound(AssetId.SOUND_JAPAN_LOOP, { src: this._getAssetPath('sounds/games/japan/loop.mp3'), loop: true, volume: 0.04, sprite: { loop: [0, 64062] } }, { audioMixerId: AudioMixerManager.MUSIC })

    }

    public override async initPixi(): Promise<void> {
        // 
    }

    public override async initThree(): Promise<void> {
        ThreeAssetsManager.AddModel(AssetId.GLTF_LOBBY, this._getAssetPath('models/lobby.glb'));
        ThreeAssetsManager.AddRGBE(AssetId.HDR_WINTER, this._getAssetPath('hdr/kloppenheim_02_puresky_1k.hdr'));
        ThreeAssetsManager.AddRGBE(AssetId.HDR_AUTOMN, this._getAssetPath('hdr/autumn_forest_01_1k.hdr'));
        ThreeAssetsManager.AddRGBE(AssetId.HDR_LOBBY, this._getAssetPath('hdr/lobby.hdr'));
        ThreeAssetsManager.AddRGBE(AssetId.HDR_PARK, this._getAssetPath('hdr/park.hdr'));
    }

    public override async addViews(): Promise<void> {
        ViewsProxy.AddViewConstructor(ViewId.THREE_LOBBY, LobbyThreeView);
        ViewsProxy.AddView(new ReactHTMLView(ViewId.LOBBY_REACT, ViewPlacementId.NONE, LobbyReactView, 0));
    }

    public override async addTheaters(): Promise<void> {
        // 
    }


    public override async initAfterLoad(): Promise<void> {
        AnalyseGLTFCommand.Analyse(ThreeAssetsManager.GetModel(AssetId.GLTF_LOBBY), AssetId.GLTF_LOBBY);
    }

}
