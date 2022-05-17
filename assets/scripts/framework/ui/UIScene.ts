import { _decorator, Component, Node } from 'cc';
import { UIComp } from './UIComp';
import { SceneMgr } from '../mgr/SceneMgr';
import * as fgui from "fairygui-cc";
const { ccclass, property } = _decorator;

@ccclass('UIScene')
export class UIScene extends UIComp {
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
        fgui.GRoot.inst.addChild(this.view);
    }
}

