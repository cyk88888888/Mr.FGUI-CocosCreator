import * as fgui from "fairygui-cc";

export class ModuleMgr {
    private static _inst: ModuleMgr;
    public static get inst() {
        if (!this._inst) {
            this._inst = new ModuleMgr();
        }
        return this._inst;
    }
}
export let moduleInfoMap = {};
export function registerModule(sceneName: string, cacheEnabled?: boolean, resList?: string[]) {
    let obj = { sceneName: sceneName, cacheEnabled: cacheEnabled, resList: resList };
    moduleInfoMap[sceneName] = obj;
}
