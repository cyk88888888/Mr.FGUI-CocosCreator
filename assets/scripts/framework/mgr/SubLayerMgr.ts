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
    public curLayer: UILayer;
    private _popArr: UILayer[];
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
        let script: any = typeof LayerNameOrClass === 'string' ? js.getClassByName(LayerNameOrClass) : LayerNameOrClass;
        let layerName = script.name;
        let registerLayer = this._classMap[layerName];
        let needDestory = !registerLayer && !toPush;//未注册  && 非入栈模式

        this.checkDestoryLastLayer(needDestory);

        if (this.curLayer) {
            if (toPush) this._popArr.push(this.curLayer);
            if (toPush || !needDestory) {
                this.exitOnPush();
                this.curLayer.removeView();
            }
        }

        if (registerLayer && registerLayer.node) {
            this.curLayer = registerLayer;
            this.enterOnPop();
            this.curLayer.addView();
            return;
        }

        this.curLayer = script.show();
        if (this._classMap[layerName]) {
            this._classMap[layerName] = this.curLayer;
        }
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
        self.enterOnPop();
        SceneMgr.inst.curScene.layer.addChild(self.curLayer);
    }

    private exitOnPush() {
        let self = this;
        let script = this.curLayer;
        script.exitOnPush();
    }

    private enterOnPop() {
        let self = this;
        let script = this.curLayer;
        script.enterOnPop();
    }

    /**清除所有layer */
    public releaseAllLayer() {
        let self = this;
        this.checkDestoryLastLayer(true);
        for (let i = 0; i < self._popArr.length; i++) {
            self._popArr[i].destory();
        }
        self._popArr = [];
    }

    public dispose() {
        this.releaseAllLayer();
    }
}
