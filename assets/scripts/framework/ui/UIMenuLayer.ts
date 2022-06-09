/*
 * @Description: 
 * @Author: CYK
 * @Date: 2022-05-20 14:26:21
 */
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
        let parent = SceneMgr.inst.curScene.menuLayer;
        this.curParent = parent;
        parent.addChild(this);
    }
}

