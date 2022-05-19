import { _decorator, Component, Node } from 'cc';
import { UIComp } from './UIComp';
import { SceneMgr } from '../mgr/SceneMgr';
import * as fgui from "fairygui-cc";
import { SubLayerMgr } from '../mgr/SubLayerMgr';
const { ccclass, property } = _decorator;

@ccclass('UIScene')
export class UIScene extends UIComp {
    protected mainClassLayer: any;
    protected subLayerMgr: SubLayerMgr;
    protected init() {
        this.subLayerMgr = new SubLayerMgr();
    }

    protected init_a() {
        let self = this;
        if (self.mainClassLayer) {
            self.subLayerMgr.register(self.mainClassLayer);
            self.mainClassLayer.show({ str: '我叫'+  self.mainClassLayer.name});
        }
    }

    onLoad() {
        let self = this;
    }

    /**
     * 将view添加到layer层级容器
     */
    protected addToLayer() {
        fgui.GRoot.inst.addChild(this.view);
    }
}

