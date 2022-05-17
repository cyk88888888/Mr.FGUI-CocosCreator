import { _decorator, Component, Node } from 'cc';
import { SceneMgr } from '../mgr/SceneMgr';
import { UIComp } from './UIComp';
const { ccclass, property } = _decorator;

@ccclass('UIDlg')
export class UIDlg extends UIComp {
    /**
  * 将view添加到layer层级容器
  */
    protected addToLayer() {
        SceneMgr.inst.dlg.addChild(this.view);
    }
}


