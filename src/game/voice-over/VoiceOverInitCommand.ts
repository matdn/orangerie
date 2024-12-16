import InitCommandBase from '../core/commands/inits/initcommands/bases/InitCommandBase.ts';
import { CommonAssetsManager } from '../../../libs/cooker/common';
import { VoiceOverProxy } from './VoiceOverProxy.ts';

export class VoiceOverInitCommand extends InitCommandBase {
  public override async initCommon(): Promise<void> {
    VoiceOverProxy.AllVoiceOvers.forEach(speech => {
      CommonAssetsManager.AddSound(speech.key, { src: speech.urlOfFile });
    });
  }
}
