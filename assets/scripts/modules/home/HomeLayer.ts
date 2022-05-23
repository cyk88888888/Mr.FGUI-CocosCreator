/*
 * @Description: 主界面
 * @Author: CYK
 * @Date: 2022-05-20 09:53:17
 */
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { UILayer } from '../../framework/ui/UILayer';
@ccclass('HomeLayer')
export class HomeLayer extends UILayer {
    /** 包名称 */
    public static pkgName: string = 'home';
    private btn_close: fgui.GButton;
    private img_equip: fgui.GImage;
    protected onEnter() {
        let self = this;
        self.btn_close;
        self.img_equip;
    }

    private _tap_btn_close(e) {
        console.log('点击关闭按钮');
    }
}

