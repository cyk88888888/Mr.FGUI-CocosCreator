import { _decorator, Component, Node } from 'cc';
import { UIComp } from './UIComp';
import { SceneMgr } from '../mgr/SceneMgr';
const { ccclass, property } = _decorator;

@ccclass('UILayer')
export class UILayer extends UIComp {
    /**
     * 添加脚本
     * @returns
     */
    protected static addScript() {
        return SceneMgr.inst.layer.node.addComponent(this.name) as UIComp;
    }
    /**
     * 将view添加到layer层级容器
     */
    protected addToLayer() {
        SceneMgr.inst.layer.addChild(this.view);
    }
}

