import { IVoiceOver, VoiceOverProxy } from './VoiceOverProxy.ts';
import { CommonAssetsManager } from '../../../libs/cooker/common';
import { getAssetUrl, getCurrentLanguage } from '../../helpers/common.helpers.ts';
import { VoiceOverManager } from './VoiceOverManager.ts';

export class VoiceOverService {
  public static async Init() {
    const voiceOvers = await this.Load();
    Object.keys(voiceOvers)?.forEach(key => {
      const translationSpeech: IVoiceOver = {
        key: key,
        id: key,
        urlOfFile: voiceOvers[key]
      };
      VoiceOverProxy.AddVoiceOver(translationSpeech);
    });
  }

  public static async Reload() {
    VoiceOverManager.ClearVoiceOvers();

    await this.Init();

    VoiceOverProxy.AllVoiceOvers.forEach(speech => {
      CommonAssetsManager.UpdateSound(speech.key, { src: speech.urlOfFile });
    });

    await CommonAssetsManager.Load();
  }

  private static async Load() {
    try {
      const audioData: Response = await fetch(getAssetUrl(`/locales/audio/audio.${getCurrentLanguage()}.json`));
      const json = await audioData?.json();
      return json || {};
    } catch (e) {
      console.warn(e);
      return {};
    }
  }
}
