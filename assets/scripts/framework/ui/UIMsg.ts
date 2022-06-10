/*
 * @Description: 
 * @Author: CYK
 * @Date: 2022-05-09 09:43:11
 */
import { BaseUT } from '../base/BaseUtil';
import { SceneMgr } from '../mgr/SceneMgr';
import { UILayer } from './UILayer';

export class UIMsg extends UILayer {
  /**
  * 将view添加到layer层级容器
  */
  protected addToLayer() {
    let parent = SceneMgr.inst.curScene.msg;
    this.curParent = parent;
    BaseUT.setFitSize(this);
    BaseUT.setFitSize(this.view);
    parent.addChild(this);
  }
}


