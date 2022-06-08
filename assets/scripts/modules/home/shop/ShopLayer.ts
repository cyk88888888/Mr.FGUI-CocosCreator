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
@ccclass('ShopLayer')
export class ShopLayer extends UILayer {
    /** 包名称 */
    public static pkgName: string = 'home';
    protected onEnter() {
        let self = this;
        SoundMrg.inst.playBg('sound/bg03');
    }


    private onExit() {
    }

}

