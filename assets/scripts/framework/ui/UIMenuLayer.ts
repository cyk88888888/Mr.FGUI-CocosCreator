/*
 * @Description: 
 * @Author: CYK
 * @Date: 2022-05-20 14:26:21
 */
import { BaseUT } from '../base/BaseUtil';
import { SceneMgr } from '../mgr/SceneMgr';
import { UILayer } from './UILayer';

export class UIMenuLayer extends UILayer {

    /**
     * 将view添加到layer层级容器
     */
    protected addToLayer() {
        let parent = SceneMgr.inst.curScene.menuLayer;
        this.curParent = parent;
        BaseUT.setFitSize(this);
        BaseUT.setFitSize(this.view);
        parent.addChild(this);
    }
}

