/*
 * @Description: 场景管理器
 * @Author: CYK
 * @Date: 2022-05-23 09:27:58
 */
import { AssetManager, Node } from "cc";
import * as fgui from "fairygui-cc";
import { BaseUT } from "../base/BaseUtil";
import { ModuleCfgInfo } from "../base/ModuleCfgInfo";
import { UIScene } from "../ui/UIScene";
import { moduleInfoMap } from "./ModuleMgr";
import { ResMgr } from "./ResMgr";

export class SceneMgr {
    private static _inst: SceneMgr;
    public layer: fgui.GComponent;
    public dlg: fgui.GComponent;
    public msg: fgui.GComponent;
    public menuLayer: fgui.GComponent;
    public curScene: fgui.GComponent;
    /** 主场景名称*/
    public mainScene: string;
    private _popArr: fgui.GComponent[];
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
        let moduleInfo = moduleInfoMap[sceneName];
        if (!moduleInfo) {
            console.error('未注册模块：' + sceneName)
            return;
        }
        ResMgr.inst.load(moduleInfo.preResList, () => {
            this.onUILoaded(moduleInfo, data, toPush);
        });
    }

    private onUILoaded(moduleInfo: ModuleCfgInfo, data: any, toPush: boolean) {
        this.checkDestoryLastScene(!toPush);
        if (toPush && this.curScene) {
            this._popArr.push(this.curScene);
            this.exitOnPush(this.curScene);
            this.curScene.removeFromParent();
        }

        let sceneName = moduleInfo.name;
        this.curScene = this.addGCom2GRoot(sceneName, true);
        this.initLayer();
        let newScene = this.curScene.node.addComponent(sceneName) as UIScene;//添加场景脚本
        newScene.layer = this.layer;
        newScene.dlg = this.dlg;
        newScene.msg = this.msg;
        newScene.menuLayer = this.menuLayer;
        newScene.setData(data);

    }

    private initLayer() {
        let self = this;
        self.layer = self.addGCom2GRoot('UILayer');
        self.menuLayer = self.addGCom2GRoot('UIMenuLayer');
        self.dlg = self.addGCom2GRoot('UIDlg');
        self.msg = self.addGCom2GRoot('UIMsg');
    }

    /**
    * 添加层级容器到GRoot
    * @param name 名称
    * @returns 
    */
    private addGCom2GRoot(name: string, isScene?: boolean): fgui.GComponent {
        let newCom = new fgui.GComponent();
        newCom.node.name = name;
        let size = BaseUT.setFitSize(newCom);
        if (isScene) {
            newCom.x = (fgui.GRoot.inst.width - size.width) / 2;
            newCom.y = (fgui.GRoot.inst.height - size.height) / 2;
        }
        let parent = isScene ? fgui.GRoot.inst : this.curScene;
        parent.addChild(newCom);
        return newCom;
    }

    /**判断销毁上个场景并释放资源 */
    private checkDestoryLastScene(destory?: boolean) {
        if (this.curScene) {
            let lastModuleInfo = moduleInfoMap[this.curScene.node.name];
            if (destory && !lastModuleInfo.cacheEnabled) {//销毁上个场景
                ResMgr.inst.releaseRes(lastModuleInfo.preResList);
            }
            if (destory) {
                this.curScene.node.destroyAllChildren();
                this.curScene.node.destroy();
            }
        }
    }

    /** 返回到上个场景*/
    public pop() {
        let self = this;
        if (self._popArr.length <= 1) {
            console.error('已经pop到底了！！！！！！！');
            return;
        }
        self.checkDestoryLastScene(true);

        let lastScene = self.curScene = self._popArr.pop();
        self.enterOnPop(lastScene);
        fgui.GRoot.inst.addChild(lastScene);
    }

    private exitOnPush(scene: fgui.GComponent) {
        let self = this;
        let script = scene.node.getComponent(scene.node.name) as UIScene;
        script.exitOnPush();
    }

    private enterOnPop(scene: fgui.GComponent) {
        let self = this;
        let script = scene.node.getComponent(scene.node.name) as UIScene;
        script.enterOnPop();
        self.layer = script.layer;
        self.menuLayer = script.menuLayer;
        self.dlg = script.dlg;
        self.msg = script.msg;
    }

}
