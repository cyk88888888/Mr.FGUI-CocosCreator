import { _decorator, Component, Node } from 'cc';
import { UIComp } from './UIComp';
import { SceneMgr } from '../mgr/SceneMgr';
const { ccclass, property } = _decorator;

@ccclass('UILayer')
export class UILayer extends UIComp {
    /**
    * 显示界面
    * @param data 
    * @returns 
    */
    protected show(data?: any): UILayer {
        let self = this;
        self.createView();
        self.setData(data);
        self.addToLayer();
        self.onEnter_b();
        self['onEnter']();
        self.onEnter_a();
        return self;
    }

    public static show(data?: any) {
        // (new this).show();
        let script = this.addScript();
        script.show(data);
    }

    /**
     * 添加脚本
     * @returns
     */
    protected static addScript() {
        return SceneMgr.inst.layer.node.addComponent(this.name) as UILayer;
    }
    /**
     * 将view添加到layer层级容器
     */
    protected addToLayer() {
        SceneMgr.inst.layer.addChild(this.view);
    }
}

