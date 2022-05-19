import { AssetManager } from "cc";
import * as fgui from "fairygui-cc";
import { BaseUT } from "../base/BaseUtil";
import { scaleMode } from "../base/ScaleMode";
import { UIScene } from "../ui/UIScene";
import { moduleInfoMap } from "./ModuleMgr";
import { ResMgr } from "./ResMgr";

export class SceneMgr {
    private static _inst: SceneMgr;
    public layer: fgui.GComponent;
    public dlg: fgui.GComponent;
    public msg: fgui.GComponent;
    public curScene: fgui.GComponent;
    private _popArr: string[];
    public static get inst() {
        if (!this._inst) {
            this._inst = new SceneMgr();
        }
        return this._inst;
    }

    public push(sceneName: string, data?: any) {
        let sceneInfo = moduleInfoMap[sceneName];
        if (!sceneInfo) {
            console.error('未注册模块：' + sceneName)
            return;
        }
        if (!this._popArr) {
            this._popArr = [];
        }
        ResMgr.inst.loadWithItor(sceneInfo.resList, this.onProgress, () => {
            this.onUILoaded(sceneName, data);
        });
    }

    private onProgress(resName: string, hasLoadResCount: number) {
        console.log('resName: ' + resName);
        console.log('hasLoadResCount: ' + hasLoadResCount);
    }

    private onUILoaded(sceneName: string, data: any) {
        if (this.curScene) {//销毁上个场景
            this.curScene.node.destroyAllChildren();
            this.curScene.node.destroy();
        }
        this.curScene = this.addGCom2GRoot(sceneName, true);
        this.initLayer();
        let newScene = this.curScene.node.addComponent(sceneName) as UIScene;//添加场景脚本
        newScene.setData(data);
    }

    initLayer() {
        let self = this;
        self.layer = self.addGCom2GRoot('UILayer');
        self.dlg = self.addGCom2GRoot('UIDlg');
        self.msg = self.addGCom2GRoot('UIMsg');
    }

    /**
    * 添加层级容器到GRoot
    * @param name 名称
    * @returns 
    */
    addGCom2GRoot(name: string, isScene?: boolean): fgui.GComponent {
        let newCom = new fgui.GComponent();
        newCom.node.name = name;
        let size = BaseUT.setFitSize(newCom);
        if(isScene){
            newCom.x = (fgui.GRoot.inst.width - size.width)/2;
            newCom.y = (fgui.GRoot.inst.height - size.height)/2;
        }
        let parent = isScene ? fgui.GRoot.inst : this.curScene;
        parent.addChild(newCom);
        return newCom;
    }



}
