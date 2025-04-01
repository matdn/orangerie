import { ThreeAssetsManager } from '@cooker/three';
import { ViewsProxy } from 'pancake';
import { MuseumCameraController } from '../../../cameras/MuseumCameraController';
import { AssetId } from '../../../constants/games/AssetId';
import { ViewId } from '../../../constants/views/ViewId';
import { ViewPlacementId } from '../../../constants/views/ViewPlacementId';
import ReactHTMLView from '../../../core/_engine/htmls/views/ReactHTMLView';
import { ThreeCamerasProxy } from '../../../core/_engine/threejs/proxies/ThreeCamerasProxy';
import { ThreePostProcessingsProxy } from '../../../core/_engine/threejs/proxies/ThreePostProcessingsProxy';
import InitCommandBase from "../../../core/commands/inits/initcommands/bases/InitCommandBase";
import MuseumReactView from '../../../views/doms/reacts/MuseumReactView';
import GaleryThreeView from '../../../views/threes/components/GaleryThreeView';
import MuseumThreeView from '../../../views/threes/MuseumThreeView';
import { AnalyseGLTFCommand } from '../AnalyseGLTFCommand';


export class MuseumInitCommand extends InitCommandBase {

    public override async initProxies(): Promise<void> {
        ThreeCamerasProxy.AddCamera(new MuseumCameraController());
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
        ThreeAssetsManager.AddRGBE(AssetId.HDR_MUSEUM, this._getAssetPath('hdr/lobby.hdr'));
        ThreeAssetsManager.AddRGBE(AssetId.HDR_LOBBY_2, this._getAssetPath('hdr/park.hdr'));


    }

    public override async addViews(): Promise<void> {
        ViewsProxy.AddViewConstructor(ViewId.THREE_MUSEUM, MuseumThreeView);
        ViewsProxy.AddView(new ReactHTMLView(ViewId.MUSEUM_REACT, ViewPlacementId.NONE, MuseumReactView, 0));
        ViewsProxy.AddViewConstructor(ViewId.THREE_GALERY, GaleryThreeView);
    }

    public override async addTheaters(): Promise<void> {
        // 
    }


    public override async initAfterLoad(): Promise<void> {
        AnalyseGLTFCommand.Analyse(ThreeAssetsManager.GetModel(AssetId.GLTF_MUSEUM), AssetId.GLTF_MUSEUM);
    }

}

