/*
 * @Description: 
 * @Author: CYK
 * @Date: 2022-05-09 09:43:11
 */
import { Color } from 'cc';
import * as fgui from "fairygui-cc";
import { BaseUT } from '../base/BaseUtil';
import { SceneMgr } from '../mgr/SceneMgr';
import { UILayer } from './UILayer';

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
    bg.onClick(this.close, this);
    SceneMgr.inst.curScene.dlg.addChild(bg);
    bg.setPosition((bg.parent.width - bg.width) / 2, (bg.parent.height - bg.height) / 2);
    let parent = SceneMgr.inst.curScene.dlg;
    this.curParent = parent;
    parent.addChild(this);
  }

  protected onViewAdd() {
    if (this.needAnimation) {
      this.view.setPivot(0.5, 0.5);
      this.onOpenAnimation();
    } else {
      this.resetBgPosition();
    }
  }

  private resetBgPosition() {
    this.graph_bg.removeFromParent();
    this.graph_bg.setPosition((this.view.width - this.graph_bg.width) / 2, (this.view.height - this.graph_bg.height) / 2);
    this.view.addChildAt(this.graph_bg, 0);
  }

  protected onOpenAnimation() {
    this.view.setScale(0.1, 0.1);
    fgui.GTween.to2(0.1, 0.1, 1, 1, 0.2)
      .setTarget(this.view, this.view.setScale)
      .setEase(fgui.EaseType.QuadOut)
      .onComplete(() => {
        this.resetBgPosition();
      }, this);
  }

  protected onCloseAnimation(cb: Function) {
    this.graph_bg && this.graph_bg.removeFromParent();
    if (this.needAnimation) {
      fgui.GTween.to2(1, 1, 0, 0, 0.2)
        .setTarget(this.view, this.view.setScale)
        .setEase(fgui.EaseType.QuadOut)
        .onComplete(cb, this);
    } else {
      cb.call(this);
    }
  }
}


