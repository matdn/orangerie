import { ThreeAssetsManager } from '@cooker/three';
import { ViewsProxy } from 'pancake';
import { MuseumCameraController } from '../../../cameras/MuseumCameraController';
import { AssetId } from '../../../constants/games/AssetId';
import { ViewId } from '../../../constants/views/ViewId';
import { ThreeCamerasProxy } from '../../../core/_engine/threejs/proxies/ThreeCamerasProxy';
import InitCommandBase from "../../../core/commands/inits/initcommands/bases/InitCommandBase";
import MuseumThreeView from '../../../views/threes/MuseumThreeView';
import { AnalyseGLTFCommand } from '../AnalyseGLTFCommand';
import { ThreePostProcessingsProxy } from '../../../core/_engine/threejs/proxies/ThreePostProcessingsProxy';
import { AquarellePostProcessing } from '../../../postprocessings/AquarellePostProcessing';
import ParkThreeView from '../../../views/threes/ParkThreeView';
import { ParkCameraController } from '../../../cameras/ParkCameraController';


export class ParkInitCommand extends InitCommandBase {

    public override async initProxies(): Promise<void> {
        ThreeCamerasProxy.AddCamera(new ParkCameraController());
        ThreePostProcessingsProxy.AddPostProcessing(new AquarellePostProcessing());

    }

    public override async initManagers(): Promise<void> {
        // 

    }


    public override async initCommon(): Promise<void> {

    }

    public override async initPixi(): Promise<void> {
        // 
    }

    public override async initThree(): Promise<void> {
        ThreeAssetsManager.AddModel(AssetId.GLTF_PARK, this._getAssetPath('models/park.glb'));
        ThreeAssetsManager.AddTexture(AssetId.TEXTURE_AQUARELLE, this._getAssetPath('images/aquarelleText.webp'));
        ThreeAssetsManager.AddRGBE(AssetId.HDR_LOBBY, this._getAssetPath('hdr/lobby.hdr'));


    }

    public override async addViews(): Promise<void> {
        ViewsProxy.AddViewConstructor(ViewId.THREE_PARK, ParkThreeView);
        // ViewsProxy.AddView(new ReactHTMLView(ViewId.LOBBY_REACT, ViewPlacementId.NONE, LobbyReactView, 0));
    }

    public override async addTheaters(): Promise<void> {
        // 
    }


    public override async initAfterLoad(): Promise<void> {
        AnalyseGLTFCommand.Analyse(ThreeAssetsManager.GetModel(AssetId.GLTF_PARK), AssetId.GLTF_PARK);
    }

}

