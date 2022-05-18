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
/**
 * 注册场景模块
 * @param sceneName 场景名称
 * @param resList 预加载资源列表
 * @param cacheEnabled 是否开启缓存模式
 */
export function registerModule(sceneName: string, resList: string[], cacheEnabled?: boolean) {
    let obj = { sceneName: sceneName, cacheEnabled: cacheEnabled, resList: resList };
    moduleInfoMap[sceneName] = obj;
}
