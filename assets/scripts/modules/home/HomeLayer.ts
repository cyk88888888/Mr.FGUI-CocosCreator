/*
 * @Description: 主界面
 * @Author: CYK
 * @Date: 2022-05-20 09:53:17
 */
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { SoundMrg } from '../../framework/mgr/SoundMrg';
import { UILayer } from '../../framework/ui/UILayer';
import { BagDlg } from './bag/BagDlg';
@ccclass('HomeLayer')
export class HomeLayer extends UILayer {
    /** 包名称 */
    public static pkgName: string = 'home';
    private btn_close: fgui.GButton;
    private img_equip: fgui.GImage;
    protected onEnter() {
        let self = this;
        SoundMrg.inst.playMainBg();
    }

    private _tap_btn_bag(e) {
        BagDlg.show();
    }

    private onExit(){
    }

}

