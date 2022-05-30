/*
 * @Description: 
 * @Author: CYK
 * @Date: 2022-05-20 09:53:17
 */
import { _decorator, Component, Node } from 'cc';
import { SceneMgr } from '../../framework/mgr/SceneMgr';
import { UIMenuLayer } from '../../framework/ui/UIMenuLayer';
import { RoleScene } from '../role/RoleScene';
const { ccclass, property } = _decorator;

@ccclass('BottomTabLayer')
export class BottomTabLayer extends UIMenuLayer {
    /** 包名称 */
    public static pkgName: string = 'home';
    private onEnter(){
        console.log('进入BottomTabLayer');
    }

    private onExit(){
        console.log('退出BottomTabLayer');
    }
    
    private _tap_btn_equip(){
        SceneMgr.inst.push(RoleScene, { msg: '我是RoleScene' });
        console.log("equip");
    } 

    private _tap_btn_shop(){
        console.log("shop");
    }

    private _tap_btn_home(){
        console.log("home");
    }

    private _tap_btn_tanlent(){
        console.log("tanlent");
    }

    private _tap_btn_setting(){
        this.emit('jumpToLayer',{layerName: 'SettingLayer'});
    }
}

