/*
 * @Description: 子界面管理器
 * @Author: CYK
 * @Date: 2022-05-19 15:25:36
 */
import { js } from "cc";
import * as fgui from "fairygui-cc";
import { BaseUT } from "../base/BaseUtil";
import { UIComp } from "../ui/UIComp";
import { UILayer } from "../ui/UILayer";
import { SceneMgr } from "./SceneMgr";
export class SubLayerMgr {
    private _classMap: any;
    public curLayer: fgui.GComponent;
    private _popArr: fgui.GComponent[];
    constructor() {
        this._classMap = {};
        this._popArr = [];
    }

    /**
     * 注册子页面
     * @param layerClass 
     */
    public register(layerClass: any, opt?: any) {
        let className = layerClass.__className;
        this._classMap[className] = layerClass;
    }

    /**显示指定界面（替换模式） */
    public run(LayerNameOrClass: string | typeof UILayer, data?: any) {
        this._show(LayerNameOrClass, data);
    }

    /**显示指定界面（入栈模式） */
    public push(LayerNameOrClass: string | typeof UILayer, data?: any) {
        this._show(LayerNameOrClass, data, true);
    }

    private _show(LayerNameOrClass: string | typeof UILayer, data?: any, toPush?: boolean) {
        this.checkDestoryLastLayer(!toPush);
        if (toPush && this.curLayer) {
            this._popArr.push(this.curLayer);
            this.exitOnPush(this.curLayer);
            this.curLayer.removeFromParent();
        }

        let script: any = typeof LayerNameOrClass === 'string' ? js.getClassByName(LayerNameOrClass) : LayerNameOrClass;
        this.curLayer = script.show().view;
    }

    /**判断销毁上个界面并释放资源 */
    private checkDestoryLastLayer(destory?: boolean) {
        if (this.curLayer && destory) {
            BaseUT.destoryGComp(this.curLayer);
        }
    }

    /** layer出栈*/
    public pop() {
        let self = this;
        if (self._popArr.length <= 0) {
            console.error('已经pop到底了！！！！！！！');
            return;
        }
        self.checkDestoryLastLayer(true);

        self.curLayer = self._popArr.pop();
        self.enterOnPop(self.curLayer);
        SceneMgr.inst.curSceneScript?.layer.addChild(self.curLayer);
    }

    private exitOnPush(layer: fgui.GComponent) {
        let self = this;
        let script = layer.node.getComponent(layer.node.name) as UILayer;
        script.exitOnPush();
        self.eachChildComp(layer);
    }

    private enterOnPop(layer: fgui.GComponent) {
        let self = this;
        let script = layer.node.getComponent(layer.node.name) as UILayer;
        script.enterOnPop();
        self.eachChildComp(layer, true);
    }

    private eachChildComp(comp: fgui.GComponent, isEnter?: boolean) {
        let children = comp.node.children[0].children;
        for (let i = 0; i < children.length; i++) {
            let childNode = children[i];
            let scriptNode = childNode.getComponent(childNode.name) as UIComp;
            isEnter ? scriptNode.enterOnPop() : scriptNode.exitOnPush();
        }
    }

    /**清除所有layer */
    public releaseAllLayer() {
        let self = this;
        this.checkDestoryLastLayer(true);
        for (let i = 0; i < self._popArr.length; i++) {
            BaseUT.destoryGComp(self._popArr[i]);
        }
        self._popArr = [];
    }

    public dispose(){
        this.releaseAllLayer();
    }
}
