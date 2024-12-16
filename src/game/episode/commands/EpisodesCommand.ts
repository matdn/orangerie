import { GameId } from '../../constants/games/GameId.ts';
import { EpisodeManager } from '../managers/EpisodeManager.ts';
import { EpisodesProxy } from '../proxies/EpisodesProxy.ts';

export class EpisodesCommand {

  // public static Debug = false;
  public static Debug = true;
  /**
   * Episodes must be init right after User is Init or SignUp.
   */
  public static InitEpisodes(): void {
    if (this.Debug) console.log('EpisodesCommand.InitEpisodes');
    EpisodeManager.Init();
  }

  /**
   * User open an episode, create a room
   * @param episodeId
   */
  public static async Open(episodeId: string): Promise<void> {
    if (this.Debug) console.log('EpisodesCommand.Open', episodeId);
    const episode = EpisodesProxy.GetEpisode(episodeId);
    if (!episode) {
      console.warn(`Episode with id ${episodeId} does not exist!`);
      return;
    }

    await EpisodeManager.OpenEpisode(episode);
  }

  /**
   * User finish the episode, current room is completed.
   * When a user finish an episode, he will no longer be able to contribute the score to the current room anymore
   * If user wants to play again, he has to reopen the episode, start a new room
   */
  public static async FinishEpisode(): Promise<void> {
    if (this.Debug) console.log('EpisodesCommand.FinishEpisode');
    await EpisodeManager.FinishEpisode();
  }

  /**
   * User leaves the episode, no longer contributes to the current room progress anymore
   * he will lose the progress and score he made in current room
   * If user wants to play again, he has to create/join a new room
   */
  public static async LeaveEpisode(): Promise<void> {
    if (this.Debug) console.log('EpisodesCommand.LeaveEpisode');
    await EpisodeManager.LeaveEpisode();
  }


  public static async SendScore(gameId: GameId | string, elementId: GameId | string, score?: number, answers?: number[]): Promise<void> {
    if(this.Debug)console.log('EpisodesCommand.SendScore', gameId, elementId, score, answers);
    await EpisodeManager.SendScore(gameId, elementId, score, answers);
  }

  public static async FinishGame(): Promise<void> {
    await EpisodeManager.FinishEpisode(true);
  }
}
