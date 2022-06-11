/*
 * @Description: 
 * @Author: CYK
 * @Date: 2022-05-20 09:53:17
 */
import { _decorator, Component, Node } from 'cc';
import * as fgui from "fairygui-cc";
import { SceneMgr } from '../../framework/mgr/SceneMgr';
import { UIMenuLayer } from '../../framework/ui/UIMenuLayer';
import { RoleScene } from '../role/RoleScene';
const { ccclass, property } = _decorator;

@ccclass('BottomTabLayer')
export class BottomTabLayer extends UIMenuLayer {
    /** 包名称 */
    public static pkgName: string = 'home';
    private list_bottom: fgui.GList;

    private _curSelectIndex: number;
    private _layerInfos: any[];
    constructor(){
        super();
        this.init();
    }
    
    private onEnter() {
        let self = this;
        self._layerInfos = [
            { layer: 'EquipLayer' },
            { layer: 'ShopLayer' },
            { layer: 'HomeLayer' },
            { layer: 'SkillLayer' },
            { layer: 'SettingLayer' },
        ];
    }

    private onFirstEnter() {
        let self = this;
        self._curSelectIndex = self.list_bottom.selectedIndex = 2;
    }

    private _click_list_bottom(item: any, evt: any) {
        let self = this;
        if (self._curSelectIndex == self.list_bottom.selectedIndex) return;
        self._curSelectIndex = self.list_bottom.selectedIndex
        let layerInfo = self._layerInfos[self._curSelectIndex];
        let layerName = layerInfo.layer;
        self.emit('jumpToLayer', { layerName: layerName });
    }

    private onExit() {
    }
}

