import { _decorator, Component, Node } from 'cc';
import { SceneMgr } from '../mgr/SceneMgr';
import { UILayer } from './UILayer';
const { ccclass, property } = _decorator;

@ccclass('UIMenuLayer')
export class UIMenuLayer extends UILayer {

    /**
     * 将view添加到layer层级容器
     */
    protected addToLayer() {
        SceneMgr.inst.menuLayer.addChild(this.view);
    }
}

