/*
 * @Description: 
 * @Author: CYK
 * @Date: 2022-05-09 09:43:11
 */
import { _decorator, Component, Node, math } from 'cc';
import * as fgui from "fairygui-cc";
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
    let bg = new fgui.GGraph();
    bg.drawRect(640, math.Color.BLACK, math.Color.BLACK);
    bg.width = fgui.GRoot.inst.width;
    bg.height = fgui.GRoot.inst.height;
    this.view.addChildAt(bg, 0);
    SceneMgr.inst.dlg.addChild(this.view);
  }

  protected onOpenAnimation() {
    let self = this;
    let tween = self.getTween(this);
    tween;
  }
}


