import { PixiAssetsManager } from "@cooker/pixi";
import InitCommandBase from "../../../../../commands/inits/initcommands/bases/InitCommandBase";
import { MainPixi } from "../../../MainPixi";



export class PixiInitCommand extends InitCommandBase {

    public override async initProxies(): Promise<void> {
    }

    public override async initManagers(): Promise<void> {
    }

    public override async addViews(): Promise<void> {
    }

    public override async addTheaters(): Promise<void> {
    }

    public override async initCommon(): Promise<void> {
    }

    public override async initPixi(): Promise<void> {
        PixiAssetsManager.Init();
   }

    public override async initThree(): Promise<void> {
    }

    public override async initAfterLoad(): Promise<void> {
        MainPixi.Init();
    }

}