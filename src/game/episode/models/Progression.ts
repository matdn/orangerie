export class Progression {
  private _scene: string;
  private _element: string;
  private _points: number;
  private _answers: number[];

  constructor(data?: any) {
    if (data) this.initFromJSON(data);
  }

  public getProgressionPayload() {
    return {
      scene: this._scene,
      element: this._element,
      points: this._points,
      answer: this._answers.map(answer => `${answer}`),
    };
  }

  public isThisProgression(scene: string, element: string): boolean {
    return scene === this._scene && element === this._element;
  }

  private initFromJSON(data: any): void {
    this._scene = data.scene;
    this._element = data.element;
    this._points = data.score || (data.points || 0);
    this._answers = data.answers || [];
  }

  public get points() { return this._points }
}
