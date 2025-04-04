interface ICallback {
    callback: (dt: number) => void,
    priority: number,
}

export class Ticker {

    private static _IsRunning: boolean;
    private static _IntarvalId: ReturnType<typeof setInterval>;
    private static _CurrentTime: number = 0;
    private static _ElapsedTime: number = 0;
    private static _StartTime: number = 0;
    private static _Callbacks = new Array<ICallback>();
    // private static _minTimeBetweenFrame: number = 1000 / 100;
    private static _minTimeBetweenFrame: number = 0;

    public static Start(time: number = -1) {
        this.Stop();
        this._IsRunning = true;
        Ticker._CurrentTime = Date.now();
        this._StartTime = Date.now();
        clearInterval(this._IntarvalId);
        if (time < 0) {
            Ticker._RenderRaf();
        } else {
            this._IntarvalId = setInterval(this._RenderInterval, time);
        }
    }

    public static Stop() {
        this._IsRunning = false;
        clearInterval(this._IntarvalId);
    }


    public static Add(callback: (dt: number) => void, priority: number = 0) {
        for (const icallback of Ticker._Callbacks) {
            if (icallback.callback === callback) return;
        }
        Ticker._Callbacks.push({ callback: callback, priority: priority });
        Ticker._Callbacks.sort(Ticker._SortCallbacks);
    }

    public static Remove(callback: (dt: number) => void) {
        for (let i = 0; i < Ticker._Callbacks.length; i++) {
            if (Ticker._Callbacks[i].callback === callback) {
                Ticker._Callbacks.splice(i, 1);
                return;
            }
        }
    }

    private static _SortCallbacks(a: ICallback, b: ICallback): number {
        if (a.priority > b.priority) return -1;
        if (a.priority < b.priority) return 1;
        return 0;
    }

    public static SetFPS(fps: number): void {
        this._minTimeBetweenFrame = 1000 / fps;
    }

    private static _RenderRaf = () => {
        this._Render();
        if (this._IsRunning) {
            requestAnimationFrame(Ticker._RenderRaf);
        }
    }

    private static _RenderInterval = () => {
        this._Render();
    }

    private static _Render() {
        const now = Date.now();
        const lastFrame = Ticker._CurrentTime;
        const dt = now - lastFrame;
        if (dt < this._minTimeBetweenFrame) {
            return;
        }
        this._ElapsedTime += dt;
        Ticker._CurrentTime = now;
        for (const icallback of Ticker._Callbacks) {
            icallback.callback(dt);
        }
    }

    /**
    * Timestamp in milliseconds at the start of the game
    */
    public static get StartTime() { return this._StartTime };

    /**
    * Current timestamp of the game in milliseconds (Date.now())
    */
    public static get CurrentTime() { return this._CurrentTime };

    /**
    * Time since the start of the game in milliseconds
    */
    public static get ElapsedTime() { return this._ElapsedTime };
}

// Save Test Ticker

// export class Ticker {
//     private static _IsRunning: boolean;
//     private static _IntarvalId: ReturnType<typeof setInterval>;
//     private static _CurrentTime: number = 0;
//     private static _ElapsedTime: number = 0;
//     private static _StartTime: number = 0;
//     private static _Callbacks: Set<(dt: number) => void> = new Set<(dt: number) => void>();
//     // private static _minTimeBetweenFrame: number = 1000 / 100;
//     private static _minTimeBetweenFrame: number = 0;
//     public static Start(time: number = -1) {
//         this.Stop();
//         this._IsRunning = true;
//         Ticker._CurrentTime = Date.now();
//         this._StartTime = Date.now();
//         clearInterval(this._IntarvalId);
//         if (time < 0) {
//             Ticker._RenderRaf();
//         } else {
//             this._IntarvalId = setInterval(this._RenderInterval, time);
//         }
//     }
//     public static Stop() {
//         this._IsRunning = false;
//         clearInterval(this._IntarvalId);
//     }
//     public static Add(callback: (dt: number) => void) {
//         Ticker._Callbacks.add(callback);
//     }
//     public static Remove(callback: (dt: number) => void) {
//         Ticker._Callbacks.delete(callback);
//     }
//     public static SetFPS(fps: number): void {
//         this._minTimeBetweenFrame = 1000 / fps;
//     }
//     private static _RenderRaf = () => {
//         this._Render();
//         if (this._IsRunning) {
//             requestAnimationFrame(Ticker._RenderRaf);
//         }
//     }
//     private static _RenderInterval = () => {
//         this._Render();
//     }
//     private static _Render() {
//         const now = Date.now();
//         const lastFrame = Ticker._CurrentTime;
//         const dt = now - lastFrame;
//         if (dt < this._minTimeBetweenFrame) {
//             return;
//         }
//         this._ElapsedTime += dt;
//         Ticker._CurrentTime = now;
//         let func: (dt: number) => void;
//         for (func of Ticker._Callbacks) {
//             func(dt);
//         }
//     }
//     /**
//     * Timestamp in milliseconds at the start of the game
//     */
//     public static get StartTime() { return this._StartTime };
//     /**
//     * Current timestamp of the game in milliseconds (Date.now())
//     */
//     public static get CurrentTime() { return this._CurrentTime };
//     /**
//     * Time since the start of the game in milliseconds
//     */
//     public static get ElapsedTime() { return this._ElapsedTime };
// }
