import * as fgui from "fairygui-cc";
import { UIComp } from "../ui/UIComp";

export class ModuleMgr {
    private static _inst: ModuleMgr;
    public static get inst() {
        if (!this._inst) {
            this._inst = new ModuleMgr();
        }
        return this._inst;
    }

    public getGComp(IClass: typeof UIComp) {
        let className = IClass.name;
        let view = fgui.UIPackage.createObject(IClass.pkgName, className).asCom;
        view.node.name = className;
        view.node.addComponent(className);
        return view;
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
