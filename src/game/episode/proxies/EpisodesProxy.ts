import { Episode } from "../models/Episode";
import { ProgressionProxy } from './ProgressionProxy';

export class EpisodesProxy {

    private static _EpisodeMap = new Map<string, Episode>();

    public static Init(data: any[]): void {
        for (const ep of data) {
            const episode = new Episode(ep);
            this._EpisodeMap.set(episode.name, episode);
        }
    }

    public static ClearEpisodes() {
        this._EpisodeMap.clear();
    }

    public static SetEpisodeProgress() {
        this._EpisodeMap.forEach(episode => {
            episode.scenes.forEach(scene => {
                scene.elements.forEach(element => {
                    const elementProgress = ProgressionProxy.FindProgression(scene.name, element.name)
                    element.setISCollected(!!elementProgress);
                    element.setScore(elementProgress?.points || 0)
                })
            })
        })
    }

    public static GetEpisode(id: string): Episode {
        return this._EpisodeMap.get(id);
    }

    //#region Getters
    public static get EpisodeMap(): ReadonlyMap<string, Episode> { return this._EpisodeMap; }
    public static get AllEpisodes(): ReadonlyArray<Episode> { return Array.from(this._EpisodeMap.values()); }
    public static get FirstEpisode(): Episode { return this.AllEpisodes[0]; }
    //#endregion

}
