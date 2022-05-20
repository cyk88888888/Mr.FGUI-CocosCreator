import { _decorator, Component, Node } from 'cc';
import { UIComp } from './UIComp';
import * as fgui from "fairygui-cc";
import { SceneMgr } from '../mgr/SceneMgr';
import { BaseUT } from '../base/BaseUtil';
import { ModuleMgr } from '../mgr/ModuleMgr';
import { GComponent } from 'fairygui-cc/GComponent';
const { ccclass, property } = _decorator;

@ccclass('UILayer')
export class UILayer extends UIComp {

    protected show(view: GComponent, data?: any): UILayer {
        let self = this;
        self.setData(data);
        self.initView(view);
        BaseUT.setFitSize(self.view);
        self.addToLayer();
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
        return script;
    }

    /**
     * 将view添加到layer层级容器
     */
    protected addToLayer() {
        SceneMgr.inst.layer.addChild(this.view);
    }
}

