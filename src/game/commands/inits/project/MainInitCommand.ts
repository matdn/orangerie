import { ViewsProxy } from 'pancake';
import { ViewId } from '../../../constants/views/ViewId';
import InitCommandBase from "../../../core/commands/inits/initcommands/bases/InitCommandBase";
import MainThreeView from "../../../views/threes/MainThreeView";


export class MainInitCommand extends InitCommandBase {

    public override async initProxies(): Promise<void> {
        // GamesProxy.AddGame(new JapanUniverGame());
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
        // ThreeAssetsManager.AddModel(AssetId.GLTF_JAPAN, this._getAssetPath('models/japan.glb'));
    }

    public override async addViews(): Promise<void> {
        ViewsProxy.AddViewConstructor(ViewId.THREE_MAIN, MainThreeView);
        // ViewsProxy.AddViewConstructor(ViewId.THREE_JAPAN, JapanThreeView);
    }

    public override async addTheaters(): Promise<void> {
        // 
    }


    public override async initAfterLoad(): Promise<void> {
        // AnalyseGLTFCommand.Analyse(ThreeAssetsManager.GetModel(AssetId.GLTF_JAPAN), AssetId.GLTF_JAPAN);
    }

}
