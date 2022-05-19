import { _decorator, Component, Node } from 'cc';
import { UIComp } from './UIComp';
import * as fgui from "fairygui-cc";
import { SceneMgr } from '../mgr/SceneMgr';
import { scaleMode } from '../base/ScaleMode';
import { BaseUT } from '../base/BaseUtil';
import { ModuleMgr } from '../mgr/ModuleMgr';
import { GComponent } from 'fairygui-cc/GComponent';
const { ccclass, property } = _decorator;

@ccclass('UILayer')
export class UILayer extends UIComp {

    protected show(view: GComponent, data?: any): UILayer {
        let self = this;
        self.initView(view);
        BaseUT.setFitSize(self.view);
        self.setData(data);
        self.addToLayer();
        self.onEnter_b();
        if (self['onEnter']) self['onEnter']();
        self.onEnter_a();
        return self;
    }
    /**
    * 显示界面
    * @param data 
    * @returns 
   */
    public static show(data?: any) {
        let view = ModuleMgr.inst.getGComp(this);
        let script = view.node.getComponent(this);
        script.show(view, data);
    }

    /**
     * 将view添加到layer层级容器
     */
    protected addToLayer() {
        SceneMgr.inst.layer.addChild(this.view);
    }
}

