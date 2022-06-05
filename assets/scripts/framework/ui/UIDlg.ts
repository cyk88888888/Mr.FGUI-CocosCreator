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
    bg.node.name = bg.name = this.view.node.name + '_dlgMask: GGraph';
    bg.drawRect(1, math.Color.BLACK, math.Color.BLACK);
    bg.alpha = 0.6;
    bg.setSize(Math.ceil(fgui.GRoot.inst.width), Math.ceil(fgui.GRoot.inst.height));
    bg.setPosition((this.view.width - bg.width) / 2, (this.view.height - bg.height) / 2);
    this.view.addChildAt(bg, 0);
    bg.onClick(this.close, this);

    SceneMgr.inst.dlg.addChild(this.view);
  }

  protected onOpenAnimation() {
    let self = this;
    let tween = self.getTween(this);
    tween;
  }
}


