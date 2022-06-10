/*
 * @Description: 
 * @Author: CYK
 * @Date: 2022-05-20 09:53:17
 */
import { _decorator, Component, Node } from 'cc';
import { UIComp } from './UIComp';
import * as fgui from "fairygui-cc";
import { SceneMgr } from '../mgr/SceneMgr';
import { BaseUT } from '../base/BaseUtil';

export class UILayer extends UIComp {
    public curParent: fgui.GComponent;
    /**
    * 显示界面
    * @param data 
    * @returns 
   */
    public static show(data?: any) {
        let newSelf = new this();
        newSelf.setData(data);
        if (newSelf['addToLayer']) newSelf['addToLayer']();
        SceneMgr.inst.curScene.setChildLayerClass(newSelf);
        return newSelf;
    }

    /**
     * 将view添加到layer层级容器
     */
    protected addToLayer() {
        let parent = SceneMgr.inst.curScene.layer;
        this.curParent = parent;
        parent.addChild(this);
    }
}

