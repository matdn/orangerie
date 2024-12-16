import { Action } from 'cookware';

export class AppLoadingManager {
  private static _IsLoading: boolean = true;

  public static OnLoadingUpdated = new Action();

  public static FinishLoading() {
    if (!this._IsLoading) {
      return;
    }

    this._IsLoading = false;
    this.OnLoadingUpdated.execute();
  }

  public static get IsLoading() {
    return this._IsLoading;
  }
}
