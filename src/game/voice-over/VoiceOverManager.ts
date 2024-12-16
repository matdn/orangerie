import { IVoiceOver, VoiceOverProxy } from './VoiceOverProxy.ts';
import { CommonAssetsManager, Sound } from '@cooker/common';

export class VoiceOverManager {
  private static _PlayingVoiceOver: IVoiceOver | null = null;
  private static _IsMute: boolean = false;

  public static ToggleVoice(): void {
    this._IsMute = !this._IsMute;
    if (this._PlayingVoiceOver) {
      const sound = CommonAssetsManager.GetSound(this._PlayingVoiceOver.key) as Sound;
      if (!sound) {
        return;
      }
      sound.setVolume(this._IsMute ? 0 : 1);
    }
  }

  /**
   * Play a set of translations, one by one
   */
  public static PlayVoiceOvers(keys: string[], delay?: number): void {
    this.StopVoiceOver();
    this._UpdateVoiceOver(keys);
    setTimeout(() => {
      this.PlayVoiceOver(VoiceOverProxy.GetVoiceOver(keys[0]));
    }, delay ?? 0)
  }

  public static StopVoiceOver() {
    if (this._PlayingVoiceOver) {
      const sound = CommonAssetsManager.GetSound(this._PlayingVoiceOver.key) as Sound;
      if (sound) {
        sound.fadeOut(500);
      }
      this._PlayingVoiceOver = null;
    }
  }

  public static ClearVoiceOvers() {
    VoiceOverProxy.AllVoiceOvers.forEach(voiceOver => {
      const sound = CommonAssetsManager.GetSound(voiceOver.key) as Sound;
      if (!sound) {
        return;
      }
      sound.howl.unload();
    });

    VoiceOverProxy.ClearVoiceOvers();
  }

  private static _UpdateVoiceOver(keys: string[]) {
    keys.forEach((key, index) => {
      const speech = VoiceOverProxy.GetVoiceOver(key);

      if (!speech) {
        console.warn(`missing translation speech for key: ${key}`);
        return;
      }

      VoiceOverProxy.Update({
        ...speech,
        nextKey: keys[index + 1]
      });
    });
  }

  private static PlayVoiceOver(speech: IVoiceOver) {
    if (!speech) {
      return;
    }
    const sound = CommonAssetsManager.GetSound(speech.key) as Sound;
    if (!sound) {
      return;
    }
    sound.play(undefined);
    this._PlayingVoiceOver = speech;
    if (speech.nextKey) {
      sound.howl.on('end', () => {
        this._PlayingVoiceOver = null;
        // the sound can be stopped while playing, the speech object next key is removed then
        // if when the sound is completed and its nextKey still remains then play the next sound
        if (VoiceOverProxy.GetVoiceOver(speech.key).nextKey) {
          this.PlayVoiceOver(VoiceOverProxy.GetVoiceOver(speech.nextKey));
        }
      });
    }
  }

  public static get IsMute(): boolean { return this._IsMute; }
}
