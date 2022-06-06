/*
 * @Description: 
 * @Author: CYK
 * @Date: 2022-06-06 17:49:35
 */
import { _decorator } from 'cc';
import * as fgui from "fairygui-cc";
import { ListItemRenderer } from '../../../framework/ui/ListItemRenderer';
const { ccclass, property } = _decorator;
@ccclass('BagIR')
export class BagIR extends ListItemRenderer {
    public selectBg: fgui.GImage;
    public loader: fgui.GLoader;
    public count: fgui.GTextField;

    private onEnter(){
        let self = this;
        self.selectBg;
        self.loader.icon = "Icons/i" + Math.floor(Math.random() * 10);
        self.count.text = "" + Math.floor(Math.random() * 100);
    }
}