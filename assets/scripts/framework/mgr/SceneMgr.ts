/*
 * @Description: 场景管理器
 * @Author: CYK
 * @Date: 2022-05-23 09:27:58
 */
import { js } from "cc";
import * as fgui from "fairygui-cc";
import { BaseUT } from "../base/BaseUtil";
import { ModuleCfgInfo } from "../base/ModuleCfgInfo";
import { UIComp } from "../ui/UIComp";
import { UIScene } from "../ui/UIScene";
import { moduleInfoMap } from "./ModuleMgr";
import { ResMgr } from "./ResMgr";

export class SceneMgr {
    private static _inst: SceneMgr;
    public curScene: UIScene;
    /** 主场景名称*/
    public mainScene: string;
    private _popArr: UIScene[];

    public static get inst() {
        if (!this._inst) {
            this._inst = new SceneMgr();
            this._inst._popArr = [];
        }
        return this._inst;
    }

    public run(scene: string | typeof UIScene, data?: any) {
        this.showScene(scene, data);
    }

    public push(scene: string | typeof UIScene, data?: any) {
        this.showScene(scene, data, true);
    }

    private showScene(scene: string | typeof UIScene, data?: any, toPush?: boolean) {
        let sceneName = typeof scene === 'string' ? scene : scene.name;
        if (this.curScene && this.curScene.className == sceneName) return;//相同场景
        let moduleInfo = moduleInfoMap[sceneName];
        if (!moduleInfo) {
            console.error('未注册模块：' + sceneName)
            return;
        }
        ResMgr.inst.load(moduleInfo.preResList, this.onUILoaded.bind(this, moduleInfo, data, toPush));
    }

    private onUILoaded(moduleInfo: ModuleCfgInfo, data: any, toPush: boolean) {
        this.checkDestoryLastScene(!toPush);
        if (toPush && this.curScene) {
            this._popArr.push(this.curScene);
            this.exitOnPush(this.curScene);
            this.curScene.removeFromParent();
        }

        let sceneName = moduleInfo.name;
        let scriptClass = js.getClassByName(sceneName);//是否有对应脚本类
        this.curScene = new scriptClass() as UIScene;
        this.curScene._init_(sceneName, data);
    }

    /**判断销毁上个场景并释放资源 */
    private checkDestoryLastScene(destory?: boolean) {
        if (this.curScene) {
            let lastModuleInfo = moduleInfoMap[this.curScene.node.name];
            if (destory && !lastModuleInfo.cacheEnabled) {//销毁上个场景
                ResMgr.inst.releaseRes(lastModuleInfo.preResList);
            }

            this.exitOnPush(this.curScene, destory);
            if (destory) {
                this.curScene.destory();
            }
        }
    }

    /** 返回到上个场景*/
    public pop() {
        let self = this;
        if (self._popArr.length <= 0) {
            console.error('已经pop到底了！！！！！！！');
            return;
        }
        self.checkDestoryLastScene(true);

        self.curScene = self._popArr.pop();
        self.enterOnPop(self.curScene);
        self.curScene.addToGRoot();
    }

    private exitOnPush(scene: UIScene, destory?: boolean) {
        let self = this;
        let script = scene;
        self.eachChildComp(script.layer, false, destory);
        self.eachChildComp(script.menuLayer, false, destory);
        self.eachChildComp(script.dlg, false, destory);
        self.eachChildComp(script.msg, false, destory);
        destory ? script.destory() : script.exitOnPush();
    }

    private enterOnPop(scene: UIScene) {
        let self = this;
        let script = scene;
        script.enterOnPop();
        self.eachChildComp(script.layer, true);
        self.eachChildComp(script.menuLayer, true);
        self.eachChildComp(script.dlg, true);
        self.eachChildComp(script.msg, true);
    }

    private eachChildComp(comp: fgui.GComponent, isEnter?: boolean, destory?: boolean) {
        let children = comp.node.children[0].children;
        for (let i = 0; i < children.length; i++) {
            let childNode = children[i];
            let script = this.curScene.chilidCompClassMap[childNode.name] as UIComp;
            isEnter ? script.enterOnPop() : destory ? script.destory() : script.exitOnPush();
        }
    }

    /**获取当前场景的脚本 */
    public get curSceneScript(): UIScene {
        let self = this;
        if (self.curScene) {
            return self.curScene;
        }
        return null;
    }
}
