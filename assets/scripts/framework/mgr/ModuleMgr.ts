/*
 * @Description: 页面模块管理器
 * @Author: CYK
 * @Date: 2022-05-23 09:27:58
 */
import * as fgui from "fairygui-cc";
import { ModuleCfgInfo } from "../base/ModuleCfgInfo";
import { UIComp } from "../ui/UIComp";
import { UIScene } from "../ui/UIScene";

export class ModuleMgr {
    private static _inst: ModuleMgr;
    public static get inst() {
        if (!this._inst) {
            this._inst = new ModuleMgr();
        }
        return this._inst;
    }

    /**
     * 获取对应类的显示view
     * @param IClass 
     * @returns 
     */
    public getGComp(IClass: typeof UIComp) {
        let className = IClass.name;
        let view = fgui.UIPackage.createObject(IClass.pkgName, className).asCom;
        view.node.name = className;
        view.node.addComponent(className);
        return view;
    }


}
export let moduleInfoMap: { [sceneName: string]: ModuleCfgInfo } = {};
/**
 * 注册场景模块
 * @param sceneName 场景名称
 * @param resList 预加载资源列表
 * @param cacheEnabled 是否开启缓存模式
 */
export function registerModule(targetClass: typeof UIScene, preResList: string[], cacheEnabled?: boolean) {
    let moduleCfgInfo = new ModuleCfgInfo();
    moduleCfgInfo.targetClass = targetClass;
    moduleCfgInfo.name = targetClass.name;
    moduleCfgInfo.cacheEnabled = cacheEnabled;
    moduleCfgInfo.preResList = preResList;
    moduleInfoMap[targetClass.name] = moduleCfgInfo;
}
