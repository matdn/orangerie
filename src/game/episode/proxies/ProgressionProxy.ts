import { Progression } from '../models/Progression';

export class ProgressionProxy {

  private static _Progressions: Array<Progression> = new Array<Progression>();

  public static AddProgression(progression: Progression) {
    this._Progressions.push(progression);
  }

  public static ClearProgressions() {
    this._Progressions = [];
  }

  public static FindProgression(scene: string, element: string): Progression {
    return this._Progressions.find(progression => progression.isThisProgression(scene, element))
  }

  public static get Progressions() { return this._Progressions }
}
