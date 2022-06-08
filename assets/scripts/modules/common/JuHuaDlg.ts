/*
 * @Description: 转圈等待
 * @Author: CYK
 * @Date: 2022-05-18 17:16:30
 */
import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { UIMsg } from '../../framework/ui/UIMsg';

@ccclass('JuHuaDlg')
export class JuHuaDlg extends UIMsg {
    /** 包名称 */
    public static pkgName: string = 'common';

    private mask_alpha0: fgui.GGraph;
    private mask_gray: fgui.GGraph;
    private mv_loading: fgui.GGraph;
    private onEnter() {
        let self = this;
        self.setMaskVsb(false);
        self.setTimeout(() => {
            self.setMaskVsb(true);
        }, 4000);
    }

    private setMaskVsb(isShow: boolean) {
        let self = this;
        self.mask_alpha0.visible = !isShow;
        self.mask_gray.visible = self.mv_loading.visible = isShow;
    }
}