// Loaders
import { Spritesheet, Texture } from 'pixi.js';
import FontLoader from '../loaders/Pixi/FontLoader';
import SpriteSheetLoader from '../loaders/Pixi/SpriteSheetLoader';
import PixiTextureLoader from '../loaders/Pixi/TextureLoader';
import { LoaderBase } from '../loaders/bases/LoaderBase';

export default class PixiAssetsManager {
  private static _Loaders = new Map<string, LoaderBase>();

  private static _PixiTextures = new Map<string, Texture>();
  private static _PixiTextureLoaders = new Map<string, PixiTextureLoader>();
  private static _SpriteSheetLoaders = new Map<string, SpriteSheetLoader>();
  private static _FontsLoaders = new Map<string, FontLoader>();

  private static _LoadingQueue = Array<LoaderBase>();

  private static _CurrentLoadIndex: number = 0;
  private static _NumToLoad: number = 0;

  private static _IsLoading: boolean = false;


  public static Init() {
    this._Loaders.clear();
    this._PixiTextures.clear();
    this._PixiTextureLoaders.clear();
    this._SpriteSheetLoaders.clear();
    this._FontsLoaders.clear();
    this._LoadingQueue.length = 0;
    this._CurrentLoadIndex = 0;
  }

  //
  // ADD
  //

  public static AddTexture(textureId: string, texturePath: string): void {
    if (this._PixiTextureLoaders.has(textureId)) return
    const loader = new PixiTextureLoader(textureId, texturePath);
    this._PixiTextureLoaders.set(textureId, loader);

    this._AddLoader(loader);
  }

  public static AddSpriteSheet(spriteSheetId: string, spriteSheetDataPath: string): void {
    if (this._SpriteSheetLoaders.has(spriteSheetId)) return
    const loader = new SpriteSheetLoader(spriteSheetId, spriteSheetDataPath);
    this._SpriteSheetLoaders.set(spriteSheetId, loader);

    this._AddLoader(loader);
  }

  public static AddFont(fontId: string, fontPath: string): void {
    if (this._FontsLoaders.has(fontId)) return
    const loader = new FontLoader(fontId, fontPath);
    this._FontsLoaders.set(fontId, loader);

    this._AddLoader(loader);
  }

  private static _AddLoader(loader: LoaderBase): void {
    this._LoadingQueue.push(loader);
    this._NumToLoad = this._LoadingQueue.length;
  }

  //
  // Load
  //
  public static async Load() {
    if (this._IsLoading) {
      throw new Error('PixiAssetsManager is already loading');
    }
    this._IsLoading = true;
    this._CurrentLoadIndex = 0;
    this._NumToLoad = this._LoadingQueue.length;
    if (this._LoadingQueue.length > 0) {
      await Promise.all(
        this._LoadingQueue.map((queue) =>
          queue.load().then(() => {
            this._Loaders.set(queue.id, queue);
            this._CurrentLoadIndex++;
          }),
        ),
      );
    }
    this._CurrentLoadIndex = 0;
    this._LoadingQueue.length = 0;
    this._IsLoading = false;
  }

  //
  // GET
  //
  public static GetTexture(id: string): Texture | undefined {
    if (this._PixiTextures.has(id)) return this._PixiTextures.get(id);
    if (this._PixiTextureLoaders.has(id)) {
      const texture = this._PixiTextureLoaders.get(id)?.texture;
      this._PixiTextures.set(id, texture);
      return texture;
    }
    for (const spritesheet of this._SpriteSheetLoaders.values()) {
      if (spritesheet.spritesheet.textures[id]) {
        const texture = spritesheet.spritesheet.textures[id];
        this._PixiTextures.set(id, texture);
        return texture;
      }
    }
    throw new Error(`Texture with id: ${id} does not exist.`);
  }

  public static GetSpriteSheet(id: string): Spritesheet | undefined {
    if (this._SpriteSheetLoaders.has(id)) return this._SpriteSheetLoaders.get(id)?.spritesheet;
    else throw new Error(`SpriteSheet with id: ${id} does not exist.`);
  }

  public static GetFont(id: string): FontFace | undefined {
    if (this._FontsLoaders.has(id)) return this._FontsLoaders.get(id)?.fontFace;
    else throw new Error(`FontFace with id: ${id} does not exist.`);
  }

  //#region getter/setter
  public static get CurrentLoadIndex(): number {
    return this._CurrentLoadIndex;
  }
  public static get NumToLoad(): number {
    return this._NumToLoad;
  }
  //#endregion
}
