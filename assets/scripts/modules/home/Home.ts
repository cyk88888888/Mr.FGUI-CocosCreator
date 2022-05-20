import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { UILayer } from '../../framework/ui/UILayer';
@ccclass('Home')
export class Home extends UILayer {
    /** 包名称 */
    public static pkgName: string = 'home';
    private btn_close: fgui.GButton;
    private img_equip: fgui.GImage;
    protected onEnter() {
        let self = this;
        self.btn_close;
        self.img_equip;
        self.img_equip.onClick(function () {
            console.log('点击测试')
        }, self);
    }

    private _tap_btn_close(e) {
        console.log('点击关闭按钮');
    }

}

