import { updateUserProgress } from '../../../utils/user.api';
import { EpisodeConfig } from '../config/EpisodeConfig';
import { Progression } from '../models/Progression.ts';
import { EpisodesProxy } from '../proxies/EpisodesProxy.ts';

export class EpisodeService {
    // private static _Debug: boolean = true;
    private static _Debug: boolean = false;

    public static InitEpisodes(): Promise<void> {
        if (EpisodesProxy.AllEpisodes.length) {
            return; // episodes should be loaded once
        }

        const episodes = structuredClone(EpisodeConfig);

        EpisodesProxy.Init(episodes);
        if (this._Debug) console.log('EpisodeServices.InitEpisodes: ', EpisodesProxy.AllEpisodes);
    }

    public static async SendScore(progression: Progression): Promise<void> {
        if (this._Debug) console.log('EpisodeServices.SendScore', progression);
        await updateUserProgress(progression.getProgressionPayload());
    }
}
