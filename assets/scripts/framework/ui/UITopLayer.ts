import { _decorator, Component, Node } from 'cc';
import { SceneMgr } from '../mgr/SceneMgr';
import { UILayer } from './UILayer';
const { ccclass, property } = _decorator;

@ccclass('UITopLayer')
export class UITopLayer extends UILayer {

    /**
     * 将view添加到layer层级容器
     */
    protected addToLayer() {
        SceneMgr.inst.topLayer.addChild(this.view);
    }
}

