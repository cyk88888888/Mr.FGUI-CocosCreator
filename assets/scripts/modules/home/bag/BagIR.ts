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
       
    }

    private dchg(){
        let self = this;
        let data = self.data;
        self.loader.icon = data.icon;
        self.count.text = "" + data.count;
    }
}