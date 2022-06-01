/*
 * @Description: 
 * @Author: CYK
 * @Date: 2022-05-20 09:53:17
 */
import { _decorator, Component, Node, js } from 'cc';
import { UIComp } from './UIComp';
import { SceneMgr } from '../mgr/SceneMgr';
import * as fgui from "fairygui-cc";
import { SubLayerMgr } from '../mgr/SubLayerMgr';
import { UILayer } from './UILayer';
const { ccclass, property } = _decorator;

@ccclass('UIScene')
export class UIScene extends UIComp {
    protected mainClassLayer: typeof UILayer;
    protected subLayerMgr: SubLayerMgr;
    public layer: fgui.GComponent;
    public dlg: fgui.GComponent;
    public msg: fgui.GComponent;
    public menuLayer: fgui.GComponent;
    protected init() {
        this.subLayerMgr = new SubLayerMgr();
    }

    protected init_a() {
        let self = this;
        if (self.mainClassLayer) {
            self.subLayerMgr.register(self.mainClassLayer);
            self.push(self.mainClassLayer, { str: '我叫' + self.mainClassLayer.name });
        }
    }

    onLoad() {
        let self = this;
        self.onEnter_b();
        if (self['onEnter']) self['onEnter']();
        self.onEnter_a();
    }


    /**重置到主界面（会清掉当前堆栈中的所有界面） */
    public resetToMain() {
        let self = this;
        self.releaseAllLayer();
        self.push(self.mainClassLayer, {});
    }

    /**显示指定界面（替换模式） */
    public run(LayerNameOrClass: string | typeof UILayer, data?: any) {
        this.subLayerMgr.run(LayerNameOrClass, data);
    }

    /**显示指定界面（入栈模式） */
    public push(LayerNameOrClass: string | typeof UILayer, data?: any) {
        this.subLayerMgr.push(LayerNameOrClass, data);
    }

    /**layer出栈 */
    public pop() {
        this.subLayerMgr.pop();
    }

    /**清除所有layer */
    public releaseAllLayer() {
        this.subLayerMgr.releaseAllLayer();
    }

    public disposeSubLayerMgr(){
        this.subLayerMgr.dispose();
        this.subLayerMgr = null;
    }
}

