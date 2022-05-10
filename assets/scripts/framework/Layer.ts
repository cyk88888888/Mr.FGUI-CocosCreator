import { _decorator, Component, Node } from 'cc';
import { Comp } from './base/Comp';
import { LayerMgr } from './base/LayerMgr';
const { ccclass, property } = _decorator;

@ccclass('Layer')
export class Layer extends Comp {
    /**
     * 添加脚本
     * @returns
     */
    protected static addScript() {
        return LayerMgr.inst.layer.node.addComponent(this.name) as Comp;
    }
    /**
     * 将view添加到layer层级容器
     */
    protected addToLayer() {
        LayerMgr.inst.layer.addChild(this.view);
    }
}

