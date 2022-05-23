/*
 * @Description: 人物信息页面
 * @Author: CYK
 * @Date: 2022-05-23 09:27:58
 */
import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { SceneMgr } from '../../framework/mgr/SceneMgr';
import { UILayer } from '../../framework/ui/UILayer';
@ccclass('RoleLayer')
export class RoleLayer extends UILayer {
    /** 包名称 */
    public static pkgName: string = 'role';
    private list: fgui.GList = null!;
    private lbl_index: fgui.GTextField;
    protected onEnter() {
        this.list.setVirtualAndLoop();
        this.list.itemRenderer = <fgui.ListItemRenderer>this.renderListItem.bind(this);
        this.list.numItems = 5;
        this.list.on(fgui.Event.SCROLL, this.doSpecialEffect, this);
        this.doSpecialEffect();
    }

    private doSpecialEffect() {
        //change the scale according to the distance to the middle
        var midX: number = this.list.scrollPane.posX + this.list.viewWidth / 2;
        var cnt: number = this.list.numChildren;
        for (var i: number = 0; i < cnt; i++) {
            var obj: fgui.GObject = this.list.getChildAt(i);
            var dist: number = Math.abs(midX - obj.x - obj.width / 2);
            if (dist > obj.width) //no intersection
                obj.setScale(1, 1);
            else {
                var ss: number = 1 + (1 - dist / obj.width) * 0.24;
                obj.setScale(ss, ss);
            }
        } 

        this.lbl_index.text = "" + ((this.list.getFirstChildInView() + 1) % this.list.numItems);
    }

    private renderListItem(index: number, item: fgui.GButton) {
        item.setPivot(0.5, 0.5);
        item.icon = fgui.UIPackage.getItemURL(RoleLayer.pkgName, "n" + (index + 1));
    }

    private _tap_btn_back(){
        SceneMgr.inst.pop();
        
    }
}

