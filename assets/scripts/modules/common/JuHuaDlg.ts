/*
 * @Description: 转圈等待
 * @Author: CYK
 * @Date: 2022-05-18 17:16:30
 */
import { _decorator, Component, Node, director, Color } from 'cc';
const { ccclass, property } = _decorator;
import * as fgui from "fairygui-cc";
import { UIMsg } from '../../framework/ui/UIMsg';

@ccclass('JuHuaDlg')
export class JuHuaDlg extends UIMsg {
    /** 包名称 */
    public static pkgName: string = 'common';

    private graph_bg: fgui.GGraph;
    private mask_gray: fgui.GGraph;
    private mv_loading: fgui.GGraph;
    private onEnter() {
        let self = this;
        let bg = this.graph_bg = new fgui.GGraph();
        bg.node.name = bg.name = this.dlgMaskName;
        let modalLayerColor: Color = new Color(0x00, 0x00, 0x00, 255 * 0);
        bg.drawRect(1, modalLayerColor, modalLayerColor);
        bg.setSize(Math.ceil(fgui.GRoot.inst.width), Math.ceil(fgui.GRoot.inst.height));
        bg.setPosition((this.view.width - bg.width) / 2, (this.view.height - bg.height) / 2);
        this.view.addChildAt(this.graph_bg, 0);

        self.setMaskVsb(false);
        self.setTimeout(() => {
            self.setMaskVsb(true);
        }, 4000);
    }

    private setMaskVsb(isShow: boolean) {
        let self = this;
        self.graph_bg.visible = !isShow;
        self.mask_gray.visible = self.mv_loading.visible = isShow;
    }
}