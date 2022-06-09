/*
 * @Description: 
 * @Author: CYK
 * @Date: 2022-05-09 09:43:11
 */
import { _decorator, Component, Node, math, Color } from 'cc';
import * as fgui from "fairygui-cc";
import { BaseUT } from '../base/BaseUtil';
import { SceneMgr } from '../mgr/SceneMgr';
import { UILayer } from './UILayer';
const { ccclass } = _decorator;

@ccclass('UIDlg')
export class UIDlg extends UILayer {
  private graph_bg: fgui.GGraph;
  /**
  * 将view添加到layer层级容器
  */
  protected addToLayer() {
    let bg = this.graph_bg = new fgui.GGraph();
    bg.node.name = bg.name = this.dlgMaskName;
    let modalLayerColor: Color = new Color(0x00, 0x00, 0x00, 255 * 0.4);
    bg.drawRect(1, modalLayerColor, modalLayerColor);
    bg.setSize(Math.ceil(fgui.GRoot.inst.width), Math.ceil(fgui.GRoot.inst.height));
    bg.setPosition((this.view.width - bg.width) / 2, (this.view.height - bg.height) / 2);
    bg.onClick(this.close, this);
    this.view.setPivot(0.5, 0.5);
    this.needAnimation ? SceneMgr.inst.curScene.dlg.addChild(bg) : this.view.addChildAt(this.graph_bg, 0);
    let parent = SceneMgr.inst.curScene.dlg;
    this.curParent = parent;
    BaseUT.setFitSize(this);
    BaseUT.setFitSize(this.view);
    parent.addChild(this);
    if (this.needAnimation) {
      this.onOpenAnimation();
    }
  }

  protected onOpenAnimation() {
    this.view.setScale(0.1, 0.1);
    fgui.GTween.to2(0.1, 0.1, 1, 1, 0.2)
      .setTarget(this.view, this.view.setScale)
      .setEase(fgui.EaseType.QuadOut)
      .onComplete(() => {
        this.view.addChildAt(this.graph_bg, 0);
      }, this);
  }

  protected onCloseAnimation(cb: Function) {
    this.graph_bg && this.graph_bg.removeFromParent();
    if (this.needAnimation) {
      fgui.GTween.to2(1, 1, 0.1, 0.1, 0.2)
        .setTarget(this.view, this.view.setScale)
        .setEase(fgui.EaseType.QuadOut)
        .onComplete(cb, this);
    } else {
      cb.call(this);
    }
  }
}


