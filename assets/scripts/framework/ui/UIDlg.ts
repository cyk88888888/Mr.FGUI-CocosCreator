import { _decorator, Component, Node } from 'cc';
import { SceneMgr } from '../mgr/SceneMgr';
import { UIComp } from './UIComp';
import { UILayer } from './UILayer';
const { ccclass, property } = _decorator;

@ccclass('UIDlg')
export class UIDlg extends UILayer {
  /**
  * 将view添加到layer层级容器
  */
  protected addToLayer() {
    SceneMgr.inst.dlg.addChild(this.view);
  }
}


