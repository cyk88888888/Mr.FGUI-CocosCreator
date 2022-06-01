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
    private img_select: fgui.GImage;

    private _curSelectIndex: number;
    private _layerInfos: any[];
    private ctor(){
        let self = this;
        self._layerInfos = [
            { btn: self['btn_equip'], layer: '' },
            { btn: self['btn_shop'], layer: '' },
            { btn: self['btn_home'], layer: 'HomeLayer' },
            { btn: self['btn_tanlent'], layer: '' },
            { btn: self['btn_setting'], layer: 'SettingLayer' },
        ];
        self.seletcIndex = 2;
    }
    private onEnter() {
        console.log('进入BottomTabLayer');
    }

    public get seletcIndex() {
        return this._curSelectIndex;
    }

    public set seletcIndex(value: number) {
        this._curSelectIndex = value;
        let layerInfo = this._layerInfos[value];
        this.img_select.x = layerInfo.btn.x;
    }

    private _tap_btn_equip() {
        SceneMgr.inst.push(RoleScene, { msg: '我是RoleScene' });
    }

    private _tap_btn_shop() {
        this.onTap(1);
    }

    private _tap_btn_home() {
        this.onTap(2);
    }

    private _tap_btn_tanlent() {
        this.onTap(3);
    }

    private _tap_btn_setting() {
        this.onTap(4);
    }

    private onTap(index: number) {
        let layerInfo = this._layerInfos[index];
        let layerName = layerInfo.layer;
        if (this.seletcIndex == index || layerName == '') return;
        this.seletcIndex = index;
        this.emit('jumpToLayer', { layerName: layerName });

    }

    private onExit() {
        console.log('退出BottomTabLayer');
    }
}

