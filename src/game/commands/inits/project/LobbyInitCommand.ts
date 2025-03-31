import { ThreeAssetsManager } from '@cooker/three';
import { ViewsProxy } from 'pancake';
import { LobbyCameraController } from '../../../cameras/LobbyCameraController';
import { AssetId } from '../../../constants/games/AssetId';
import { ViewId } from '../../../constants/views/ViewId';
import { ViewPlacementId } from '../../../constants/views/ViewPlacementId';
import ReactHTMLView from '../../../core/_engine/htmls/views/ReactHTMLView';
import { ThreeCamerasProxy } from '../../../core/_engine/threejs/proxies/ThreeCamerasProxy';
import { ThreePostProcessingsProxy } from '../../../core/_engine/threejs/proxies/ThreePostProcessingsProxy';
import InitCommandBase from "../../../core/commands/inits/initcommands/bases/InitCommandBase";
import { BloomPostProcessing } from '../../../postprocessings/BloomPostProcessing';
import LobbyReactView from '../../../views/doms/reacts/LobbyReactView';
import LobbyThreeView from '../../../views/threes/LobbyThreeView';
import { AnalyseGLTFCommand } from '../AnalyseGLTFCommand';


export class LobbyInitCommand extends InitCommandBase {

    public override async initProxies(): Promise<void> {
        ThreeCamerasProxy.AddCamera(new LobbyCameraController());
        ThreePostProcessingsProxy.AddPostProcessing(new BloomPostProcessing());
    }

    public override async initManagers(): Promise<void> {
        // 

    }


    public override async initCommon(): Promise<void> {
    }

    public override async initPixi(): Promise<void> {
    }

    public override async initThree(): Promise<void> {
        ThreeAssetsManager.AddModel(AssetId.GLTF_LOBBY, this._getAssetPath('models/lobby.glb'));
        ThreeAssetsManager.AddRGBE(AssetId.HDR_LOBBY, this._getAssetPath('hdr/lobby.hdr'));
        ThreeAssetsManager.AddRGBE(AssetId.HDR_LOBBY_2, this._getAssetPath('hdr/lobby2.hdr'));
        ThreeAssetsManager.AddTexture(AssetId.TEXTURE_MIDDLE_BLOC, this._getAssetPath('textures/commons/bake1.png'));
        ThreeAssetsManager.AddTexture(AssetId.TEXTURE_WALL_BAKE, this._getAssetPath('textures/commons/wallBake.png'));
        ThreeAssetsManager.AddTexture(AssetId.TEXTURE_FLOAR, this._getAssetPath('textures/commons/floar.png'));
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
