import { TheatersProxy, ViewsProxy } from 'pancake';
import { ViewId } from '../../../constants/views/ViewId';
import { ViewPlacementId } from '../../../constants/views/ViewPlacementId';
import ReactHTMLView from '../../../core/_engine/htmls/views/ReactHTMLView';
import MainThreeReactView from '../../../core/_engine/reacts/views/MainThreeReactView';
import { MainThree } from '../../../core/_engine/threejs/MainThree';
import InitCommandBase from '../../../core/commands/inits/initcommands/bases/InitCommandBase';
import { MainTheater } from '../../../theaters/MainThreeTheater';
import { LobbyThreeTheater } from '../../../theaters/LobbyThreeTheater';
import { ThreeAssetsManager } from '@cooker/three';
import { AssetId } from '../../../constants/games/AssetId';
import { AnalyseGLTFCommand } from '../AnalyseGLTFCommand';
import { MuseumThreeTheater } from '../../../theaters/MuseeThreeTheater';

import { AudioMixerManager, CommonAssetsManager } from '@cooker/common';
import { SoundId } from '../../../constants/games/SoundId';
import { AssetsUtils } from '../../../core/utils/AssetsUtils';

export class CommonProjectInitCommand extends InitCommandBase {
  public override async initProxies(): Promise<void> {
    //
  }

  public override async initManagers(): Promise<void> {}

  public override async initCommon(): Promise<void> {
    CommonAssetsManager.AddSound(SoundId.MAIN_SOUND, {
      src: AssetsUtils.GetAssetURL('sounds/mainSound.mp3'),
      mute: true,
      volume: 0,
    });
  }

  public override async initPixi(): Promise<void> {
    //
  }

  public override async initThree(): Promise<void> {
    ThreeAssetsManager.AddModel(
      AssetId.GLTF_COMMON,
      this._getAssetPath('models/common.glb')
    );
    ThreeAssetsManager.AddTexture(
      AssetId.TEXTURE_LUT_GLOBAL,
      this._getAssetPath('textures/luts/Global64Lut.webp')
    );
  }

  public override async addViews(): Promise<void> {
    ViewsProxy.AddView(
      new ReactHTMLView(
        MainThree.VIEW_ID,
        ViewPlacementId.REACT_THREE,
        MainThreeReactView
      )
    );
  }

  public override async addTheaters(): Promise<void> {
    TheatersProxy.AddTheater(new MainTheater());
    TheatersProxy.AddTheater(new LobbyThreeTheater());
    TheatersProxy.AddTheater(new MuseumThreeTheater());
  }

  public override async initAfterLoad(): Promise<void> {
    AnalyseGLTFCommand.Analyse(
      ThreeAssetsManager.GetModel(AssetId.GLTF_COMMON),
      AssetId.GLTF_COMMON
    );
  }
}
