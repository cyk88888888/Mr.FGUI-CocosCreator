/*
 * @Description: 
 * @Author: CYK
 * @Date: 2022-06-02 10:40:14
 */
import { _decorator, Component, Node } from 'cc';
import * as fgui from "fairygui-cc";
import { SceneMgr } from '../../framework/mgr/SceneMgr';
import { SoundMrg } from '../../framework/mgr/SoundMrg';
import { UIMenuLayer } from '../../framework/ui/UIMenuLayer';
import { RoleScene } from '../role/RoleScene';
const { ccclass, property } = _decorator;

@ccclass('TopInfoLayer')
export class TopInfoLayer extends UIMenuLayer {
    /** 包名称 */
    public static pkgName: string = 'home';
    constructor(){
        super();
        this.init();
    }
    
    private onEnter() {
    }

    private _tap_img_head() {
        SoundMrg.inst.playSound('sound/tabswitch');
        SceneMgr.inst.push(RoleScene, { msg: '我是RoleScene' });
    }
}

