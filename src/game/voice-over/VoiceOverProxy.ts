export interface IVoiceOver {
  id: string;
  key: string;
  urlOfFile: string;
  /**
   * only one key is activated at a time, if there are many speeches are requested,
   * nextKey will be defined to trigger the next sound when current sound is end
   */
  nextKey?: string;
}

export class VoiceOverProxy {
  private static _VoiceOverMap = new Map<string, IVoiceOver>();

  public static AddVoiceOver(voiceOver: IVoiceOver) {
    this._VoiceOverMap.set(voiceOver.key, voiceOver);
  }

  public static Update(voiceOver: IVoiceOver) {
    this._VoiceOverMap.set(voiceOver.key, voiceOver);
  }

  public static GetVoiceOver(key: string) {
    return this._VoiceOverMap.get(key);
  }

  public static ClearVoiceOvers() {
    this._VoiceOverMap.clear();
  }

  public static get AllVoiceOvers() {
    return Array.from(this._VoiceOverMap.values());
  }
}
