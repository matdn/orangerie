import { ThreeAssetsManager } from '@cooker/three';
import { ViewsProxy } from 'pancake';
import { GallerieCameraController } from '../../../cameras/GallerieCameraController';
import { AssetId } from '../../../constants/games/AssetId';
import { ViewId } from '../../../constants/views/ViewId';
import { ViewPlacementId } from '../../../constants/views/ViewPlacementId';
import ReactHTMLView from '../../../core/_engine/htmls/views/ReactHTMLView';
import { ThreeCamerasProxy } from '../../../core/_engine/threejs/proxies/ThreeCamerasProxy';
import { ThreePostProcessingsProxy } from '../../../core/_engine/threejs/proxies/ThreePostProcessingsProxy';
import InitCommandBase from "../../../core/commands/inits/initcommands/bases/InitCommandBase";
import { AquarellePostProcessing } from '../../../postprocessings/AquarellePostProcessing';
import GallerieReactView from '../../../views/doms/reacts/GallerieReactView';


export class GallerieInitCommand extends InitCommandBase {

    public override async initProxies(): Promise<void> {
        console.log("GallerieInitCommand instancié !");
        ThreeCamerasProxy.AddCamera(new GallerieCameraController());
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
 
    }

    public override async addViews(): Promise<void> {
        console.log("museum views added");
        ViewsProxy.AddView(new ReactHTMLView(ViewId.GALLERIE_REACT, ViewPlacementId.NONE, GallerieReactView, 0));
    }

    public override async addTheaters(): Promise<void> {
        // 
    }


    public override async initAfterLoad(): Promise<void> {
    }

}

