/*
 * @Description: 设置界面
 * @Author: CYK
 * @Date: 2022-05-30 10:53:05
 */
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { SoundMrg } from '../../../framework/mgr/SoundMrg';
import { UILayer } from '../../../framework/ui/UILayer';
@ccclass('SettingLayer')
export class SettingLayer extends UILayer {
    /** 包名称 */
    public static pkgName: string = 'home';
    protected onEnter() {
        let self = this;
        SoundMrg.inst.playBg('ui://common/bg02');
    }


    private onExit(){
        SoundMrg.inst.playMainBg();
    }

}

