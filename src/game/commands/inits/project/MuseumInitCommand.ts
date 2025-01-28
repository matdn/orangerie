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
import ReactHTMLView from '../../../core/_engine/htmls/views/ReactHTMLView';
import { ViewPlacementId } from '../../../constants/views/ViewPlacementId';
import MuseumReactView from '../../../views/doms/reacts/MuseumReactView';


export class MuseumInitCommand extends InitCommandBase {

    public override async initProxies(): Promise<void> {
        ThreeCamerasProxy.AddCamera(new MuseumCameraController());
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
        ThreeAssetsManager.AddModel(AssetId.GLTF_MUSEUM, this._getAssetPath('models/museum.glb'));
        // ThreeAssetsManager.AddRGBE(AssetId.HDR_WINTER, this._getAssetPath('hdr/kloppenheim_02_puresky_1k.hdr'));
        // ThreeAssetsManager.AddRGBE(AssetId.HDR_AUTOMN, this._getAssetPath('hdr/autumn_forest_01_1k.hdr'));
        ThreeAssetsManager.AddRGBE(AssetId.HDR_MUSEUM, this._getAssetPath('hdr/lobby1.hdr'));
        ThreeAssetsManager.AddRGBE(AssetId.HDR_PARK, this._getAssetPath('hdr/park.hdr'));

        ThreeAssetsManager.AddTexture(AssetId.TEXTURE_GROUND, this._getAssetPath('textures/commons/ground.png'));
        ThreeAssetsManager.AddTexture(AssetId.TEXTURE_AQUARELLE, this._getAssetPath('images/aquarelleText.webp'));
        ThreeAssetsManager.AddTexture(AssetId.TEXTURE_WALL_MUSEUM, this._getAssetPath('textures/commons/museumBakeWall.png'));

    }

    public override async addViews(): Promise<void> {
        ViewsProxy.AddViewConstructor(ViewId.THREE_MUSEUM, MuseumThreeView);
        ViewsProxy.AddView(new ReactHTMLView(ViewId.MUSEUM_REACT, ViewPlacementId.NONE, MuseumReactView, 0));

        // ViewsProxy.AddView(new ReactHTMLView(ViewId.LOBBY_REACT, ViewPlacementId.NONE, LobbyReactView, 0));
    }

    public override async addTheaters(): Promise<void> {
        // 
    }


    public override async initAfterLoad(): Promise<void> {
        AnalyseGLTFCommand.Analyse(ThreeAssetsManager.GetModel(AssetId.GLTF_MUSEUM), AssetId.GLTF_MUSEUM);
    }

}

