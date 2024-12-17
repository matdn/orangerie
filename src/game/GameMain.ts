//#region InitCore
import './commands/inits/initCore';
//#endregion

import { Action, CustomStats } from "cookware";
import { ViewsManager } from "pancake";
import { CommonProjectInitCommand } from "./commands/inits/project/CommonProjectInitCommand";
import { TheaterId } from './constants/theaters/TheaterId.ts';
import { QuickLinksReactViewId, QuickLinksReactViewOptions } from "./core/_engine/reacts/views/QuickLinksReactView";
import InitCommand from './core/commands/inits/InitCommand.ts';
import { TheaterTransitionCommand } from './core/commands/TheaterTransitionCommand.ts';
import { DebugManager } from "./core/debugs/DebugManager";
import { ScormService } from './episode/services/ScormService.ts';
import { VoiceOverInitCommand } from './voice-over/VoiceOverInitCommand';
import { VoiceOverService } from './voice-over/VoiceOverService';

export default class GameMain {
    private static _Initiated = false;
    private static _IsInit = false;
    public static readonly OnInitFinish = new Action();

    public static async Init(): Promise<void> {
        if (GameMain._Initiated) return;

        GameMain._Initiated = true;
        // await TranslationKeyManager.Init();

        await VoiceOverService.Init();

        InitCommand.Execute([
            new VoiceOverInitCommand(),
            new CommonProjectInitCommand(),

        ]).then(() => {
            GameMain._IsInit = true;
            GameMain.OnInitFinish.execute();
            // GameMain._Start();


        });

    }

    public static Start(): void {
        ScormService.SetScormStatus('incomplete');
        ViewsManager.RemoveAll();
        if (DebugManager.IsDev) {
            // CustomStats.Init();
            QuickLinksReactViewOptions.className = "bottom left";
            // ViewsManager.ShowById(QuickLinksReactViewId);
        }

        console.log("Game Start");

        GameMain._ShowFirstTheater();
    }

    private static _ShowFirstTheater(): void {
        console.log("Show First Theater");
        const shortcut: string = new URLSearchParams(window.location.search).get('game');
        if (shortcut) {
            for (let id in TheaterId) {
                if (TheaterId[id].toLowerCase() === shortcut.toLowerCase()) {
                    TheaterTransitionCommand.Show(TheaterId[id]);
                    return;
                }
            }
        }
        TheaterTransitionCommand.Show(TheaterId.LOBBY);
    }

    public static get IsInit(): boolean { return GameMain._IsInit; }
}
