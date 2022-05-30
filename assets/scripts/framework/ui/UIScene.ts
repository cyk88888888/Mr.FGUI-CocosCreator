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
            self.mainClassLayer.show({ str: '我叫' + self.mainClassLayer.name });
        }
    }

    onLoad() {
        let self = this;
        self.onEnter_b();
        if (self['onEnter']) self['onEnter']();
        self.onEnter_a();
    }

    /**
     * 将view添加到layer层级容器
     */
    protected addToLayer() {
        fgui.GRoot.inst.addChild(this.view);
    }

    /**重置到主界面（会清掉当前堆栈中的所有界面） */
    public resetToMain() {

    }

    /**显示指定界面（替换模式） */
    public run(LayerNameOrClass: string | typeof UILayer, data?: any) {
        let script: any = typeof LayerNameOrClass === 'string' ? js.getClassByName(LayerNameOrClass) : LayerNameOrClass;
        script.show();
    }

    /**显示指定界面（入栈模式） */
    public push(LayerNameOrClass: string | typeof UILayer, data?: any) {

    }

    /**layer出栈 */
    public pop() {

    }
}

